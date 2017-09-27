const config = {
  evn: 'prod',
  app: {
    port: process.env.PORT || 5000
  },
  settings: {
    connectLog: true,
    disconnectLog: true
  }
};

module.exports = config;