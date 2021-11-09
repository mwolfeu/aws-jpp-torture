'use strict';
const AWS = require('aws-sdk')
const Schema = require('js/schema.js')
const Filter = require('js/filter.js')

let allowedHosts = ["http://localhost:3000", "http://localhost:5500", "https://mwolfeu.github.io"];
let schema = new Schema();
let filter = new Filter();

module.exports = {

  hello: async(event) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
          message: 'Go Serverless v2.0! Your function executed successfully!',
          input: event,
        },
        null,
        2
      ),
    };
  },

  byRegion: async(event) => {

    let acao = "";
    if (allowedHosts.includes(event.headers.origin)) {
      acao = event.headers.origin; // testing
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": acao,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(filter.regionAggregates()),
      // body: JSON.stringify({ hi: 1 }),
    };
  },

  create: async(event, context) => {
    let tableName = process.env.DYNAMODB_SURVEY_TABLE;
    if (event.path == "/v1/incident")
      tableName = process.env.DYNAMODB_INCIDENT_TABLE;

    let bodyObj = {}
    try {
      bodyObj = JSON.parse(event.body)
    } catch (jsonError) {
      console.log('There was an error parsing the body', jsonError)
      return {
        statusCode: 460
      }
    }

    if (!bodyObj.lang) {
      console.log('Language not set');
      return { statusCode: 461 }
    }

    if (!(['en', 'ur'].includes(bodyObj.lang))) {
      console.log('Language incorrect: ', bodyObj.lang);
      return { statusCode: 462 }
    }
    let lang = bodyObj.lang;

    let rv = schema.encode(bodyObj.data, lang);
    let putParams;
    if (rv.valid) {
      putParams = {
        TableName: tableName,
        Item: {
          ...bodyObj.data,
          requestId: String(Date.now()),
        }
      }
    } else
      return {
        statusCode: 400, // failed schema validation
        body: JSON.stringify(rv)
      }

    let putResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      putResult = await dynamodb.put(putParams).promise()
    } catch (error) {
      console.log('Error: lambda create')
      console.log('putParams', putParams)
      return {
        statusCode: 500,
        // body: JSON.stringify([event, context, putParams, error])
      }
    }

    return {
      statusCode: 201,
      //body: JSON.stringify([event, context])
    }
  },

  list: async(event, context) => {
    let scanParams = {
      TableName: process.env.DYNAMODB_INCIDENT_TABLE
    }
    let scanResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      scanResult = await dynamodb.scan(scanParams).promise()
    } catch (scanError) {
      console.log('Error: lambda scan')
      console.log('scanError', scanError)
      return {
        statusCode: 500
      }
    }

    if (scanResult.Items == null ||
      !Array.isArray(scanResult.Items) ||
      scanResult.Items.length == 0) {
      return {
        statusCode: 404
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(scanResult)
    }
  },

  get: async(event, context) => {
    let getParams = {
      TableName: process.env.DYNAMODB_INCIDENT_TABLE,
      Key: {
        name: event.pathParameters.name
      }
    }
    let getResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      getResult = await dynamodb.get(getParams).promise()
    } catch (getError) {
      console.log('Error: lambda get')
      console.log('getError', getError)
      return {
        statusCode: 500
      }
    }

    if (getResult.Item == null) {
      return {
        statusCode: 404
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(getResult)
    }
  },

  update: async(event, context) => {
    let bodyObj = {}
    try {
      bodyObj = JSON.parse(event.body)
    } catch (jsonError) {
      console.log('There was an error parsing the body', jsonError)
      return {
        statusCode: 460
      }
    }

    if (typeof bodyObj.age == 'undefined') {
      console.log('Missing parameters')
      return {
        statusCode: 400
      }
    }

    let updateParams = {
      TableName: process.env.DYNAMODB_INCIDENT_TABLE,
      Key: {
        name: event.pathParameters.name
      },
      UpdateExpression: 'set #age = :age',
      ExpressionAttributeNames: {
        '#age': 'age'
      },
      ExpressionAttributeValues: {
        ':age': bodyObj.age
      }
    }

    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      await dynamodb.update(updateParams).promise()
    } catch (updateError) {
      console.log('Error: lambda update')
      console.log('updateError', updateError)
      return {
        statusCode: 500
      }
    }

    return {
      statusCode: 200
    }
  },

  delete: async(event, context) => {
    let deleteParams = {
      TableName: process.env.DYNAMODB_INCIDENT_TABLE,
      Key: {
        name: event.pathParameters.name
      }
    }

    let deleteResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      deleteResult = await dynamodb.delete(deleteParams).promise()
    } catch (deleteError) {
      console.log('Error: lambda delete')
      console.log('deleteError', deleteError)
      return { statusCode: 500 }
    }

    return { statusCode: 200 }
  }
}