const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'Reviewshop-4qnwpzptcravzi4zmvo2loqlte-dev';

exports.handler = async (event) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      ProjectionExpression: 'id, rating'
    };

    const data = await dynamoDB.scan(params).promise();

    const sortedReviews = data.Items.filter((review) => review.rating !== undefined)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);

    return {
      sortedReviews
    };
  } catch (error) {
    console.error('Error fetching top reviews:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Error fetching reviews'})
    };
  }
};
