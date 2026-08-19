import Subtitle from "@/components/subtitle";
import { ArrowUpRight, Github, Layers3, TerminalSquare } from "lucide-react";

interface ProjectsHeroProps {
  ownedCount: number;
  contributedCount: number;
}

export function ProjectsHero({
  ownedCount,
  contributedCount,
}: ProjectsHeroProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/65 px-5 py-7 shadow-[0_30px_100px_-70px_var(--color-primary)] backdrop-blur-sm sm:px-8 sm:py-9 lg:px-10 lg:py-10">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-40 dark:opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-primary) 13%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 13%, transparent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(to right, black, transparent 72%), linear-gradient(to bottom, black, transparent 85%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <div className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-primary sm:text-xs">
            <TerminalSquare className="size-4" aria-hidden />
            <span>mio@portfolio:~/work$ ./projects --selected</span>
          </div>

          <Subtitle size="lg">Projects</Subtitle>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            AI coding systems, agent tooling, and full-stack products built to
            turn complex workflows into useful software.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {['AI Coding', 'AI Agents', 'Full Stack'].map((focus) => (
              <span
                key={focus}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-mono text-[10px] tracking-[0.18em]">
                OWNED
              </span>
              <Layers3 className="size-4" aria-hidden />
            </div>
            <p className="mt-4 font-mono text-3xl font-semibold tabular-nums sm:text-4xl">
              {String(ownedCount).padStart(2, '0')}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">original builds</p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="font-mono text-[10px] tracking-[0.18em]">
                OSS
              </span>
              <Github className="size-4" aria-hidden />
            </div>
            <p className="mt-4 font-mono text-3xl font-semibold tabular-nums sm:text-4xl">
              {String(contributedCount).padStart(2, '0')}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">contributions</p>
          </div>

          <a
            href="https://github.com/miownag"
            target="_blank"
            rel="noreferrer"
            className="group col-span-2 flex items-center justify-between rounded-2xl border border-primary/25 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="flex items-center gap-2">
              <Github className="size-4" aria-hidden />
              Explore on GitHub
            </span>
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  );
}
