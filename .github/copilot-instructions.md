# Copilot Instructions for guillaume-agentic

This repo is a collection of reusable agent **skills**. Agents, rules and skills are all expressed as `SKILL.md` files.

- Skills live in `.agents/skills/<kebab-case-name>/SKILL.md` with `name` and `description` frontmatter.
- Read only `SKILL.md` files for agent guidance; ignore README files and utility scripts.
- Keep every `SKILL.md` at 150 lines or fewer; drop guidance that is common knowledge.
- New capability, workflow or policy → new skill (or extend an existing one).
- `setup.sh` symlinks skills into the user's agent folders; `npx skills add <repo>` imports external skills.
- Branches: follow the `branch-naming` skill.
