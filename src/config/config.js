"use strict";
const path = require("path");
const _ = require("lodash");

let env = process.env.NODE_ENV || "development";

let base = {
  app: {
    root: path.normalize(path.join(__dirname, "/..")),
    env: env,
  },
};

let specific = {
    development: {
        app: {
            port: process.env.PORT || 5000,
            name: "fujin8-Dev",
            excluded : "excluded_path"
        },
        mysql: {
            host: 'localhost',
            port : 3306,
            user : 'root',
            password : 'root',
            database : 'fujin8-dev',
            pool:{
              max:5,
              min:0,
              idle: 10000
            }
        }
    }, 
    production: {
        app: {
            port: process.env.PORT || 5000,
            name: "fujin8-prod",
            excluded : "excluded_path"
        },
        mysql: {
            host: 'localhost',
            port : 3306,
            user : 'test',
            password : 'test',
            database : 'test',
            pool:{
              max:25,
              min:5,
              idle: 10000
            }
        }
    },
};

let config = _.merge(base, specific[env])
module.exports = config;