const envConfigs = {
  PRODUCTION: [
    {
      name: 'userProfile',
      isActive: true,
    },
    {
      name: 'applicationTracker',
      isActive: false,
    },
    {
      name: 'profileSupportServices',
      isActive: false,
    },
    {
      name: 'sentimentTracker',
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
      isActive: false,
    },
    {
      name: 'profileSupportServices',
      isActive: false,
    },
    {
      name: 'sentimentTracker',
      isActive: false,
    },
  ],
};

const featureFlags =
  process.env.name === 'PRODUCTION' ? envConfigs[process.env.name] : envConfigs.PREVIEW;

export default featureFlags;
