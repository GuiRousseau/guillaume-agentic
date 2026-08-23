# Agentic Project Structure

This repository is organized for agent-based development.

## Top-level folders

- `.agent/` - Agent system container
  - `.agent/agents/` - Agent definitions and configuration
  - `.agent/skills/` - Reusable skill modules that agents can invoke
  - `.agent/rules/` - Policy or rule sets for agent behavior

## Example structure

- `.agent/agents/developer-agent/`
- `.agent/agents/research-agent/`
- `.agent/skills/information-skill/`
- `.agent/skills/action-skill/`

## Next steps

1. Add shared utility code under `src/` or `lib/`
2. Create a root `package.json` or project manifest
3. Implement agent bootstrapping and skill wiring
4. Add rules in `.agent/rules/` for safety and behavior control
