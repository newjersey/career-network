import { APPLYING_FOR_JOBS, TAKING_CARE, FINDING_JOB } from './job-search-categories';

export const RESUME = 'resume';
export const INTERVIEWING_SKILLS = 'interviewing-skills';
export const PROFESSIONAL_NETWORK = 'professional-network';
export const RESEARCH_SKILLS = 'research-skills';
export const COVER_LETTER = 'cover-letter';
export const REFERENCES = 'references';
export const SOCIAL_NETWORK = 'social-network';
export const SELF_CARE_PLAN = 'self-care-plan';
export const STRESS_MANAGEMENT_PRACTICES = 'stress-management-practices';
export const JOB_GOALS = 'job-goals';
export const STAYING_MOTIVATED = 'staying-motivated';
export const STRENGTHS_AND_VALUES = 'strenths-and-values';

export const MILESTONE_TYPES = [
  {
    name: 'Resume',
    category_slug: APPLYING_FOR_JOBS,
    slug: RESUME,
  },
  {
    name: 'Interviewing Skills',
    category_slug: APPLYING_FOR_JOBS,
    slug: INTERVIEWING_SKILLS,
  },
  {
    name: 'Professional Network',
    category_slug: FINDING_JOB,
    slug: PROFESSIONAL_NETWORK,
  },
  {
    name: 'Research Skills',
    category_slug: FINDING_JOB,
    slug: RESEARCH_SKILLS,
  },
  {
    name: 'Cover Letter and Other Information',
    category_slug: APPLYING_FOR_JOBS,
    slug: COVER_LETTER,
  },
  {
    name: 'References',
    category_slug: APPLYING_FOR_JOBS,
    slug: REFERENCES,
  },
  {
    name: 'Supportive Social Network',
    category_slug: FINDING_JOB,
    slug: SOCIAL_NETWORK,
  },
  {
    name: 'Strengths and Values',
    category_slug: TAKING_CARE,
    slug: STRENGTHS_AND_VALUES,
  },
  {
    name: 'Self-Care Plan',
    category_slug: TAKING_CARE,
    slug: SELF_CARE_PLAN,
  },
  {
    name: 'Stress Management Practices',
    category_slug: TAKING_CARE,
    slug: STRESS_MANAGEMENT_PRACTICES,
  },
  {
    name: 'Job Goals',
    category_slug: APPLYING_FOR_JOBS,
    slug: JOB_GOALS,
  },
  {
    name: 'Staying Motivated',
    category_slug: TAKING_CARE,
    slug: STAYING_MOTIVATED,
  },
];

export default {
  MILESTONE_TYPES,
  RESUME,
  STAYING_MOTIVATED,
  INTERVIEWING_SKILLS,
  PROFESSIONAL_NETWORK,
  RESEARCH_SKILLS,
  COVER_LETTER,
  REFERENCES,
  SOCIAL_NETWORK,
  STRENGTHS_AND_VALUES,
  SELF_CARE_PLAN,
  STRESS_MANAGEMENT_PRACTICES,
};
