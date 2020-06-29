import React from 'react';
import path from 'path';
import fs from 'fs';
import PropTypes from 'prop-types';
import { withAuthRequired } from '../../components/Auth';
import { fullyLoaded } from '../../src/app-helper';
import Milestone from '../../components/milestone/Milestone';
import { useAllActivityTemplates } from '../../components/Firebase';
import FullPageProgress from '../../components/FullPageProgress';
import withTitle from '../../components/withTitle';
import ActivityTemplatePropTypes from '../../components/activityTemplate/PropTypes';

function MilestonePage({ milestone }) {
  const allTemplates = useAllActivityTemplates();

  const activityTemplates = allTemplates.filter(
    template => template.category === milestone.category
  );

  return fullyLoaded(allTemplates) ? (
    <Milestone milestone={milestone} activityTemplates={activityTemplates} />
  ) : (
    <FullPageProgress />
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'components/milestone/data');
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map(filename => ({
    params: { milestone: filename.replace('.json', '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(
    process.cwd(),
    `components/milestone/data/${params.milestone}.json`
  );
  const fileContent = fs.readFileSync(postsDirectory, 'utf8');

  return {
    props: {
      milestone: JSON.parse(fileContent),
    },
  };
}

MilestonePage.propTypes = {
  milestone: PropTypes.shape({
    title: PropTypes.string,
    slug: ActivityTemplatePropTypes.milestoneSlug.isRequired,
    category: ActivityTemplatePropTypes.jobCategorySlug.isRequired,
  }).isRequired,
};

export default withAuthRequired(withTitle(MilestonePage, 'Milestone'));
