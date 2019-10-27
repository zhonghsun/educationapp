export default {
    s3: {
      REGION: "us-east-2",
      BUCKET: "notes-application123-upload"
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "https://kja8ubq1o0.execute-api.us-east-2.amazonaws.com/prod",
      URL1: "https://hc8kdltgni.execute-api.us-east-2.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_JfQNOsAY0",
      APP_CLIENT_ID: "2khr05qum6n1d6esbah5qkvn54",
      IDENTITY_POOL_ID: "us-east-2:faa9ac37-ec16-41c8-a0aa-b9c1c35ccf85"
    },
    MAX_ATTACHMENT_SIZE: 5000000,
    STRIPE_KEY: "",
  };