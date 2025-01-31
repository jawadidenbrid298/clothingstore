const AWS = require('aws-sdk');
const {DynamoDB} = AWS;

const dynamodb = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const tableName = process.env.REVIEW_TABLE_NAME || 'Reviewshop-vdikeo5lhffhhfov5vv53exwhy-dev';

  try {
    const params = {
      TableName: tableName
    };
    const result = await dynamodb.scan(params).promise();

    if (!result.Items || result.Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify([])
      };
    }

    const productRatings = {};
    result.Items.forEach((review) => {
      if (!productRatings[review.productID]) {
        productRatings[review.productID] = {totalRating: 0, count: 0};
      }
      productRatings[review.productID].totalRating += review.rating;
      productRatings[review.productID].count += 1;
    });

    const productAverageRatings = Object.entries(productRatings).map(([productID, {totalRating, count}]) => ({
      productID,
      averageRating: totalRating / count
    }));

    productAverageRatings.sort((a, b) => b.averageRating - a.averageRating);

    const top4Products = productAverageRatings.slice(0, 4);

    return top4Products;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Error fetching reviews', error: error.message})
    };
  }
};
