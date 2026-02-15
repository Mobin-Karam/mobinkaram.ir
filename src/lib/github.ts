const GH = "https://api.github.com";

const headers: Record<string, string> = {
  "X-GitHub-Api-Version": "2022-11-28",
  "Content-Type": "application/json",
};

if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.trim().length > 0) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  topics?: string[];
};

type Profile = {
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

async function safeFetch<T>(url: string, revalidate = 3600): Promise<T | null> {
  try {
    const res = await fetch(url, { headers, next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getOrgProfile() {
  return safeFetch<Profile>(`${GH}/orgs/Koonj-Inc`);
}

export async function getUserProfile() {
  return safeFetch<Profile>(`${GH}/users/Mobin-Karam`);
}

export async function getOrgRepos() {
  return safeFetch<Repo[]>(
    `${GH}/orgs/Koonj-Inc/repos?per_page=100&sort=updated`,
    1800,
  );
}

export async function getUserRepos() {
  return safeFetch<Repo[]>(
    `${GH}/users/Mobin-Karam/repos?per_page=100&sort=pushed`,
    1800,
  );
}

export type TrackerIssue = {
  title: string;
  html_url: string;
  state: "open" | "closed";
  labels: { name: string }[];
  updated_at: string;
};

export async function getKoonjIssues() {
  return safeFetch<TrackerIssue[]>(
    `${GH}/repos/Koonj-Inc/koonj-app/issues?per_page=50&state=all`,
    600,
  );
}

const pinnedRepoFullNames = [
  "Koonj-Inc/koonj-app",
  "Mobin-Karam/fieldkit",
  "Mobin-Karam/mobin.dev",
];

async function getPinnedRepo(fullName: string) {
  return safeFetch<Repo>(`${GH}/repos/${fullName}`, 1800);
}

export type RepoPick = {
  name: string;
  url: string;
  description: string;
  stars: number;
  forks: number;
  lang: string | null;
  owner: "org" | "user";
};

type PinnedNode = {
  name: string;
  description: string | null;
  url: string;
  stargazers: { totalCount: number };
  forkCount: number;
  primaryLanguage: { name: string } | null;
  owner: { login: string; __typename: "User" | "Organization" };
};

async function getPinnedRepos(entity: "USER" | "ORGANIZATION", login: string): Promise<RepoPick[]> {
  const query = `
    query($login: String!, $type: SearchType!) {
      repositoryOwner(login: $login) {
        ... on ${entity} {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazers { totalCount }
                forkCount
                primaryLanguage { name }
                owner { login __typename }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(`${GH}/graphql`, {
      method: "POST",
      headers,
      next: { revalidate: 1800 },
      body: JSON.stringify({
        query,
        variables: { login },
      }),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as {
      data?: { repositoryOwner?: { pinnedItems?: { nodes?: PinnedNode[] } } };
    };
    const nodes = json.data?.repositoryOwner?.pinnedItems?.nodes ?? [];
    return nodes
      .filter(Boolean)
      .map((r) => ({
        name: r.name,
        url: r.url,
        description: r.description ?? "",
        stars: r.stargazers.totalCount,
        forks: r.forkCount,
        lang: r.primaryLanguage?.name ?? null,
        owner: r.owner.__typename === "Organization" ? "org" : "user",
      }));
  } catch {
    return [];
  }
}

export async function getGithubHighlights(): Promise<{
  org?: Profile | null;
  user?: Profile | null;
  repos: RepoPick[];
}> {
  const [org, user, orgRepos, userRepos] = await Promise.all([
    getOrgProfile(),
    getUserProfile(),
    getOrgRepos(),
    getUserRepos(),
  ]);

  const pinned = [
    ...(await getPinnedRepos("ORGANIZATION", "Koonj-Inc")),
    ...(await getPinnedRepos("USER", "Mobin-Karam")),
  ];

  const sourceRepos =
    pinned.length > 0
      ? pinned
      : [
          ...(orgRepos ?? []).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3),
          ...(userRepos ?? []).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3),
        ];

  const repos: RepoPick[] =
    "html_url" in sourceRepos[0] || sourceRepos.length === 0
      ? (sourceRepos as unknown as Repo[]).map((r) => ({
          name: r.name,
          url: r.html_url,
          description: r.description ?? "",
          stars: r.stargazers_count,
          forks: r.forks_count,
          lang: r.language,
          owner: r.full_name.startsWith("Koonj-Inc/") ? "org" : "user",
        }))
      : (sourceRepos as RepoPick[]);

  return { org, user, repos };
}
