import { APPLYING_FOR_JOBS, TAKING_CARE, FINDING_JOB } from './job-search-categories';

export const RESUME = 'resume';
export const PERSONAL_VALUES = 'personal-values';
export const INTERVIEWING_SKILLS = 'interviewing-skills';
export const PROFESSIONAL_NETWORK = 'professional-network';
export const RESEARCH_SKILLS = 'research-skills';
export const LIST_WANTS_MUST_HAVES = 'list-wants-and-must-haves';
export const COVER_LETTER = 'cover-letter';
export const REFERENCES = 'references';
export const SOCIAL_NETWORK = 'social-network';
export const LIST_STRENGTHS = 'list-of-strengths';
export const SELF_CARE_PLAN = 'self-care-plan';
export const STRESS_MANAGEMENT_PRACTICES = 'stress-management-practices';

export const MILESTONE_TYPES = [
  {
    name: 'Resume',
    category_slug: APPLYING_FOR_JOBS,
    slug: RESUME,
  },
  {
    name: 'Personal Values',
    category_slug: TAKING_CARE,
    slug: PERSONAL_VALUES,
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
    name: 'List of Your ‘Wants’ and ‘Must Haves’',
    category_slug: APPLYING_FOR_JOBS,
    slug: LIST_WANTS_MUST_HAVES,
  },
  {
    name: 'Cover Letter',
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
    name: 'List of Strengths',
    category_slug: TAKING_CARE,
    slug: LIST_STRENGTHS,
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
];

export default {
  MILESTONE_TYPES,
  RESUME,
  PERSONAL_VALUES,
  INTERVIEWING_SKILLS,
  PROFESSIONAL_NETWORK,
  RESEARCH_SKILLS,
  LIST_WANTS_MUST_HAVES,
  COVER_LETTER,
  REFERENCES,
  SOCIAL_NETWORK,
  LIST_STRENGTHS,
  SELF_CARE_PLAN,
  STRESS_MANAGEMENT_PRACTICES,
};
