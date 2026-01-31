import { GitHubRepo } from "@/components/github-repo-card";

const GITHUB_USERNAME = "miownag";

interface GraphQLRepo {
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  isFork: boolean;
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
    owner: {
      login: repo.owner.login,
    },
  };
}

export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
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
    return [];
  }

  const result = (await response.json()) as GraphQLPinnedResponse;
  const pinnedRepos = result.data?.user?.pinnedItems?.nodes || [];

  return pinnedRepos.map(transformRepo);
}

export async function fetchAllRepos(): Promise<CategorizedRepos> {
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
    return { owned: [], contributed: [] };
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
