module.exports = {
  apps: [
    {
      name: "serverkino-admin",
      script: "npm",
      args: "run start",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        PORT: 4000
      },
    },
  ],
};
