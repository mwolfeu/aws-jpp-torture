const Schema = require('../schema.js')

let schema = new Schema();

let data = { first_name: 'm', last_name: 'w', born: '2016-02-06', gender: 'male', reason: ["information", "recovery"], incidents: [{ during: "arrest", torture_type: ["cultural_humiliation", "sexual_violence"], perpetrators: [{ rank: "constable", posting: "there" }] }] };
console.log(schema.encode(data))