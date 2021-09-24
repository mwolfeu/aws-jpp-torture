'use strict';
const AWS = require('aws-sdk')

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

  create: async(event, context) => {
    let bodyObj = {}
    try {
      bodyObj = JSON.parse(event.body)
    } catch (jsonError) {
      console.log('There was an error parsing the body', jsonError)
      return {
        statusCode: 460
      }
    }

    if (typeof bodyObj.name == 'undefined' ||
      typeof bodyObj.age == 'undefined') {
      console.log('Missing parameters')
      return {
        statusCode: 400
      }
    }

    let putParams = {
      TableName: process.env.DYNAMODB_INCIDENT_TABLE,
      Item: {
        name: bodyObj.name,
        age: bodyObj.age,
        other: bodyObj.other
      }
    }
    let putResult = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      putResult = await dynamodb.put(putParams).promise()
    } catch {
      console.log('Error: lambda create')
      console.log('putParams', putParams)
      return {
        statusCode: 500
      }
    }

    return {
      statusCode: 201
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
      body: JSON.stringify(scanResult)
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