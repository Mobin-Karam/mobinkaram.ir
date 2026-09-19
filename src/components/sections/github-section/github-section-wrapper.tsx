import { AlertCircle } from "lucide-react";

import { GitHubSection } from "./github-section";

import { FaGithub } from "react-icons/fa6";

export async function GitHubSectionWrapper() {
  try {
    return await GitHubSection();
  } catch (error) {
    console.error("Failed to render GitHub section:", error);

    return (
      <section
        id="github"
        className={[
          "relative border-t border-border",
          "px-4 py-24 sm:px-6 md:px-8",
        ].join(" ")}
      >
        <div
          className={[
            "mx-auto flex max-w-3xl flex-col items-center",
            "rounded-3xl border border-border/70",
            "bg-card/60 px-6 py-16 text-center",
          ].join(" ")}
        >
          <span
            className={[
              "flex size-14 items-center justify-center",
              "rounded-2xl bg-muted text-muted-foreground",
            ].join(" ")}
          >
            <AlertCircle className="size-6" aria-hidden="true" />
          </span>

          <h2 className="mt-6 text-2xl font-semibold text-foreground">
            GitHub activity is temporarily unavailable
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
            The GitHub data could not be loaded. You can still visit my profile
            directly.
          </p>

          <a
            href="https://github.com/Mobin-Karam"
            target="_blank"
            rel="noreferrer"
            className={[
              "mt-6 inline-flex items-center gap-2",
              "rounded-full bg-foreground px-5 py-3",
              "text-sm font-medium text-background",
            ].join(" ")}
          >
            <FaGithub className="size-4" aria-hidden="true" />
            Open GitHub
          </a>
        </div>
      </section>
    );
  }
}
