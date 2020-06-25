import PropTypes from 'prop-types';
import { MILESTONE_TYPES, JOB_SEARCH_CATEGORIES } from '../../constants';

const milestoneSlug = PropTypes.oneOf(MILESTONE_TYPES.map(milestone => milestone.slug));
const jobCategorySlug = PropTypes.oneOf(JOB_SEARCH_CATEGORIES.map(cat => cat.slug));

const milestone = PropTypes.shape({
  name: PropTypes.string,
  category_slug: jobCategorySlug,
  slug: milestoneSlug,
});

const jobCategory = PropTypes.shape({
  name: PropTypes.string,
  slug: jobCategorySlug,
});

export default { milestoneSlug, jobCategorySlug, milestone, jobCategory };
