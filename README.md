# guillaume-agentic

Reusable agent skills for Copilot CLI and other agents.

## Skills

All behavior lives in `.agents/skills/<name>/SKILL.md` (max 150 lines each):

| Skill | Purpose |
|---|---|
| `coder` | Entry point combining all coding skills; commits/pushes only with permission |
| `backend-developer` | TypeScript backend with TDD, Hexagonal Architecture, SOLID |
| `react-developer` | React/TypeScript components and tests |
| `code-review` | React/TypeScript and backend review |
| `test-validation` | Test writing, coverage and quality rules |
| `readability-standards` | Naming, function size, comments |
| `research` | Verified, cited technical research |
| `git` | Branch naming (`feature/…`, `fix/…`) and 🤖-prefixed review comments |

## Use skills in other projects

```bash
./setup.sh              # restore locked skills and link into personal agent folders
./setup.sh ~/my/dir     # or into custom target folders
./setup.sh --uninstall  # remove the symlinks
```

Setup requires Node.js and npm. From a Git worktree it uses the main checkout,
which must contain the current `skills-lock.json`.

## Import skills from other repos

Uses [`npx skills`](https://github.com/vercel-labs/skills); imported skills land in `.agents/skills/`.
Setup restores project dependencies from `skills-lock.json`. Imported Ponytail
files are installed locally, not committed.

```bash
npm run skills:install        # restore the locked skills
npx skills add owner/repo     # or: npm run skills:add -- owner/repo
npx skills list
npx skills update
```

## Conventions

- Agents read only `SKILL.md` files; README files are for humans.
- Keep each `SKILL.md` ≤ 150 lines and free of common-knowledge filler.
- New capability or rule → new skill (kebab-case folder with frontmatter `name` and `description`).
