// export default {
//     s3: {
//       REGION: "us-east-2",
//       BUCKET: "notes-application123-upload"
//     },
//     apiGateway: {
//       REGION: "us-east-2",
//       URL: "https://kja8ubq1o0.execute-api.us-east-2.amazonaws.com/prod",
//       URL1: "https://hc8kdltgni.execute-api.us-east-2.amazonaws.com/prod",
//     },
//     cognito: {
//       REGION: "us-east-2",
//       USER_POOL_ID: "us-east-2_P1Mygbt1g",
//       APP_CLIENT_ID: "7q11vjpapr1f28ph7vtuabs2pb",
//       // IDENTITY_POOL_ID: "us-east-2:faa9ac37-ec16-41c8-a0aa-b9c1c35ccf85"
//     },
//     MAX_ATTACHMENT_SIZE: 5000000,
//     STRIPE_KEY: "",
//   };
export default {
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'notes-application123-upload'
  },
  apiGateway: {
    REGION: 'us-east-2',
    URL_VENUES: 'https://fwrh2odj8k.execute-api.us-east-2.amazonaws.com/prod',
    URL_MISSION: 'https://p72f434iu0.execute-api.us-east-2.amazonaws.com/prod',
    URL_CHALLENGES: 'https://vsmpqc9bth.execute-api.us-east-2.amazonaws.com/prod',
    URL_TERMS: 'https://twqhgbxb7g.execute-api.us-east-2.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_aoes9WwPe',
    APP_CLIENT_ID: '6ap0tc9393k5ob3jshh87ca6ec',
    IDENTITY_POOL_ID: 'us-east-2:475a56ea-0827-458f-9aaa-7acf3c02e022'
  },
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: ''
};
