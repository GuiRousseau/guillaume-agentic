#!/usr/bin/env bash
# Symlink this repo's skills into your personal agent folders so every project can use them.
# Usage: ./setup.sh [--uninstall | --install-external] [target_dir ...]
# Default targets: ~/.agents/skills ~/.claude/skills ~/.copilot/skills
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$SCRIPT_DIR"

# Worktree sessions should link back to the stable main checkout.
if git -C "$SCRIPT_DIR" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  common_dir="$(git -C "$SCRIPT_DIR" rev-parse --path-format=absolute --git-common-dir 2>/dev/null || true)"
  if [[ -n "$common_dir" && "$(basename "$common_dir")" == ".git" ]]; then
    REPO_ROOT="$(dirname "$common_dir")"
  fi
fi

SKILLS_SRC="$REPO_ROOT/.agents/skills"
EXTERNAL_ROOT="$REPO_ROOT/skills/external"
is_windows=false
case "$(uname -s)" in
  CYGWIN*|MINGW*|MSYS*) is_windows=true ;;
esac

link_skill() {
  local link="$1"
  local skill="$2"

  if $is_windows; then
    SKILL_LINK="$(cygpath -w "$link")" SKILL_TARGET="$(cygpath -w "$skill")" \
      powershell.exe -NoProfile -NonInteractive -Command \
      'New-Item -ItemType Junction -Path $env:SKILL_LINK -Target $env:SKILL_TARGET -ErrorAction Stop | Out-Null'
  else
    ln -sfn "$skill" "$link"
  fi
}

is_windows_link() {
  SKILL_LINK="$(cygpath -w "$1")" SKILL_TARGET="$(cygpath -w "$2")" \
    powershell.exe -NoProfile -NonInteractive -Command \
    '$item = Get-Item -LiteralPath $env:SKILL_LINK -ErrorAction SilentlyContinue; if ($item -and ($item.LinkType -eq "Junction" -or $item.LinkType -eq "SymbolicLink") -and [string]::Equals([IO.Path]::GetFullPath($item.Target).TrimEnd("\"), [IO.Path]::GetFullPath($env:SKILL_TARGET).TrimEnd("\"), [StringComparison]::OrdinalIgnoreCase)) { exit 0 }; exit 1'
}

remove_windows_link() {
  SKILL_LINK="$(cygpath -w "$1")" powershell.exe -NoProfile -NonInteractive -Command \
    '[IO.Directory]::Delete($env:SKILL_LINK)'
}

uninstall=false
install_external_only=false
if [[ "${1:-}" == "--uninstall" ]]; then
  uninstall=true
  shift
elif [[ "${1:-}" == "--install-external" ]]; then
  install_external_only=true
  shift
fi

if ! $uninstall; then
  if [[ ! -f "$REPO_ROOT/skills-lock.json" ]]; then
    echo "Missing skills-lock.json in $REPO_ROOT; update the main checkout before running setup." >&2
    exit 1
  fi
  if ! command -v npx >/dev/null 2>&1; then
    echo "npx is required to restore external skills. Install Node.js and npm first." >&2
    exit 1
  fi
  mkdir -p "$EXTERNAL_ROOT"
  cp "$REPO_ROOT/skills-lock.json" "$EXTERNAL_ROOT/skills-lock.json"
  (cd "$EXTERNAL_ROOT" && npx skills experimental_install --frozen-lockfile)
fi

if $install_external_only; then
  exit 0
fi

targets=("$@")
if [[ ${#targets[@]} -eq 0 ]]; then
  targets=("$HOME/.agents/skills" "$HOME/.claude/skills" "$HOME/.copilot/skills")
fi

for target in "${targets[@]}"; do
  $uninstall || mkdir -p "$target"
  for skill in "$SKILLS_SRC"/*/ "$EXTERNAL_ROOT"/.agents/skills/*/; do
    [[ -f "$skill/SKILL.md" ]] || continue
    name="$(basename "$skill")"
    link="$target/$name"

    if $uninstall; then
      if $is_windows; then
        if is_windows_link "$link" "${skill%/}"; then
          remove_windows_link "$link" && echo "removed $link"
        fi
      elif [[ -L "$link" && "$(readlink "$link")" == "${skill%/}" ]]; then
        rm "$link" && echo "removed $link"
      fi
      continue
    fi

    if $is_windows && is_windows_link "$link" "${skill%/}"; then
      continue
    fi
    if [[ -e "$link" && ! -L "$link" ]]; then
      echo "skip $link (exists and is not a symlink)" >&2
      continue
    fi
    link_skill "$link" "${skill%/}"
    echo "linked $link -> ${skill%/}"
  done
done
