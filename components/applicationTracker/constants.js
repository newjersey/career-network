export const SUBMITTED = 'submitted';
export const PHONE_SCREEN = 'phone-screen';
export const INTERVIEW = 'interview';
export const OFFER_RECEIVED = 'offer-received';
export const IN_NEGOTIATION = 'in-negotiation';
export const OFFER_ACCEPTED = 'offer-accepted';
export const OFFER_REJECTED = 'offer-rejected';

export const STATUS_LABEL = {
  [SUBMITTED]: 'Application Submitted',
  [PHONE_SCREEN]: 'Phone Screen',
  [INTERVIEW]: 'Interviews',
  [OFFER_RECEIVED]: 'Offer Received',
  [OFFER_ACCEPTED]: 'Offer Accepted',
  [OFFER_REJECTED]: 'Offer Rejected',
  [IN_NEGOTIATION]: 'In Negotiation',
};

export const STATUS_COLOR = {
  [SUBMITTED]: '#e46a06',
  [PHONE_SCREEN]: '#9f90ff',
  [INTERVIEW]: '#259fe7',
  [OFFER_RECEIVED]: '#e46a06',
  [OFFER_ACCEPTED]: '#6bce7a',
  [OFFER_REJECTED]: '#f96861',
  [IN_NEGOTIATION]: '#244cd2',
};

export const APPLICATION_STATUS_TYPES = [
  SUBMITTED,
  PHONE_SCREEN,
  INTERVIEW,
  OFFER_RECEIVED,
  IN_NEGOTIATION,
  OFFER_ACCEPTED,
  OFFER_REJECTED,
];

export default {
  APPLICATION_STATUS_TYPES,
  STATUS_LABEL,
  STATUS_COLOR,
  ...APPLICATION_STATUS_TYPES,
};
