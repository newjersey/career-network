import React from 'react';
import PropTypes from 'prop-types';
import FileCopy from '@material-ui/icons/FileCopy';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';
import GroupAdd from '@material-ui/icons/GroupAdd';
import FindInPage from '@material-ui/icons/FindInPage';
import Report from '@material-ui/icons/Report';
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import HotTub from '@material-ui/icons/HotTub';
import Highlight from '@material-ui/icons/Highlight';
import Class from '@material-ui/icons/Class';
import {
  RESUME,
  PERSONAL_VALUES,
  INTERVIEWING_SKILLS,
  PROFESSIONAL_NETWORK,
  RESEARCH_SKILLS,
  COVER_LETTER,
  LIST_STRENGTHS,
  STRESS_MANAGEMENT_PRACTICES,
  LIST_WANTS_MUST_HAVES,
  SELF_CARE_PLAN,
  SOCIAL_NETWORK,
  REFERENCES,
} from '../../constants';
import ActivityTemplatePropTypes from './PropTypes';

const MilestoneIcon = ({ type, color, className }) => {
  const milestoneIcons = {
    [INTERVIEWING_SKILLS]: <PhoneInTalk style={{ color }} className={className} />,
    [RESUME]: <FileCopy style={{ color }} className={className} />,
    [PERSONAL_VALUES]: <FileCopy style={{ color }} className={className} />,
    [REFERENCES]: <FileCopy style={{ color }} className={className} />,
    [PROFESSIONAL_NETWORK]: <GroupAdd style={{ color }} className={className} />,
    [SOCIAL_NETWORK]: <GroupAdd style={{ color }} className={className} />,
    [RESEARCH_SKILLS]: <FindInPage style={{ color }} className={className} />,
    [COVER_LETTER]: <Class style={{ color }} className={className} />,
    [LIST_STRENGTHS]: <FitnessCenter style={{ color }} className={className} />,
    [STRESS_MANAGEMENT_PRACTICES]: <HotTub style={{ color }} className={className} />,
    [LIST_WANTS_MUST_HAVES]: <Report style={{ color }} className={className} />,
    [SELF_CARE_PLAN]: <Highlight style={{ color }} className={className} />,
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
