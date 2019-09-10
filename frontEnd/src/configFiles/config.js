//default config object
var config = {
  dev: "development",
  BI_API_BASE_URL: "",
  port: process.env.PORT || 3000,
  BASE_URL: process.env.REACT_APP_URL || "https://assafushy.visualstudio.com",
  AccessToken:
    process.env.REACT_APP_APIKEY ||
    "757dizpspynp2v3562h2odlgz6qlb6ieguxgvswav5y4aeodkvnq"
};

config.BI_API_BASE_URL = process.env.DOCKER
  ? "http://backend:10010"
  : "http://localhost:10010";

console.log(`process.env.BASE_URL: ${process.env.REACT_APP_URL}`);
console.log(`process.env.AccessToken: ${process.env.REACT_APP_APIKEY}`);
console.log(`BI-API base url: ${config.BI_API_BASE_URL}`);

module.exports = config;
