import React from 'react';
import PropTypes from 'prop-types';
import FileCopy from '@material-ui/icons/FileCopy';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';
import { RESUME, PERSONAL_VALUES, INTERVIEWING_SKILLS } from '../../constants';

const MilestoneIcon = ({ type, color, className }) => {
  const milestoneIcons = {
    [INTERVIEWING_SKILLS]: <PhoneInTalk style={{ color }} className={className} />,
    [RESUME]: <FileCopy style={{ color }} className={className} />,
    [PERSONAL_VALUES]: <FileCopy style={{ color }} className={className} />,
  };
  return milestoneIcons[type] || null;
};

MilestoneIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  type: PropTypes.oneOf([RESUME, PERSONAL_VALUES, INTERVIEWING_SKILLS]).isRequired,
};

MilestoneIcon.defaultProps = {
  className: '',
};

export default MilestoneIcon;
