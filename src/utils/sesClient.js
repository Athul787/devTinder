require("dotenv").config(); // Load environment variables from .env file

// snippet-start:[ses.JavaScript.createclientv3]
const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY, // Access key from .env
    secretAccessKey: process.env.AWS_SECRET_KEY, // Secret key from .env
  },
});
module.exports = { sesClient };
// snippet-end:[ses.JavaScript.createclientv3]
