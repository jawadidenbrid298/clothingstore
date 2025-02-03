const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'Productshopcojawad-4qnwpzptcravzi4zmvo2loqlte-dev'; // Ensure this is set in environment variables

exports.handler = async (event) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Select: 'COUNT' // Fetch only the count
    };

    const result = await dynamoDB.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({totalProducts: result.Count})
    };
  } catch (error) {
    console.error('Error fetching product count:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({error: 'Internal Server Error'})
    };
  }
};
