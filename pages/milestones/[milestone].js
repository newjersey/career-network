import React from 'react';
import path from 'path';
import fs from 'fs';
import PropTypes from 'prop-types';
import { withAuthRequired } from '../../components/Auth';
import Milestone from '../../components/milestone/Milestone';
import withTitle from '../../components/withTitle';

function MilestonePage({ milestone }) {
  return <Milestone milestone={milestone} />;
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
  }).isRequired,
};

export default withAuthRequired(withTitle(MilestonePage, 'Milestone'));
