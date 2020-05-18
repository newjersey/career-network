import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../Auth';
import Goal from './Goal';
import GoalEditCard from './GoalEditCard';
import ProfileItemCard from './ProfileItemCard';
import ScaffoldContainer from '../ScaffoldContainer';
import SupportServices from './SupportServices';
import UserProfileCard from './UserProfileCard';
import EditDialog, { ADD, UPDATE } from './EditDialog/EditDialog';

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
  card: {
    padding: theme.spacing(1),
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

const INITIAL_DIALOG_STATE = { mode: ADD, name: null };
function Profile({ profileData }) {
  const classes = useStyles();
  const { user, userDocRef } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [values, setValues] = useState({ goal: profileData.goal });
  const [dialogConfig, setDialogConfig] = useState(INITIAL_DIALOG_STATE);
  const [showSupportServices, setShowSupportServices] = useState(false);

  const handleSave = () => {
    setEditMode(false);
    const data = {
      goal: values.goal,
      lastUpdateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    userDocRef.set({ userProfile: data }, { merge: true });
  };

  useEffect(() => {
    setValues({ goal: profileData.goal });
  }, [profileData, profileData.goal]);

  const handleOpenAddDialog = itemType => {
    setDialogConfig(config => ({
      ...config,
      name: itemType,
      mode: ADD,
      items: profileData[itemType],
      itemIndex: null,
    }));
    setShowDialog(true);
  };

  const handleOpenEditDialog = (itemIndex, itemType) => {
    setDialogConfig({
      name: itemType,
      mode: UPDATE,
      items: profileData[itemType],
      itemIndex,
    });
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setDialogConfig(INITIAL_DIALOG_STATE);
  };

  return (
    <div className={classes.root}>
      <EditDialog
        {...dialogConfig}
        show={showDialog}
        onClose={closeDialog}
        onExited={closeDialog}
      />
      <SupportServices
        items={profileData.supportServices}
        show={showSupportServices}
        onClose={() => setShowSupportServices(false)}
      />
      {!editMode && <Goal goal={values.goal} />}
      <ScaffoldContainer>
        <Box className={classes.grid} mb={10}>
          <Box className={classes.gridC}>
            {editMode && (
              <Box mb={3}>
                <GoalEditCard
                  value={values.goal}
                  onChange={value => setValues(prevValues => ({ ...prevValues, goal: value }))}
                />
              </Box>
            )}
            {PROFILE_ITEMS.map(item => (
              <Box mb={3} key={item.value}>
                <ProfileItemCard
                  title={item.title}
                  items={profileData[item.value]}
                  type={item.value}
                  editMode={editMode}
                  handleEdit={index => handleOpenEditDialog(index, item.value)}
                  handleAdd={() => handleOpenAddDialog(item.value)}
                />
              </Box>
            ))}
          </Box>
          <Box className={classes.gridL} position="relative">
            <UserProfileCard
              user={user}
              phoneNumber={profileData.phone}
              editMode={editMode}
              onButtonClick={() => (editMode ? handleSave() : setEditMode(true))}
            />
          </Box>
          <Box className={classes.gridR}>
            <Card variant="outlined" className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Support Services
                </Typography>
                <Typography variant="body2" gutterBottom>
                  NJ residents may be eligible for a variety of support services. Select the Support
                  Services you are interested in getting more information about.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => setShowSupportServices(true)}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </ScaffoldContainer>
    </div>
  );
}

Profile.propTypes = {
  profileData: PropTypes.shape({
    goal: PropTypes.string,
    phone: PropTypes.string,
    educationItems: PropTypes.arrayOf(
      PropTypes.shape({
        school: PropTypes.string,
        'study-field': PropTypes.string,
        'education-start-year': PropTypes.string,
        'education-end-year': PropTypes.string,
      })
    ),
    employmentItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        org: PropTypes.string,
        start: PropTypes.string,
        end: PropTypes.string,
      })
    ),
    supportServices: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string,
        value: PropTypes.bool,
        label: PropTypes.string,
        helperText: PropTypes.string,
      })
    ),
  }),
};

Profile.defaultProps = {
  profileData: {
    goal: '',
    phone: '',
    educationItems: [],
    employmentItems: [],
    supportServices: [],
  },
};

export default Profile;
