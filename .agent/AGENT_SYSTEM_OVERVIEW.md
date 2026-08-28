# Agent System Overview

This document provides a comprehensive overview of the agentic architecture, including agents, skills, and rules. It consolidates information from the implementation specifications and provides guidance for extending the system.

## Architecture Overview

The agentic system follows a **skill-based orchestration pattern**:

```
┌─────────────────────────────────────┐
│         Agents (Orchestrators)      │
│  - TypeScript Coder Agent (React dev)      │
│  - Code Reviewer Agent (React/TS review)   │
│  - Research Agent (Info gathering)        │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
┌────────────┐  ┌────────────┐
│Information │  │   Action   │
│   Skill    │  │   Skill    │
└────────────┘  └────────────┘
        │             │
        └──────┬──────┘
               │
               ▼
        ┌────────────┐
        │   Rules &  │
        │ Standards  │
        └────────────┘
```

### Core Concepts

- **Agents** interpret user intent and orchestrate skills to complete workflows
- **Skills** are reusable, focused capabilities that execute isolated tasks
- **Rules** define standards, policies, and constraints that guide agent and skill behavior
- **Separation of Concerns**: Agents orchestrate; skills execute; rules constrain

## Agents

### Code Reviewer Agent (`.agent/agents/agents/code-reviewer/`)

A professional React and TypeScript reviewer specializing in architecture, correctness, readability, library usage, accessibility, performance risks, and test quality.

**Capabilities:**
- Review React rendering, hooks, state, effects, forms, and accessibility
- Review TypeScript type safety, async behavior, and API contracts
- Identify architecture issues, coupling, regressions, and library misuse
- Report prioritized, evidence-based findings with file and line references

**Integration:**
- Invokes `code-review-skill` for quality and standards analysis
- Invokes `information-skill` for repository context and architecture discovery
- Invokes `test-validation-skill` for test and coverage-gap analysis
- Invokes `research-agent` when library or framework behavior needs verification

### TypeScript Coder Agent (`.agent/agents/agents/typescript-coder/`)

A TypeScript React developer specializing in creating well-tested, readable components.

**Specialization:**
- React 18+ and Next.js development
- TypeScript components with full type safety
- Comprehensive test suites (Jest + React Testing Library)
- Bun package manager detection and npm fallback

**Capabilities:**
- Generate React components from specifications
- Create comprehensive test suites with ≥80% coverage
- Review code for readability and testability
- Refactor code while maintaining tests
- Detect and use appropriate package manager (Bun or npm)
- Add documentation and JSDoc comments

**Philosophy:**
- Testing First: 80% minimum coverage
- Readability Over Performance: Clear code prioritized
- Self-Documenting: Descriptive names and structure
- Bun-Native: Prefers Bun when available

**Key Files:**
- `agent-config.json` - Configuration and capability declarations
- `README.md` - Detailed documentation with usage examples

**Integration:**
- Invokes `information-skill` for analysis and planning
- Invokes `action-skill` for component and test generation
- Follows all rules in `.agent/rules/`

### Research Agent (`.agent/agents/agents/research-agent/`)

An agent for gathering, analyzing, and synthesizing information.

**Specialization:**
- General-purpose information gathering
- Architecture and design research
- Technology evaluation and comparison
- Best practices and standards validation
- Source verification and cross-referencing

**Capabilities:**
- Query knowledge sources and documentation
- Perform code analysis and pattern recognition
- Synthesize findings into actionable insights
- Validate claims with multiple sources
- Provide concise, well-cited research summaries

**Key Files:**
- `README.md` - Detailed documentation with research areas

## Skills

### Information Skill (`.agent/skills/skills/information-skill/`)

Retrieves, analyzes, and summarizes information for decision-making.

**Responsibilities:**
1. Requirement Analysis
   - Clarify component requirements
   - Identify edge cases and constraints
   - Document assumptions

2. Code Review & Analysis
   - Analyze readability (function length, naming, comments)
   - Validate test structure and coverage
   - Assess against component creation rules
   - Provide actionable feedback

3. Design & Planning
   - Design component architecture
   - Plan multi-step workflows
   - Estimate complexity and effort
   - Create implementation roadmaps

4. Validation
   - Validate naming conventions
   - Verify self-documenting code patterns
   - Check JSDoc documentation
   - Assess test coverage adequacy
   - Validate package manager configuration

**Input Contract:**
```typescript
{
  operation: 'analyze-requirements' | 'design-architecture' | 'review-code' | 'validate-coverage',
  requirements?: string[],
  componentName?: string,
  code?: string,
  testFile?: string,
  packageManager?: PackageManagerConfig,
  framework?: 'react',
  maxFunctionLength?: number,      // Default: 50
  minTestCoverage?: number,        // Default: 80%
}
```

**Standards Enforced:**
- React 18+ specialization
- PascalCase component names
- camelCase function/variable names
- Max 50-line functions
- 80%+ test coverage
- JSDoc documentation
- Bun/npm package manager support

### Action Skill (`.agent/skills/skills/action-skill/`)

Executes actions including component generation, test creation, and refactoring.

**Responsibilities:**
1. Component Generation
   - Generate TypeScript React components
   - Create proper component structure with props interfaces
   - Add JSDoc documentation
   - Include accessibility attributes (ARIA labels)

2. Test Suite Creation
   - Generate Jest test files
   - Create React Testing Library test queries
   - Cover all scenarios: renders, props, interactions, errors
   - Ensure 80%+ code coverage

3. Code Refactoring
   - Improve naming conventions
   - Extract complex logic into smaller functions
   - Add explanatory comments
   - Maintain test coverage

4. Package Manager Integration
   - Use appropriate commands (Bun vs npm)
   - Generate correct build/test scripts
   - Validate project structure

**Input Contract:**
```typescript
{
  action: 'generate-component' | 'generate-tests' | 'refactor-code' | 'add-documentation',
  componentName: string,
  specification?: string,
  requirements?: string[],
  code?: string,
  testFile?: string,
  packageManager: PackageManagerConfig,
  framework?: 'react',
  targetCoverage?: number,         // Default: 80
  maxFunctionLength?: number,      // Default: 50
  includeHooks?: boolean,
  includeTypescript?: boolean,     // Default: true
  includeAccessibility?: boolean,  // Default: true
}
```

**Standards Enforced:**
- Component naming (PascalCase)
- Function and variable naming (camelCase)
- Max 50-line functions
- JSDoc documentation
- 80%+ test coverage
- Accessibility standards (ARIA)
- Bun/npm package manager scripts

## Rules

Rules define standards, constraints, and best practices that guide agent and skill behavior.

### Component Creation Rules (`.agent/rules/component-creation-rules.md`)

Standards for creating React components.

**Coverage:**
- Component structure and organization
- Naming conventions (PascalCase, camelCase, UPPER_SNAKE_CASE)
- Props documentation with JSDoc
- File organization and one-component-per-file principle
- Package manager integration (Bun/npm scripts)
- Code review checklist (14-point verification)
- Compliant component example

**Key Rules:**
1. Every component must have a corresponding test file
2. Minimum 80% code coverage
3. Function length max 50 lines
4. Descriptive, self-documenting names
5. JSDoc documentation for complex logic
6. Detect and use appropriate package manager
7. Use Bun when available, fall back to npm

### Testing Requirements (`.agent/rules/testing-requirements.md`)

Comprehensive testing standards for React components.

**Coverage:**
- Test structure (describe blocks, test cases, setup/teardown)
- Comprehensive test scenarios (rendering, props, interactions, errors)
- React Testing Library best practices
- Mock data patterns and factories
- Coverage requirements (minimum 80%)
- Test documentation and naming
- Common testing mistakes to avoid
- Tool configuration (Jest, React Testing Library)

**Key Standards:**
1. 80% minimum code coverage (statements, branches, functions, lines)
2. Test names describe behavior, not implementation
3. Use user-centric React Testing Library queries
4. One behavior per test (avoid ANDs)
5. Clear setup/teardown with beforeEach/afterEach
6. Mock data should be centralized and reusable
7. Test file structure with organized describe blocks

### Readability Standards (`.agent/rules/readability-standards.md`)

Standards for writing clear, maintainable code.

**Coverage:**
- Function length (max 50 lines)
- Variable naming conventions (descriptive, no single letters)
- Comment guidelines (explain "why", not "what")
- React component patterns and file structure
- Conditional rendering best practices
- Event handler naming
- Performance considerations (no premature optimization)
- Code review checklist for readability

**Key Standards:**
1. No function exceeds 50 lines
2. All variables have descriptive names
3. Comments explain the "why"
4. One component per file
5. Optimize only after profiling
6. Readability prioritized over performance
7. Clear event handler names

## Package Manager Support

The typescript-coder supports both **Bun** and **npm** package managers with automatic detection.

### Bun Detection

The agent detects Bun projects by checking for:
- `bun.lockb` - Bun lock file
- `bunfig.toml` - Bun configuration file

**Bun Commands:**
- Install: `bun install`
- Run: `bun run <script>`
- Test: `bun run test`
- Build: `bun run build`

**Advantages:**
- Faster installs and builds
- Built-in bundler
- Better performance than npm

### NPM Fallback

Default when Bun is not detected.

**npm Commands:**
- Install: `npm install`
- Run: `npm run <script>`
- Test: `npm run test`
- Build: `npm run build`

### Package Manager Configuration

```json
{
  "packageManager": {
    "preferred": "bun",
    "fallback": "npm",
    "detection": "Check for bun.lockb or bunfig.toml; if present, use bun"
  }
}
```

### Usage in Agents and Skills

All agents and skills receive package manager configuration:

```typescript
{
  packageManager: {
    type: 'bun' | 'npm',
    installCommand: string,
    runCommand: string,
    testCommand: string,
    buildCommand: string
  }
}
```

This allows skills to generate correct scripts and commands for the detected package manager.

## Integration Flow

### Typical TypeScript Coder Agent Workflow

```
1. Analyze Requirements
   └─> information-skill analyzes requirements
   └─> Identifies complexity and design approach

2. Detect Package Manager
   └─> Agent checks for bun.lockb or bunfig.toml
   └─> Selects Bun or npm

3. Design Architecture
   └─> information-skill designs component structure
   └─> Plans multi-step implementation

4. Implement Component
   └─> action-skill generates TypeScript React component
   └─> Creates proper props interfaces
   └─> Adds JSDoc documentation

5. Create Tests
   └─> action-skill generates test suite
   └─> Ensures 80%+ coverage
   └─> Uses React Testing Library patterns

6. Validate & Review
   └─> information-skill reviews code against all rules
   └─> Verifies test coverage
   └─> Checks naming conventions and documentation

7. Return Results
   └─> Component code with props interface
   └─> Test file with comprehensive coverage
   └─> Documentation and metrics
```

### Cross-Agent Communication

**TypeScript Coder Agent → Research Agent:**
- Research component patterns and best practices
- Validate React and TypeScript conventions
- Research package manager features
- Verify testing strategies

**Research Agent → Other Agents:**
- Provide background research for decisions
- Validate technology selections
- Support architecture decisions

## File Structure

```
.agent/
├── agents/
│   └── agents/
│       ├── code-reviewer/
│       │   ├── AGENT.md                   # Configuration and review contract
│       │   └── README.md                  # Detailed documentation
│       ├── typescript-coder/
│       │   ├── agent-config.json          # Configuration
│       │   └── README.md                  # Documentation
│       └── research-agent/
│           └── README.md                  # Documentation
│
├── skills/
│   └── skills/
│       ├── information-skill/
│       │   └── README.md                  # Documentation
│       └── action-skill/
│           └── README.md                  # Documentation
│
└── rules/
    ├── component-creation-rules.md       # Component standards
    ├── testing-requirements.md           # Testing standards
    └── readability-standards.md          # Code readability standards

AGENT_SYSTEM_OVERVIEW.md                  # This file
```

## Extending the System

### Adding a New Agent

1. Create agent folder: `.agent/agents/agents/<agent-name>/`
2. Create `agent-config.json` with:
   - Agent name and specialization
   - List of capabilities
   - List of skills this agent invokes
   - Philosophy/principles
3. Create `README.md` with:
   - Clear purpose statement
   - List of skills
   - Example workflows
   - Integration points
4. Document in the "Agents" section of this file

### Adding a New Skill

1. Create skill folder: `.agent/skills/skills/<skill-name>/`
2. Create `README.md` with:
   - Purpose and responsibilities
   - Input contract (expected data structure)
   - Output contract (return values)
   - Standards enforced
   - Usage examples
3. Document in the "Skills" section of this file
4. Update agent `agent-config.json` to reference the skill

### Adding Rules

1. Create rule file in `.agent/rules/<rule-name>.md`
2. Include:
   - Rule statements and requirements
   - Examples of compliant and non-compliant behavior
   - How agents/skills enforce the rule
   - Code review checklist items
3. Document in the "Rules" section of this file

## Implementation Status

### Current Status
- ✅ Agent specifications and configuration files
- ✅ Comprehensive documentation for all agents and skills
- ✅ Complete rules and standards
- ✅ Package manager support (Bun/npm)

### Next Steps for Full Implementation
- [ ] Implement DeveloperAgent.ts orchestration logic
- [ ] Implement information-skill execution code
- [ ] Implement action-skill execution code
- [ ] Create skill test suites
- [ ] Implement TypeScript AST-based code generation
- [ ] Add ESLint and Prettier integration
- [ ] Create skill configuration files (skill-config.json)
- [ ] Add research-agent implementation
- [ ] Implement actual code analysis and generation
- [ ] Add performance profiling integration
- [ ] Create CI/CD pipeline integration

## Key References

### From Implementation Specifications
- **DEVELOPER_AGENT_IMPLEMENTATION.md** - Original agent implementation spec
- **DEVELOPER_AGENT_REACT_BUN_UPDATES.md** - Bun/npm package manager enhancements

### From Rules and Standards
- `.agent/rules/component-creation-rules.md` - Component creation and review standards
- `.agent/rules/testing-requirements.md` - Testing standards and best practices
- `.agent/rules/readability-standards.md` - Code readability standards

### From Agent Specifications
- `.agent/agents/agents/code-reviewer/README.md` - Code reviewer agent documentation
- `.agent/agents/agents/code-reviewer/AGENT.md` - Code reviewer configuration and contract
- `.agent/agents/agents/typescript-coder/README.md` - Developer agent detailed docs
- `.agent/agents/agents/typescript-coder/agent-config.json` - Agent configuration
- `.agent/agents/agents/research-agent/README.md` - Research agent detailed docs

### From Skill Specifications
- `.agent/skills/skills/information-skill/README.md` - Information skill specification
- `.agent/skills/skills/action-skill/README.md` - Action skill specification

## Usage for Developers

When working with the agentic system:

1. **Understand the architecture** - Review this document for system design
2. **Reference agent specs** - Check agent README.md for capabilities
3. **Reference skill specs** - Check skill README.md for input/output contracts
4. **Follow the rules** - Consult rule files for standards and best practices
5. **Extend systematically** - Follow the patterns when adding agents or skills

## Summary

The agentic architecture provides:
- **Clear separation of concerns** - Agents orchestrate, skills execute, rules constrain
- **Reusable components** - Skills can be composed by different agents
- **Consistent standards** - Rules ensure quality across all generated code
- **Extensible design** - New agents and skills follow established patterns
- **Package manager flexibility** - Built-in support for Bun and npm

This foundation enables efficient, scalable development of intelligent agents that can handle complex software engineering tasks.
