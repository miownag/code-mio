import { GitHubRepo } from "@/components/github-repo-card";

const GITHUB_USERNAME = "miownag";

interface RestRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
  created_at: string;
  owner: {
    login: string;
  };
}

interface GraphQLRepo {
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  isFork: boolean;
  createdAt: string;
  primaryLanguage: {
    name: string;
  } | null;
  owner: {
    login: string;
  };
}

interface GraphQLPinnedResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: GraphQLRepo[];
      };
    };
  };
}

interface GraphQLAllReposResponse {
  data: {
    user: {
      repositories: {
        nodes: GraphQLRepo[];
      };
      repositoriesContributedTo: {
        nodes: GraphQLRepo[];
      };
    };
  };
}

export interface CategorizedRepos {
  owned: GitHubRepo[];
  contributed: GitHubRepo[];
}

function transformRepo(repo: GraphQLRepo): GitHubRepo {
  return {
    name: repo.name,
    full_name: repo.nameWithOwner,
    description: repo.description,
    html_url: repo.url,
    stargazers_count: repo.stargazerCount,
    forks_count: repo.forkCount,
    language: repo.primaryLanguage?.name || null,
    created_at: repo.createdAt,
    owner: {
      login: repo.owner.login,
    },
  };
}

function transformRestRepo(repo: RestRepo): GitHubRepo {
  return {
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description,
    html_url: repo.html_url,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    language: repo.language,
    created_at: repo.created_at,
    owner: repo.owner,
  };
}

async function fetchPublicOwnedRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=created`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return [];

    const repos = (await response.json()) as RestRepo[];
    return repos.filter((repo) => !repo.fork).map(transformRestRepo);
  } catch {
    return [];
  }
}

export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  if (!process.env.GITHUB_TOKEN) {
    const repos = await fetchPublicOwnedRepos();
    return repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              nameWithOwner
              description
              url
              stargazerCount
              forkCount
              isFork
              createdAt
              primaryLanguage {
                name
              }
              owner {
                login
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    console.error("Failed to fetch pinned repos from GitHub GraphQL API");
    const repos = await fetchPublicOwnedRepos();
    return repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
  }

  const result = (await response.json()) as GraphQLPinnedResponse;
  const pinnedRepos = result.data?.user?.pinnedItems?.nodes || [];

  return pinnedRepos.map(transformRepo);
}

export async function fetchAllRepos(): Promise<CategorizedRepos> {
  if (!process.env.GITHUB_TOKEN) {
    return { owned: await fetchPublicOwnedRepos(), contributed: [] };
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}, ownerAffiliations: OWNER, privacy: PUBLIC) {
          nodes {
            name
            nameWithOwner
            description
            url
            stargazerCount
            forkCount
            isFork
            createdAt
            primaryLanguage {
              name
            }
            owner {
              login
            }
          }
        }
        repositoriesContributedTo(first: 50, contributionTypes: [COMMIT, PULL_REQUEST], orderBy: {field: STARGAZERS, direction: DESC}, privacy: PUBLIC) {
          nodes {
            name
            nameWithOwner
            description
            url
            stargazerCount
            forkCount
            isFork
            createdAt
            primaryLanguage {
              name
            }
            owner {
              login
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    console.error("Failed to fetch repos from GitHub GraphQL API");
    return { owned: await fetchPublicOwnedRepos(), contributed: [] };
  }

  const result = (await response.json()) as GraphQLAllReposResponse;
  const ownedRepos = result.data?.user?.repositories?.nodes || [];
  const contributedRepos =
    result.data?.user?.repositoriesContributedTo?.nodes || [];

  return {
    owned: ownedRepos.filter((repo) => !repo.isFork).map(transformRepo),
    contributed: contributedRepos.map(transformRepo),
  };
}

// Alias for backward compatibility
export const fetchGitHubRepos = fetchPinnedRepos;
