require("dotenv").config();

module.exports = ({ env }) => ({
  graphql: {
    endpoint: '/graphql',
    shadowCRUD: true,
    playgroundAlways: false,
    depthLimit: 7,
    amountLimit: 100,
    apolloServer: {
      tracing: false,
    },
  },
  email: {
    provider: "sendinblue",
    providerOptions: {
      sendinblue_api_key: env("SIB_API_KEY", "xkeysib-0987654321-abcdef"),
      sendinblue_default_replyto: env(
        "SIB_DEFAULT_REPLY_TO",
        "contact@example.com"
      ),
      sendinblue_default_from: env("SIB_DEFAULT_FROM", "no-reply@example.com"),
      sendinblue_default_from_name: env("SIB_DEFAULT_FROM_NAME", "Sender Name"),
    },
  },
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_KEY"),
      api_secret: env("CLOUDINARY_SECRET"),
    },
    actionOptions: {
      upload: {},
      delete: {},
    },
  },
});
