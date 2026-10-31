#!/usr/bin/env bash
# Symlink this repo's skills into your personal agent folders so every project can use them.
# Usage: ./setup.sh [--uninstall] [target_dir ...]
# Default targets: ~/.agents/skills ~/.claude/skills ~/.copilot/skills
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_SRC="$REPO_ROOT/.agents/skills"

uninstall=false
if [[ "${1:-}" == "--uninstall" ]]; then
  uninstall=true
  shift
fi

targets=("$@")
if [[ ${#targets[@]} -eq 0 ]]; then
  targets=("$HOME/.agents/skills" "$HOME/.claude/skills" "$HOME/.copilot/skills")
fi

for target in "${targets[@]}"; do
  $uninstall || mkdir -p "$target"
  for skill in "$SKILLS_SRC"/*/; do
    [[ -f "$skill/SKILL.md" ]] || continue
    name="$(basename "$skill")"
    link="$target/$name"

    if $uninstall; then
      if [[ -L "$link" && "$(readlink "$link")" == "${skill%/}" ]]; then
        rm "$link" && echo "removed $link"
      fi
      continue
    fi

    if [[ -e "$link" && ! -L "$link" ]]; then
      echo "skip $link (exists and is not a symlink)" >&2
      continue
    fi
    ln -sfn "${skill%/}" "$link"
    echo "linked $link -> ${skill%/}"
  done
done
