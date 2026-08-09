# Test Validation Skill

A reusable skill for analyzing, validating, and measuring test quality and coverage across different testing frameworks and languages.

## Purpose

- Analyze test files for quality and completeness
- Validate test coverage and adequacy
- Identify gaps in test scenarios
- Assess test structure and organization
- Measure test effectiveness

## Responsibilities

### Test Analysis
- Parse test files and identify test cases
- Extract test scenarios and coverage areas
- Analyze test structure (describe blocks, test cases, setup/teardown)
- Identify test patterns and anti-patterns
- Detect missing or inadequate tests

### Coverage Assessment
- Measure test coverage (statements, branches, functions, lines)
- Identify untested code paths
- Assess coverage adequacy
- Recommend coverage improvements
- Track coverage trends

### Test Quality Evaluation
- Check test naming clarity (behavior vs implementation)
- Validate test organization and structure
- Assess mock data usage and reusability
- Evaluate assertion clarity
- Check for test isolation and independence

### Standards Validation
- Verify adherence to testing standards
- Check framework-specific best practices
- Validate test file organization
- Ensure proper setup/teardown
- Verify test documentation

## Input Contract

```typescript
{
  // Test validation operation
  operation: 'analyze-structure' | 'measure-coverage' | 'assess-quality' | 'identify-gaps',
  
  // Test files
  testCode: string,                      // Test file content
  sourceCode?: string,                   // Source code being tested
  
  // Language and framework
  language: 'typescript' | 'javascript' | 'python' | 'java' | 'go' | string,
  framework?: 'jest' | 'pytest' | 'junit' | 'go testing' | string,
  
  // Coverage data (optional)
  coverageReport?: {
    statements: number,                  // 0-100
    branches: number,                    // 0-100
    functions: number,                   // 0-100
    lines: number                        // 0-100
  },
  
  // Standards
  standards?: {
    minCoverage?: number,                // Default: 80
    minDescribeBlocks?: number,          // Default: 1
    minTestCases?: number,               // Default: depends on complexity
    maxTestLength?: number,              // Max lines per test
    requiredSetup?: boolean              // beforeEach/beforeAll
  },
  
  // Options
  options?: {
    detectAntiPatterns?: boolean,
    checkNaming?: boolean,
    validateMocks?: boolean,
    checkDocumentation?: boolean
  }
}
```

## Output Contract

```typescript
{
  // Operation result
  success: boolean,
  operation: string,
  language: string,
  framework?: string,
  
  // Test analysis
  analysis?: {
    // Structure
    structure: {
      describeBlocks: number,            // Number of describe blocks
      testCases: number,                 // Number of it/test blocks
      setupBlocks: number,               // beforeEach/beforeAll
      teardownBlocks: number,            // afterEach/afterAll
      mocks: number,                     // Number of mocks/stubs
      assertions: number                 // Estimated number of assertions
    },
    
    // Test scenarios
    scenarios: Array<{
      name: string,
      type: 'rendering' | 'props' | 'interaction' | 'state' | 'error' | 'edge-case',
      line?: number,
      hasMocks?: boolean,
      estimatedCoverage?: string[]       // Code paths covered
    }>,
    
    // Coverage assessment
    coverage?: {
      statements?: number,               // 0-100
      branches?: number,                 // 0-100
      functions?: number,                // 0-100
      lines?: number,                    // 0-100
      gapAnalysis?: {
        uncoveredLines?: number[],
        uncoveredBranches?: string[],
        uncoveredFunctions?: string[]
      }
    },
    
    // Quality metrics
    quality: {
      score: number,                     // 0-100
      naming: number,                    // Quality of test names
      organization: number,              // Test structure and organization
      documentation: number,             // Comments and descriptions
      isolation: number                  // Test independence
    },
    
    // Issues found
    issues?: Array<{
      type: 'naming' | 'structure' | 'coverage' | 'pattern' | 'documentation' | 'mock',
      severity: 'error' | 'warning' | 'info',
      message: string,
      line?: number,
      suggestion?: string
    }>,
    
    // Anti-patterns detected
    antiPatterns?: Array<{
      pattern: string,
      description: string,
      line?: number,
      suggestion?: string
    }>,
    
    // Summary
    summary: string,
    strengths: string[],
    improvements: string[]
  },
  
  // Coverage gaps
  gaps?: Array<{
    type: 'scenario' | 'edge-case' | 'error-handling',
    description: string,
    recommendation: string
  }>,
  
  error?: string
}
```

## Standards Enforced

### Test Structure
- **Describe Blocks**: One per component/function
- **Test Cases**: Clear, descriptive names
- **Setup/Teardown**: beforeEach/beforeAll for common setup
- **Mocks**: Clear mock definitions, properly reset
- **Assertions**: One primary assertion per test (may have supporting ones)

### Test Naming
- **Behavior-Focused**: Describe what the code does, not how
- **Clarity**: Names should be readable without looking at code
- **Format**: Should read like a specification
- **Examples**:
  - ✅ "renders user name when provided"
  - ✅ "calls onEdit callback with user ID when edit button clicked"
  - ❌ "sets state"
  - ❌ "tests handleClick"

### Coverage Requirements
- **Minimum**: 80% across all metrics
- **Statements**: ≥80% of code executed
- **Branches**: ≥80% of if/else branches tested
- **Functions**: ≥80% of functions called
- **Lines**: ≥80% of executable lines run

### Test Scenarios

Every test file should cover:
1. **Rendering**: Component renders without errors
2. **Props Handling**: Valid and invalid props
3. **Interactions**: User actions and callbacks
4. **State Changes**: State transitions
5. **Error Handling**: Error states and edge cases
6. **Edge Cases**: Boundary conditions and unusual inputs

### Language-Specific Standards

### Jest (JavaScript/TypeScript)
- `describe` blocks for grouping
- `it` or `test` for individual tests
- `beforeEach`/`afterEach` for setup/teardown
- `jest.fn()` for mocks
- Expect assertions
- React Testing Library for React components

### Pytest (Python)
- Test functions starting with `test_`
- Test classes starting with `Test`
- Fixtures for setup/teardown
- `unittest.mock` for mocking
- `assert` statements
- Clear test organization

### JUnit (Java)
- Test methods with `@Test` annotation
- `@BeforeEach`/`@Before` for setup
- `@AfterEach`/`@After` for teardown
- AssertJ or standard assert
- Test class per tested class
- Clear naming conventions

### Go Testing
- Test functions with `Test` prefix
- `t.Run()` for subtests
- `*testing.T` parameter
- Clear assertions or error checking
- Table-driven tests for multiple cases

## Anti-Patterns Detected

- ❌ Tests named after implementation (not behavior)
- ❌ Multiple behaviors in one test
- ❌ Shared state between tests
- ❌ No setup/teardown
- ❌ Testing internal implementation details
- ❌ Fragile tests that break with refactoring
- ❌ Incomplete mock setup
- ❌ Missing error case tests
- ❌ Inadequate edge case coverage
- ❌ Over-mocking (mock external dependencies but not the code under test)

## Coverage Scoring

**Test Quality Score (0-100):**
- Naming clarity: 25 points
- Test organization: 25 points
- Coverage adequacy: 25 points
- Documentation and comments: 25 points

**Coverage Score (0-100):**
- Statements: 25 points
- Branches: 25 points
- Functions: 25 points
- Lines: 25 points

## Usage Example

```typescript
// Analyze test structure
const analysis = await testValidationSkill.execute({
  operation: 'analyze-structure',
  testCode: testFileContent,
  language: 'typescript',
  framework: 'jest'
});

// Measure coverage
const coverage = await testValidationSkill.execute({
  operation: 'measure-coverage',
  testCode: testFileContent,
  sourceCode: componentCode,
  language: 'typescript',
  standards: {
    minCoverage: 80
  }
});

// Assess quality
const quality = await testValidationSkill.execute({
  operation: 'assess-quality',
  testCode: testFileContent,
  language: 'typescript',
  options: {
    detectAntiPatterns: true,
    checkNaming: true
  }
});

// Identify gaps
const gaps = await testValidationSkill.execute({
  operation: 'identify-gaps',
  testCode: testFileContent,
  sourceCode: componentCode,
  language: 'typescript',
  framework: 'jest'
});
```

## Next Steps

- [ ] Implement test file parsing for each framework
- [ ] Add coverage report integration
- [ ] Implement anti-pattern detection
- [ ] Add code path analysis
- [ ] Create coverage gap recommendations
- [ ] Implement test naming quality scoring
- [ ] Add framework-specific analysis engines
- [ ] Integrate with CI/CD coverage reports
- [ ] Add historical coverage tracking
- [ ] Implement test effectiveness scoring
