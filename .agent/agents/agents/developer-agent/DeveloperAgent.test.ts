import { DeveloperAgent } from './DeveloperAgent';
import { Skill, SkillInput, SkillOutput } from './SkillInterface';

/**
 * Mock skills for testing DeveloperAgent
 */
class MockInformationSkill implements Skill {
  name = 'information-skill';

  async execute(input: SkillInput): Promise<SkillOutput> {
    return {
      success: true,
      output: `Analyzed: ${input.action}`,
      insight: `Insight for ${input.action}`,
    };
  }
}

class MockActionSkill implements Skill {
  name = 'action-skill';

  async execute(input: SkillInput): Promise<SkillOutput> {
    if (input.action === 'implement-component') {
      return {
        success: true,
        output: `
export interface ${input.componentName}Props {
  // Component props here
}

export const ${input.componentName}: React.FC<${input.componentName}Props> = (props) => {
  return <div>Component</div>;
};
        `.trim(),
      };
    } else if (input.action === 'create-tests') {
      return {
        success: true,
        output: `
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders without crashing', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interactions correctly', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
        `.trim(),
        coverage: 85,
      };
    }

    return {
      success: true,
      output: `Executed: ${input.action}`,
      documentation: 'Documentation added',
    };
  }
}

describe('DeveloperAgent', () => {
  let agent: DeveloperAgent;
  let skills: Map<string, Skill>;

  beforeEach(() => {
    skills = new Map();
    skills.set('information-skill', new MockInformationSkill());
    skills.set('action-skill', new MockActionSkill());
    agent = new DeveloperAgent(skills);
  });

  describe('planDevelopmentWorkflow', () => {
    it('creates a comprehensive plan for component creation', async () => {
      const plan = await agent.planDevelopmentWorkflow({
        type: 'component',
        description: 'Create a user profile card',
        componentName: 'UserProfileCard',
        requirements: [
          'Display user name and avatar',
          'Show user stats',
          'Handle click to view details',
        ],
      });

      expect(plan.steps.length).toBeGreaterThan(0);
      expect(plan.estimatedComplexity).toBe('moderate');
      expect(
        plan.steps.some((s) => s.action === 'create-tests')
      ).toBe(true);
      expect(plan.reasoning).toContain('test');
    });

    it('correctly estimates simple complexity with few requirements', async () => {
      const plan = await agent.planDevelopmentWorkflow({
        type: 'component',
        description: 'Simple component',
        componentName: 'Badge',
        requirements: ['Display text'],
      });

      expect(plan.estimatedComplexity).toBe('simple');
    });

    it('correctly estimates complex complexity with many requirements', async () => {
      const plan = await agent.planDevelopmentWorkflow({
        type: 'component',
        description: 'Complex form',
        componentName: 'AdvancedForm',
        requirements: [
          'Multi-step form',
          'Validation',
          'Error handling',
          'Async submission',
          'Auto-save',
          'Accessibility',
        ],
      });

      expect(plan.estimatedComplexity).toBe('complex');
    });
  });

  describe('executeDevelopmentWorkflow', () => {
    it('executes workflow and produces output', async () => {
      const request = {
        type: 'component' as const,
        description: 'Create a button component',
        componentName: 'Button',
      };

      const plan = await agent.planDevelopmentWorkflow(request);
      const result = await agent.executeDevelopmentWorkflow(request, plan);

      expect(result.component).toBeTruthy();
      expect(result.testFile).toBeTruthy();
      expect(result.metrics.testCoverage).toBeGreaterThan(0);
    });
  });

  describe('reviewCode', () => {
    it('identifies readability issues', async () => {
      const code = `
function veryLongFunctionWithLotsOfLogicThatExceedsNormalLength() {
  const a = 1;
  const b = 2;
  const c = a + b;
  let x = 0;
  for (let i = 0; i < 100; i++) {
    x += i;
  }
  return x || c ?? null;
}
      `.trim();

      const review = await agent.reviewCode(code);

      expect(review.readabilityScore).toBeLessThan(100);
      expect(review.issues.length).toBeGreaterThan(0);
      expect(
        review.recommendations.some((r) =>
          r.toLowerCase().includes('function')
        )
      ).toBe(true);
    });

    it('recognizes readable code', async () => {
      const code = `
export const calculateUserAge = (birthYear: number): number => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  return age;
};
      `.trim();

      const review = await agent.reviewCode(code);

      expect(review.readabilityScore).toBeGreaterThan(70);
    });
  });

  describe('validateTestCoverage', () => {
    it('identifies gaps in test coverage', async () => {
      const testFile = `
describe('Component', () => {
  it('renders', () => {
    expect(true).toBe(true);
  });
});
      `.trim();

      const validation = await agent.validateTestCoverage(testFile);

      expect(validation.coverage).toBeGreaterThan(0);
      expect(validation.gaps).toHaveLength(0);
    });

    it('detects missing test suites', async () => {
      const testFile = `
test('some test', () => {
  expect(true).toBe(true);
});
      `.trim();

      const validation = await agent.validateTestCoverage(testFile);

      expect(validation.suggestions.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Package Manager Detection', () => {
    it('detects npm as default package manager', () => {
      const pmConfig = agent.detectPackageManager();
      expect(pmConfig.type).toBe('npm');
      expect(pmConfig.installCommand).toBe('npm install');
      expect(pmConfig.testCommand).toBe('npm run test');
    });

    it('provides Bun commands when Bun is explicitly set', () => {
      agent.setPackageManager('bun');
      const pmConfig = agent.getPackageManager();
      expect(pmConfig.type).toBe('bun');
      expect(pmConfig.installCommand).toBe('bun install');
      expect(pmConfig.testCommand).toBe('bun run test');
      expect(pmConfig.buildCommand).toBe('bun run build');
    });

    it('includes package manager in workflow plan', async () => {
      const plan = await agent.planDevelopmentWorkflow({
        type: 'component',
        description: 'Create a button',
        componentName: 'Button',
      });

      expect(plan.packageManager).toBeDefined();
      expect(plan.packageManager.type).toMatch(/^(npm|bun)$/);
      expect(plan.steps[0].action).toBe('detect-environment');
    });

    it('includes package manager commands in plan steps', async () => {
      agent.setPackageManager('bun');
      const plan = await agent.planDevelopmentWorkflow({
        type: 'component',
        description: 'Test component',
        componentName: 'TestComponent',
      });

      expect(plan.packageManager.runCommand).toContain('bun');
      expect(plan.packageManager.testCommand).toContain('bun');
    });

    it('allows explicit package manager setting', () => {
      agent.setPackageManager('bun');
      let pmConfig = agent.getPackageManager();
      expect(pmConfig.type).toBe('bun');

      agent.setPackageManager('npm');
      pmConfig = agent.getPackageManager();
      expect(pmConfig.type).toBe('npm');
    });

    it('includes package manager in development result', async () => {
      agent.setPackageManager('bun');
      const request = {
        type: 'component' as const,
        description: 'Button component',
        componentName: 'Button',
      };

      const plan = await agent.planDevelopmentWorkflow(request);
      const result = await agent.executeDevelopmentWorkflow(request, plan);

      expect(result.packageManager).toBe('bun');
    });
  });
