const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'Productshopcojawad-4qnwpzptcravzi4zmvo2loqlte-dev';

exports.handler = async () => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Select: 'COUNT'
    };

    const result = await dynamoDB.scan(params).promise();

    return {
      totalProducts: result.Count ?? 0
    };
  } catch (error) {
    console.error('Error fetching product count:', error);
    return {
      totalProducts: 0
    };
  }
};
