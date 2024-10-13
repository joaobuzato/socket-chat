module.exports = {
  apps: [
    {
      name: "app",
      script: "npm",
      args: "run start",
    },
    {
      name: "consumer",
      script: "npm",
      args: "run consumer",
    },
  ],
};
