import React from 'react';
import PropTypes from 'prop-types';
import FileCopy from '@material-ui/icons/FileCopy';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';
import GroupAdd from '@material-ui/icons/GroupAdd';
import {
  RESUME,
  PERSONAL_VALUES,
  INTERVIEWING_SKILLS,
  PROFESSIONAL_NETWORK,
} from '../../constants';
import ActivityTemplatePropTypes from './PropTypes';

const MilestoneIcon = ({ type, color, className }) => {
  const milestoneIcons = {
    [INTERVIEWING_SKILLS]: <PhoneInTalk style={{ color }} className={className} />,
    [RESUME]: <FileCopy style={{ color }} className={className} />,
    [PERSONAL_VALUES]: <FileCopy style={{ color }} className={className} />,
    [PROFESSIONAL_NETWORK]: <GroupAdd style={{ color }} className={className} />,
  };
  return milestoneIcons[type] || null;
};

MilestoneIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  type: ActivityTemplatePropTypes.milestoneSlug.isRequired,
};

MilestoneIcon.defaultProps = {
  className: '',
};

export default MilestoneIcon;
