/**
 * Skill Interface
 *
 * Defines the contract that all skills must implement.
 * Skills are autonomous executors that agents coordinate.
 */

export interface SkillInput {
  action: string;
  [key: string]: unknown;
}

export interface SkillOutput {
  success: boolean;
  output: string;
  [key: string]: unknown;
}

export interface Skill {
  name: string;
  execute(input: SkillInput): Promise<SkillOutput>;
}
