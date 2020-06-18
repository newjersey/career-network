export const FINDING_JOB = 'finding-job-opportunities';
export const APPLYING_FOR_JOBS = 'applying-for-jobs';
export const TAKING_CARE = 'health';

export const JOB_SEARCH_CATEGORIES = [
  {
    name: 'Finding Job Opportunities',
    slug: FINDING_JOB,
  },
  {
    name: 'Applying for Jobs',
    slug: APPLYING_FOR_JOBS,
  },
  {
    name: 'Taking Care of Yourself',
    slug: TAKING_CARE,
  },
];

export const JOB_SEARCH_CATEGORY_COLORS = {
  [FINDING_JOB]: '#244cd2',
  [APPLYING_FOR_JOBS]: '#f5bc17',
  [TAKING_CARE]: '#a647cb',
};

export default {
  FINDING_JOB,
  APPLYING_FOR_JOBS,
  TAKING_CARE,
  JOB_SEARCH_CATEGORIES,
  JOB_SEARCH_CATEGORY_COLORS,
};
