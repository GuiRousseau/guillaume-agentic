# Copilot Instructions for guillaume-agentic

This repository implements an **agentic architecture** for intelligent orchestration. Agents coordinate reusable skills to complete complex tasks.

## Architecture Overview

### Core Components

- **Agents** (`.agent/agents/`) - Orchestrators that interpret user intent, coordinate skills, and manage multi-step workflows
- **Skills** (`.agent/skills/`) - Reusable, focused capability modules that agents invoke (e.g., information retrieval, action execution)
- **Rules** (`.agent/rules/`) - Policy and rule sets that define safe, predictable agent behavior

### Key Design Pattern

1. Agents receive user requests and decompose them into steps
2. Agents select appropriate skills for each step
3. Skills execute in isolation and report results
4. Agents synthesize results and manage state across steps

**Separation of Concerns**: Skills are self-contained and don't know about agents; agents orchestrate skills without implementing specific logic.

## Project Structure

```
.agent/
├── agents/
│   └── agents/
│       ├── developer-agent/       # Multi-step planning and task orchestration
│       └── research-agent/        # Information gathering and synthesis
├── skills/
│   └── skills/
│       ├── information-skill/     # Query and summarize information
│       └── action-skill/          # Execute actions and side effects safely
└── rules/                         # Policy definitions (currently placeholder)
```

## Development Conventions

### Agent Naming & Structure

- Agent names use adjective + "agent" format (e.g., `developer-agent`, `research-agent`)
- Each agent lives in `.agent/agents/agents/<agent-name>/`
- Each agent should have a `README.md` with:
  - Clear purpose statement
  - List of skills it can invoke
  - Example workflows
  - Configuration or implementation notes

### Skill Naming & Structure

- Skill names use noun + "skill" format (e.g., `information-skill`, `action-skill`)
- Each skill lives in `.agent/skills/skills/<skill-name>/`
- Each skill should have a `README.md` with:
  - Purpose and responsibility
  - Input contract (what data it expects)
  - Output contract (what it returns)
  - Validation and error handling approach

### Adding New Agents or Skills

1. Create folder under appropriate parent directory with kebab-case name
2. Add a descriptive `README.md` explaining purpose and interface
3. In the README's "Next steps" section, note:
   - What configuration file needs to be added (e.g., `agent-config.json`)
   - Which skills this agent will invoke (for agents)
   - How to validate the implementation

### Rule Definitions

Rules in `.agent/rules/` should be organized by domain (e.g., `safety-rules.md`, `validation-rules.md`). Include:
- Clear policy statements
- Examples of compliant vs. non-compliant behavior
- How agents/skills enforce the rule

## Next Steps for Implementation

This is a skeleton project. To build it out:

1. **Add a project manifest** - Create `package.json` (or language-equivalent) at root to define dependencies and scripts
2. **Implement agents** - Add actual orchestration logic to each agent directory
3. **Implement skills** - Add implementation files (TypeScript, Python, etc.) for skill execution
4. **Define rules** - Create concrete policy files in `.agent/rules/`
5. **Add agent bootstrap** - Create a root entry point that initializes and wires agents to skills
6. **Add tests** - Create test suites parallel to implementation (e.g., `<agent-name>.test.ts`)

## Working with This Codebase

### When Adding Features

- If it's a new capability (e.g., "ability to send emails"), create a new skill
- If it's a new workflow (e.g., "customer onboarding"), create a new agent or extend an existing one
- If it's a constraint or safety requirement, add a rule definition

### File Organization Principles

- Keep agents focused on orchestration logic only
- Keep skills focused on execution; they should not contain workflow logic
- Document the interface between agents and skills clearly in each README
- Use the "Next steps" section in READMEs to mark incomplete work

## Documentation

- **AI.md** - Architecture and folder organization overview
- **README_PROJECT_STRUCTURE.md** - Project structure with next steps
- **Individual README.md files** - In each agent and skill directory for detailed responsibilities
