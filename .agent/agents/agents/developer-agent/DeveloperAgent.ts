/**
 * DeveloperAgent
 *
 * A TypeScript React developer agent specialized in creating well-tested, readable React components.
 * Automatically detects and uses Bun package manager when available, otherwise falls back to npm.
 * This agent prioritizes code clarity and comprehensive test coverage over micro-optimizations.
 */

import { Skill } from '../../../skills/SkillInterface';

interface DevelopmentRequest {
  type: 'component' | 'refactor' | 'review';
  description: string;
  framework?: 'react' | 'next';
  componentName?: string;
  requirements?: string[];
}

interface DevelopmentPlan {
  steps: WorkflowStep[];
  reasoning: string;
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
  packageManager: PackageManagerConfig;
}

interface WorkflowStep {
  order: number;
  action: string;
  skill: string;
  details: string;
  testCoverage?: string;
}

interface DevelopmentResult {
  component: string;
  testFile: string;
  documentation: string;
  packageManager: string;
  metrics: {
    readability: number; // 1-10
    testCoverage: number; // percentage
    complexity: number; // cyclomatic complexity
  };
}

interface PackageManagerConfig {
  type: 'bun' | 'npm';
  detected: boolean;
  installCommand: string;
  runCommand: string;
  testCommand: string;
  buildCommand: string;
}

export type PackageManager = 'bun' | 'npm';

export class DeveloperAgent {
  private name: string = 'developer-agent';
  private skills: Map<string, Skill>;
  private framework: string = 'react';
  private packageManager: PackageManager = 'npm';
  private philosophy = {
    testingFirst: true,
    readabilityFirst: true,
    selfDocumentingCode: true,
    useBunWhenAvailable: true,
  };

  constructor(skills: Map<string, Skill>) {
    this.skills = skills;
  }

  /**
   * Detect which package manager is available and preferred.
   * Checks for bun.lockb or bunfig.toml to determine if project uses Bun.
   */
  detectPackageManager(projectRoot?: string): PackageManagerConfig {
    // Check if project has Bun configuration files
    const usesBun = this.checkForBunIndicators(projectRoot);

    if (usesBun) {
      this.packageManager = 'bun';
      return {
        type: 'bun',
        detected: true,
        installCommand: 'bun install',
        runCommand: 'bun run',
        testCommand: 'bun run test',
        buildCommand: 'bun run build',
      };
    }

    return {
      type: 'npm',
      detected: false,
      installCommand: 'npm install',
      runCommand: 'npm run',
      testCommand: 'npm run test',
      buildCommand: 'npm run build',
    };
  }

  /**
   * Check for Bun project indicators (bun.lockb, bunfig.toml).
   * In a real implementation, this would check the filesystem.
   */
  private checkForBunIndicators(projectRoot?: string): boolean {
    // In production, this would check:
    // - fs.existsSync(path.join(projectRoot, 'bun.lockb'))
    // - fs.existsSync(path.join(projectRoot, 'bunfig.toml'))
    
    // For now, return false (can be overridden in tests or by explicit config)
    return false;
  }

  /**
   * Set package manager explicitly.
   */
  setPackageManager(manager: PackageManager): void {
    this.packageManager = manager;
  }

  /**
   * Get current package manager configuration.
   */
  getPackageManager(): PackageManagerConfig {
    return this.detectPackageManager();
  }

  /**
   * Interpret user intent and create a development plan.
   *
   * Breaks down requests into manageable steps:
   * 1. Detect package manager (Bun or npm)
   * 2. Understand requirements
   * 3. Plan component structure
   * 4. Implement component with readability in mind
   * 5. Create comprehensive tests
   * 6. Add documentation
   */
  async planDevelopmentWorkflow(
    request: DevelopmentRequest,
    projectRoot?: string
  ): Promise<DevelopmentPlan> {
    const pmConfig = this.detectPackageManager(projectRoot);
    const reasoning = this.analyzeRequest(request);

    const steps: WorkflowStep[] = [
      {
        order: 1,
        action: 'detect-environment',
        skill: 'information-skill',
        details: `Detect React environment and package manager (${pmConfig.type})`,
        testCoverage: 'Environment detection validation',
      },
      {
        order: 2,
        action: 'analyze-requirements',
        skill: 'information-skill',
        details: `Parse and clarify requirements for ${request.type} task`,
        testCoverage: 'Requirements validation tests',
      },
      {
        order: 3,
        action: 'design-structure',
        skill: 'information-skill',
        details: 'Design React component structure with readability as priority',
        testCoverage: 'Structure validation',
      },
      {
        order: 4,
        action: 'implement-component',
        skill: 'action-skill',
        details: `Generate TypeScript React component: ${request.componentName || 'Component'}`,
        testCoverage: 'N/A - component creation',
      },
      {
        order: 5,
        action: 'create-tests',
        skill: 'action-skill',
        details: 'Create comprehensive test suite (Jest + React Testing Library)',
        testCoverage: 'Aim for >80% code coverage',
      },
      {
        order: 6,
        action: 'add-documentation',
        skill: 'action-skill',
        details: 'Add JSDoc comments and README for complex logic',
        testCoverage: 'Documentation accuracy tests',
      },
    ];

    return {
      steps,
      reasoning,
      estimatedComplexity: this.estimateComplexity(request),
      packageManager: pmConfig,
    };
  }

  /**
   * Execute the development workflow using coordinated skills.
   */
  async executeDevelopmentWorkflow(
    request: DevelopmentRequest,
    plan: DevelopmentPlan
  ): Promise<DevelopmentResult> {
    console.log(`Starting React development workflow for: ${request.componentName}`);
    console.log(`Package Manager: ${plan.packageManager.type}`);

    let result: Partial<DevelopmentResult> = {
      component: '',
      testFile: '',
      documentation: '',
      packageManager: plan.packageManager.type,
      metrics: {
        readability: 0,
        testCoverage: 0,
        complexity: 0,
      },
    };

    for (const step of plan.steps) {
      console.log(
        `\n[Step ${step.order}] ${step.action}: ${step.details}`
      );

      if (step.skill === 'information-skill') {
        // Use information skill for planning and analysis
        result = await this.executeInformationStep(step, result as DevelopmentResult, plan.packageManager);
      } else if (step.skill === 'action-skill') {
        // Use action skill for implementation
        result = await this.executeActionStep(step, request, result as DevelopmentResult, plan.packageManager);
      }
    }

    return result as DevelopmentResult;
  }

  /**
   * Execute an information gathering step.
   */
  private async executeInformationStep(
    step: WorkflowStep,
    currentResult: DevelopmentResult,
    pmConfig: PackageManagerConfig
  ): Promise<DevelopmentResult> {
    const skill = this.skills.get('information-skill');
    if (!skill) {
      throw new Error('information-skill not available');
    }

    // Invoke skill with appropriate context including package manager
    const stepResult = await skill.execute({
      action: step.action,
      details: step.details,
      philosophy: this.philosophy,
      packageManager: pmConfig.type,
      framework: this.framework,
    });

    return {
      ...currentResult,
      documentation: (currentResult.documentation || '') + stepResult.insight,
    };
  }

  /**
   * Execute an action step (implementation).
   */
  private async executeActionStep(
    step: WorkflowStep,
    request: DevelopmentRequest,
    currentResult: DevelopmentResult,
    pmConfig: PackageManagerConfig
  ): Promise<DevelopmentResult> {
    const skill = this.skills.get('action-skill');
    if (!skill) {
      throw new Error('action-skill not available');
    }

    // Enforce testing requirements for component and test creation
    const actionContext = {
      action: step.action,
      details: step.details,
      framework: request.framework || 'react',
      testingRequired: step.action === 'create-tests',
      readabilityFirst: true,
      philosophy: this.philosophy,
      packageManager: pmConfig.type,
      runCommand: pmConfig.runCommand,
      testCommand: pmConfig.testCommand,
      buildCommand: pmConfig.buildCommand,
    };

    const stepResult = await skill.execute(actionContext);

    // Update result based on action type
    if (step.action === 'implement-component') {
      currentResult.component = stepResult.output;
    } else if (step.action === 'create-tests') {
      currentResult.testFile = stepResult.output;
      currentResult.metrics.testCoverage = stepResult.coverage || 0;
    } else if (step.action === 'add-documentation') {
      currentResult.documentation = stepResult.documentation || '';
    }

    return currentResult;
  }

  /**
   * Analyze a request to understand user intent and constraints.
   */
  private analyzeRequest(request: DevelopmentRequest): string {
    const intentions: string[] = [];

    if (request.type === 'component') {
      intentions.push(
        `Create a new React component with clear, readable code structure`
      );
      intentions.push(`Ensure comprehensive test coverage for all behaviors`);
      intentions.push(`Add JSDoc documentation for complex logic`);
    } else if (request.type === 'refactor') {
      intentions.push(
        `Improve readability and maintainability of existing code`
      );
      intentions.push(`Refactor tests to match new structure`);
      intentions.push(
        `Maintain or improve test coverage during refactoring`
      );
    } else if (request.type === 'review') {
      intentions.push(`Assess code against readability standards`);
      intentions.push(`Check test coverage and quality`);
      intentions.push(
        `Provide actionable recommendations for improvement`
      );
    }

    return intentions.join('; ');
  }

  /**
   * Estimate complexity based on requirements.
   */
  private estimateComplexity(
    request: DevelopmentRequest
  ): 'simple' | 'moderate' | 'complex' {
    const requirementCount = request.requirements?.length || 0;

    if (requirementCount <= 2) return 'simple';
    if (requirementCount <= 5) return 'moderate';
    return 'complex';
  }

  /**
   * Review code for readability and testability.
   */
  async reviewCode(code: string): Promise<{
    readabilityScore: number;
    issues: string[];
    recommendations: string[];
  }> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check for long functions (readability)
    if (code.split('\n').length > 50) {
      issues.push('Function exceeds 50 lines - consider breaking into smaller functions');
      recommendations.push('Extract sub-functions with clear responsibility');
    }

    // Check for unclear variable names
    if (/\b[a-z]\b(?!\s*[=:])/g.test(code)) {
      issues.push('Single-letter variables found - use descriptive names');
      recommendations.push('Replace with names that explain intent (e.g., "index" instead of "i")');
    }

    // Check for missing comments on complex logic
    if (code.includes('??') || code.includes('?.') || code.includes('||')) {
      if (!code.includes('//') && !code.includes('/**')) {
        recommendations.push('Add comments explaining complex logical operators');
      }
    }

    const readabilityScore = Math.max(0, 100 - issues.length * 15);

    return {
      readabilityScore,
      issues,
      recommendations,
    };
  }

  /**
   * Ensure tests are comprehensive and well-structured.
   */
  async validateTestCoverage(testFile: string): Promise<{
    coverage: number;
    gaps: string[];
    suggestions: string[];
  }> {
    const gaps: string[] = [];
    const suggestions: string[] = [];

    // Check for describe blocks
    if (!testFile.includes('describe(')) {
      gaps.push('No test suites (describe blocks) found');
    }

    // Check for it/test blocks
    if (!testFile.includes('test(') && !testFile.includes('it(')) {
      gaps.push('No individual tests found');
    }

    // Check for setup/teardown
    if (
      !testFile.includes('beforeEach') &&
      !testFile.includes('afterEach')
    ) {
      suggestions.push('Consider adding beforeEach/afterEach for test setup and cleanup');
    }

    // Estimate coverage (very rough)
    const testCount = (testFile.match(/(?:test|it)\(/g) || []).length;
    const coverage = Math.min(100, testCount * 15);

    return {
      coverage,
      gaps,
      suggestions,
    };
  }
}
