//default config object
var config = {
    dev:'development',
    BI_API_BASE_URL:'',
    port: process.env.PORT || 3000,
    BASE_URL:process.env.REACT_APP_URL || "https://assafushy.visualstudio.com",
    AccessToken:process.env.REACT_APP_APIKEY || "7ne3n2b4uzgux46bkjvofdz7lsz2kbb4nm34ai45jiztdichxeta"
}

config.BI_API_BASE_URL =  (process.env.DOCKER)? 'http://backend:10010': 'http://localhost:10010';

console.log(`process.env.BASE_URL: ${process.env.REACT_APP_URL}`);
console.log(`process.env.AccessToken: ${process.env.REACT_APP_APIKEY}`);
console.log(`BI-API base url: ${config.BI_API_BASE_URL}`);


module.exports =config;