export const dataInit = {
  applicationId: process.env.REACT_APP_DATA_DOG_APP_ID,
  clientToken: process.env.REACT_APP_DATA_DOG_CLIENT_TOKEN,
  site: "datadoghq.com",
  service: "antitrivia",

  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sampleRate: 100,
  premiumSampleRate: 100,
  trackInteractions: true,
  defaultPrivacyLevel: "mask-user-input",
};
