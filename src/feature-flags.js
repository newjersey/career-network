const envConfigs = {
  PRODUCTION: [
    {
      name: 'userProfile',
      isActive: true,
    },
    {
      name: 'applicationTracker',
      isActive: true,
    },
    {
      name: 'profileSupportServices',
      isActive: false,
    },
    {
      name: 'actionPlan',
      isActive: true,
    },
    {
      name: 'activityLog',
      isActive: true,
    },
    {
      name: 'jobSearchBasics',
      isActive: false,
    },
    {
      name: 'activityTemplate',
      isActive: false,
    },
  ],
  PREVIEW: [
    {
      name: 'userProfile',
      isActive: true,
    },
    {
      name: 'applicationTracker',
      isActive: true,
    },
    {
      name: 'profileSupportServices',
      isActive: false,
    },
    {
      name: 'actionPlan',
      isActive: true,
    },
    {
      name: 'activityLog',
      isActive: true,
    },
    {
      name: 'jobSearchBasics',
      isActive: true,
    },
    {
      name: 'activityTemplate',
      isActive: false,
    },
  ],
};

const featureFlags =
  process.env.name === 'PRODUCTION' ? envConfigs[process.env.name] : envConfigs.PREVIEW;

export default featureFlags;
