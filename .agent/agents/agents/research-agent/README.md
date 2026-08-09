# Research Agent

An agent designed to gather, analyze, and synthesize information to support other agents and complex decision-making.

## Purpose

- Query external knowledge sources and documentation
- Perform code analysis and pattern recognition
- Synthesize research results into actionable insights
- Validate claims and verify information accuracy
- Provide concise, well-sourced findings

## Specialization

While the developer-agent specializes in React component development, the research-agent provides general-purpose information gathering for:
- Architecture research and design decisions
- Framework and library evaluation
- Performance and optimization research
- Security and best practices validation
- Industry trends and standards research
- Documentation synthesis

## Capabilities

### Information Gathering
- Search documentation and knowledge bases
- Retrieve specifications and standards
- Gather examples and usage patterns
- Collect relevant code snippets
- Track information sources and citations

### Analysis & Synthesis
- Identify patterns across multiple sources
- Synthesize conflicting information
- Evaluate pros/cons of approaches
- Validate claims with evidence
- Organize findings into clear summaries

### Validation
- Verify claim accuracy
- Check currency of information
- Validate against authoritative sources
- Cross-reference multiple sources
- Identify knowledge gaps

## Integration Points

### With Developer Agent
- Research component patterns and best practices
- Validate React and TypeScript conventions
- Research package manager features (Bun vs npm)
- Verify testing strategies and tools
- Research accessibility standards

### With Other Agents
- Provide background research for decision-making
- Validate architecture decisions
- Research technology selections
- Support complex problem-solving

## Input Contract

The research-agent receives:
```typescript
{
  // The research topic or question
  query: string,
  
  // Research scope and focus
  type?: 'pattern-research' | 'validation' | 'comparison' | 'synthesis' | 'implementation',
  
  // Domain context
  domain?: 'react' | 'typescript' | 'testing' | 'performance' | 'architecture' | 'general',
  
  // Research constraints
  maxSources?: number,                        // Default: 10
  depthLevel?: 'shallow' | 'moderate' | 'deep',
  
  // Additional context
  context?: string,                           // Additional background
  relatedQueries?: string[],                  // Related research areas
}
```

## Output Contract

The research-agent returns:
```typescript
{
  // Query and metadata
  query: string,
  type: string,
  
  // Findings
  findings: {
    summary: string,                          // Executive summary
    keyPoints: string[],                      // Main findings
    
    sources: Array<{
      title: string,
      url: string,
      type: 'documentation' | 'article' | 'specification' | 'example',
      relevance: number                       // 0-100
    }>,
    
    patterns?: string[],                      // Identified patterns
    comparisons?: {                           // For comparison research
      option: string,
      pros: string[],
      cons: string[]
    }[],
    
    recommendations?: Array<{
      recommendation: string,
      rationale: string,
      applicability: 'always' | 'sometimes' | 'context-dependent'
    }>
  },
  
  // Research metadata
  completeness: number,                       // 0-100 confidence
  gaps?: string[],                            // Areas needing more research
  followUpQueries?: string[],                 // Recommended next research
  
  error?: string
}
```

## Research Areas Supported

### React Development
- React 18+ features and best practices
- Hooks patterns and performance
- Component composition strategies
- State management approaches
- Testing strategies for React components

### TypeScript & Development
- TypeScript type patterns
- TSX/JSX best practices
- Module organization strategies
- Build tool configurations (Vite, webpack, Bun)
- Development workflow optimization

### Package Managers
- Bun capabilities and ecosystem
- npm workspaces and monorepo strategies
- Package manager performance comparison
- Lock file best practices
- Dependency management strategies

### Testing & Quality
- Jest configuration and patterns
- React Testing Library best practices
- Test coverage strategies
- Accessibility testing approaches
- CI/CD integration patterns

### Architecture & Design
- Component architecture patterns
- Design system principles
- Scalability considerations
- Performance optimization strategies
- Accessibility standards (WCAG, ARIA)

## Integration with Skills

The research-agent may coordinate with information-skill for:
- Validation of research findings
- Cross-referencing of standards
- Analysis of discovered patterns
- Summarization of large research results

## Usage Example

```typescript
// Research React patterns
const patterns = await researchAgent.execute({
  query: 'Best practices for managing form state in React 18',
  type: 'pattern-research',
  domain: 'react',
  depthLevel: 'moderate'
});

// Compare package managers
const comparison = await researchAgent.execute({
  query: 'Bun vs npm: performance, ecosystem maturity, and migration path',
  type: 'comparison',
  domain: 'general',
  maxSources: 15
});

// Validate testing strategy
const validation = await researchAgent.execute({
  query: 'Is 80% test coverage adequate for production React components?',
  type: 'validation',
  domain: 'testing'
});

// Synthesize accessibility guidelines
const accessibility = await researchAgent.execute({
  query: 'WCAG 2.1 accessibility requirements for interactive React components',
  type: 'synthesis',
  domain: 'react'
});
```

## Standards and Principles

- **Source Quality**: Prioritize official documentation over blog posts
- **Currency**: Verify information is current (especially for fast-moving ecosystems)
- **Attribution**: Always cite sources clearly
- **Objectivity**: Present multiple viewpoints on debated topics
- **Clarity**: Synthesize findings into clear, actionable insights
- **Completeness**: Identify research gaps and recommend follow-up queries

## Next Steps

- [ ] Integrate with external documentation APIs (GitHub, npm, official docs)
- [ ] Add source crawling and indexing for faster research
- [ ] Implement cross-source validation logic
- [ ] Create knowledge base of common research patterns
- [ ] Add caching for frequently researched topics
- [ ] Implement citation formatting and bibliography generation
- [ ] Add source credibility scoring
- [ ] Create research templates for common queries
- [ ] Add integration with architecture decision records (ADRs)
