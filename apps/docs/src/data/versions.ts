export interface VersionEntry {
  version: string;
  label: string;
  branch: string;
  url: string;
  latest?: boolean;
  deployed?: boolean;
}

// Each release adds an entry here. Latest must be first.
export const versions: VersionEntry[] = [
  {
    version: "0.3.0",
    label: "v0.3.0",
    branch: "master",
    url: "https://neumorui.vercel.app",
    latest: true,
    deployed: true,
  },
  {
    version: "0.2.1",
    label: "v0.2.1",
    branch: "docs/v0.2.1",
    url: "",
    deployed: false,
  },
];

export function getCurrentVersion(): string {
  return versions.find((v) => v.latest)?.version ?? versions[0]?.version ?? "0.0.0";
}

export function getLatestVersion(): VersionEntry {
  return versions.find((v) => v.latest) ?? versions[0];
}
