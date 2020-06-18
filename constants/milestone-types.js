import { APPLYING_FOR_JOBS, TAKING_CARE } from './job-search-categories';

export const RESUME = 'resume';
export const PERSONAL_VALUES = 'personal-values';
export const INTERVIEWING_SKILLS = 'interviewing-skills';

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
];

export default { MILESTONE_TYPES, RESUME, PERSONAL_VALUES, INTERVIEWING_SKILLS };
