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
    content: data.NextSteps.Content,
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

class ActivityTemplate {
  constructor(jsonData, originalFile = '') {
    this.original = originalFile;
    this.slug = `activity-template-${jsonData.Entry.Number}`;
    this.tempateId = `template-${jsonData.Entry.Number}`;
    this.title = jsonData.Title;
    this.category = jsonData.Category;
    this.milestone = jsonData.Milestone;
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
