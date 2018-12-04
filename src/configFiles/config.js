var _ = require('lodash');

//default config object
var config = {
    dev:'development',
    port: process.env.PORT || 3000,
    BASE_URL:process.env.REACT_APP_URL || "https://assafushy.visualstudio.com",
    AccessToken:process.env.REACT_APP_APIKEY || "7ne3n2b4uzgux46bkjvofdz7lsz2kbb4nm34ai45jiztdichxeta"
}

console.log(`process.env.BASE_URL: ${process.env.REACT_APP_URL}`);
console.log(`process.env.AccessToken: ${process.env.REACT_APP_APIKEY}`);


module.exports =config;