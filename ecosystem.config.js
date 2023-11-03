module.exports = {
  apps: [
    {
      name: 'back-refact',
      script: './dist/main.js',
      exec_mode: 'cluster',
      instances: 25,
      autorestart: true,
      watch: false,
      env: {
        Server_PORT: 3000,
        NODE_ENV: 'production',
      },
    },
  ],
};
