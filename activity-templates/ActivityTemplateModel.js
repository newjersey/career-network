/** CONSTANT DEFS */
// TODO: didn't use constants/ because node
const FINDING_JOB = 'finding-job-opportunities';
const APPLYING_FOR_JOBS = 'applying-for-jobs';
const TAKING_CARE = 'health';
const RESUME = 'resume';
const STAYING_MOTIVATED = 'staying-motivated';
const INTERVIEWING_SKILLS = 'interviewing-skills';
const PROFESSIONAL_NETWORK = 'professional-network';
const RESEARCH_SKILLS = 'research-skills';
const LIST_WANTS_MUST_HAVES = 'list-wants-and-must-haves';
const COVER_LETTER = 'cover-letter';
const REFERENCES = 'references';
const SOCIAL_NETWORK = 'social-network';
const STRENGTHS_AND_VALUES = 'strenths-and-values';
const SELF_CARE_PLAN = 'self-care-plan';
const STRESS_MANAGEMENT_PRACTICES = 'stress-management-practices';
const SUPPORTING_INFORMATION = 'supporting-information';

const JOB_SEARCH_CATEGORIES = [
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

const MILESTONE_TYPES = [
  {
    name: 'Resume',
    category_slug: APPLYING_FOR_JOBS,
    slug: RESUME,
  },
  {
    name: 'Staying Motivated',
    category_slug: TAKING_CARE,
    slug: STAYING_MOTIVATED,
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
    name: 'Strengths and Values',
    category_slug: APPLYING_FOR_JOBS,
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
    name: 'Supporting Information',
    category_slug: APPLYING_FOR_JOBS,
    slug: SUPPORTING_INFORMATION,
  },
];

function getComponent(obj) {
  switch (obj.Type) {
    case 'Text':
      return {
        component: 'text',
        content: obj.Content,
      };
    case 'List':
      return {
        component: 'list',
        heading: obj.ListHeading,
        subheading: obj.ListSubheading,
        items: obj.Items.map(item => item.Content),
      };
    case 'Callout':
      return {
        component: 'callout',
        variant: obj.Variant.toLowerCase(),
        content: obj.Content,
      };
    default:
      return null;
  }
}

const getQuestions = (qs, templateId) => ({
  component: 'practice_question_group',
  questions: qs
    .map(q => ({
      questionId: `${templateId}-q-${q.Order1}`,
      order: q.Order1,
      title: q.Question,
    }))
    .sort((q1, q2) => q1.Order1 - q2.Order1),
});

function getSections(data) {
  const templateId = `template-${data.Entry.Number}`;
  const whatAndWhy = {
    name: 'What & Why',
    slug: 'what-and-why',
    content: data.WhatandWhy.Component.map(cmp => getComponent(cmp)),
  };
  const tipsForSuccess = {
    name: 'Tips for Success',
    slug: 'tips-for-success',
    content: data.TipsForSuccess.Component.map(cmp => getComponent(cmp)),
  };

  const examples = {
    name: 'Examples',
    slug: 'examples',
    content:
      data.Examples.Component.length > 0
        ? data.Examples.Component.map(cmp => getComponent(cmp))
        : [],
  };

  const practice = {
    name: 'Practice',
    slug: 'practice',
    content: [
      getComponent(data.Practice.Description),
      getQuestions(data.Practice.Questions, templateId),
    ],
  };

  const nextSteps = {
    name: 'Next Steps',
    slug: 'next-steps',
    content: [{ component: 'callout', variant: 'next', content: data.NextSteps.Content }],
  };

  const citations = {
    name: 'Citations',
    slug: 'citations',
    content: data.Citations.CitationItems.map(item => ({
      component: 'citation',
      label: item.Label,
      url: item.URL,
    })),
  };

  return [whatAndWhy, tipsForSuccess, examples, practice, citations, nextSteps];
}

const getCategorySlug = category => JOB_SEARCH_CATEGORIES.find(cat => cat.name === category).slug;
const getMilestoneSlug = milestone => MILESTONE_TYPES.find(ms => ms.name === milestone).slug;

class ActivityTemplate {
  constructor(jsonData, originalFile = '') {
    this.original = originalFile;
    this.slug = `activity-template-${jsonData.Entry.Number}`;
    this.tempateId = `template-${jsonData.Entry.Number}`;
    this.title = jsonData.Title;
    this.category = getCategorySlug(jsonData.Category);
    this.milestone = getMilestoneSlug(jsonData.Milestone);
    this.total_time = jsonData.TotalTime;
    this.sections = getSections(jsonData);
  }

  get fileName() {
    return `${this.slug}.json`;
  }

  serialize() {
    return JSON.stringify(this);
  }
}

module.exports = ActivityTemplate;
