import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import FirebasePropTypes from '../Firebase/PropTypes';
import ProfileItemCard from './ProfileItemCard';
import UserProfileCard from './UserProfileCard';
import ScaffoldContainer from '../ScaffoldContainer';
import Goal from './Goal';

const ROW_GAP = 2;
const COL_GAP = 2;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  subtitle: {
    display: 'inline-block',
  },
  container: {
    marginTop: theme.spacing(-5),
  },
  grid: {
    display: 'grid',
    marginTop: theme.spacing(4),
    gridGap: theme.spacing(ROW_GAP, COL_GAP),
    gridTemplateAreas: `
      'H'
      'C'
      'L'
      'R'
    `,

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateAreas: `
        '. H .'
        'L C R'
      `,
    },

    /* All Following CSS exists to support IE 11. Keep in sync with the grid CSS above.
     * Helpful tool: https://autoprefixer.github.io/
     */
    '-ms-grid-rows': `
      auto
      ${theme.spacing(ROW_GAP)}px
      auto
      ${theme.spacing(ROW_GAP)}px
      auto
      ${theme.spacing(ROW_GAP)}px
      auto`,
  },
  gridH: { '-ms-grid-row': 1, '-ms-grid-column': 1, 'grid-area': 'H' },
  gridC: { '-ms-grid-row': 3, '-ms-grid-column': 1, 'grid-area': 'C' },
  gridL: { '-ms-grid-row': 5, '-ms-grid-column': 1, 'grid-area': 'L' },
  gridR: { '-ms-grid-row': 7, '-ms-grid-column': 1, 'grid-area': 'R' },
  [theme.breakpoints.up('md')]: {
    grid: {
      '-ms-grid-columns': `1fr ${theme.spacing(COL_GAP)}px 2fr ${theme.spacing(COL_GAP)}px 1fr`,
      '-ms-grid-rows': `auto ${theme.spacing(ROW_GAP)}px auto`,
    },
    gridH: { '-ms-grid-row': 1, '-ms-grid-column': 3 },
    gridC: { '-ms-grid-row': 3, '-ms-grid-column': 3 },
    gridL: { '-ms-grid-row': 3, '-ms-grid-column': 1 },
    gridR: { '-ms-grid-row': 3, '-ms-grid-column': 5 },
  },
}));

const PROFILE_ITEMS = [
  {
    title: 'Education Experience',
    value: 'educationItems',
    description: 'Edit Your Profile to add Education History',
  },
  {
    title: 'Employment Experience',
    value: 'employmentItems',
    description: 'Edit Your Profile to add Employment Experience',
  },
];

const PHONE_QUESTION_ID = 'recDkvWeqvMxahFT2';
const profile = {
  goal: `I will land a job as an Analyst with a financial institution by the end of this
  year. To accomplish this goal, I will improve my skills with Microsoft Excel. I will
  connect with other Analysts in my network to learn about their career paths.`,
  educationItems: [
    {
      school: 'Trenton Central Highschool',
      field: 'General Education',
      startYear: 2011,
      startMonth: 'January',
      endYear: 2015,
      endMonth: 'March',
    },
  ],
  employmentItems: [
    {
      org: 'Nordstrom',
      title: 'Retail Asscociate',
      startYear: 2017,
      startMonth: 'January',
      endYear: 2020,
      endMonth: 'March',
    },
    {
      org: "Trader Joe's",
      title: 'Retail Asscociate',
      startYear: 2015,
      startMonth: 'October',
      endYear: 2017,
      endMonth: 'August',
    },
  ],
};

function Profile({ allQuestionResponses }) {
  const classes = useStyles();
  const { user } = useAuth();
  const questionResponse = allQuestionResponses.find(doc => doc.id === PHONE_QUESTION_ID);
  const phoneNumber = questionResponse && questionResponse.data().value;

  return (
    <div className={classes.root}>
      <Goal goal={profile.goal} />
      <ScaffoldContainer>
        <Box className={classes.grid} mb={10}>
          <Box className={classes.gridC}>
            {PROFILE_ITEMS.map(item => (
              <Box mb={3}>
                <ProfileItemCard title={item.title} items={profile[item.value]} type={item.value} />
              </Box>
            ))}
          </Box>
          <Box className={classes.gridL} position="relative">
            <UserProfileCard user={user} phoneNumber={phoneNumber} />
          </Box>
          <Box className={classes.gridR}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Support Services
                </Typography>
                <Typography variant="body2" gutterBottom>
                  NJ residents may be eligible for a variety of support services. Select the Support
                  Services you are interested in getting more information about.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </ScaffoldContainer>
    </div>
  );
}
Profile.propTypes = { allQuestionResponses: FirebasePropTypes.querySnapshot.isRequired };

export default Profile;
