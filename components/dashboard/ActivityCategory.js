export default function getActivityCategory(activity) {
  const CATEGORIES = {
    apply: 'Finding openings/Applying',
    marketing: 'Marketing Materials',
    relationship: 'Relationship-Building',
    research: 'Researching People & Organizations',
    other: 'Other',
  };
  const ACTIVITY_CATEGORIE_MAPPINGS = {
    openings: CATEGORIES.apply,
    application: CATEGORIES.apply,
    'interview-prep': CATEGORIES.apply,
    materials: CATEGORIES.marketing,
    'networking-irl': CATEGORIES.relationship,
    'networking-virtual': CATEGORIES.relationship,
    'research-company-industry': CATEGORIES.research,
    'research-contacts': CATEGORIES.research,
    other: CATEGORIES.other,
  };
  return ACTIVITY_CATEGORIE_MAPPINGS[activity];
}
