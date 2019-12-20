import AirtablePropTypes from '../Airtable/PropTypes';

export default function getActivityCategory(activityTypeValue) {
  const CATEGORIES = AirtablePropTypes.TASK_CATEGORIES;

  const ACTIVITY_CATEGORY_MAPPINGS = {
    openings: CATEGORIES.apply.name,
    application: CATEGORIES.apply.name,
    'interview-prep': CATEGORIES.apply.name,
    materials: CATEGORIES.marketing.name,
    'networking-irl': CATEGORIES.relationship.name,
    'networking-virtual': CATEGORIES.relationship.name,
    'research-company-industry': CATEGORIES.research.name,
    'research-contacts': CATEGORIES.research.name,
    other: CATEGORIES.other.name,
  };
  return ACTIVITY_CATEGORY_MAPPINGS[activityTypeValue];
}
