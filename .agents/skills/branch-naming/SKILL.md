---
name: branch-naming
description: Name git branches for this project. Use whenever creating or renaming a branch.
---

# Branch Naming

Format: `feature/<summary>` for new functionality, `fix/<summary>` for bug fixes.

- Prefix is exactly `feature` or `fix`, lowercase.
- Summary: concise lowercase kebab-case; only letters, digits and single hyphens; not empty; no leading/trailing hyphen; no extra slashes, spaces, underscores or punctuation.
- Do not include the angle brackets from the format.
- Verify the full name before creating the branch.

| Valid | Invalid |
|---|---|
| `feature/add-route-export` | `Feature/add-route-export` (uppercase prefix) |
| `fix/prevent-empty-destinations` | `feature/add_route_export` (underscores) |
| `fix/correct-route-distance` | `feature/add/route-export` (extra slash) |
| | `fix/` (empty summary) |
