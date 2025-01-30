const AWS = require('aws-sdk');
const {DynamoDB} = AWS;

const dynamodb = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const tableName = process.env.REVIEW_TABLE_NAME || 'Reviewshop-vdikeo5lhffhhfov5vv53exwhy-dev';

  try {
    // Scan the reviews table
    const params = {
      TableName: tableName
    };
    const result = await dynamodb.scan(params).promise();

    if (!result.Items || result.Items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify([]) // Ensure an empty array is returned if no data
      };
    }

    // Aggregate ratings per product
    const productRatings = {};
    result.Items.forEach((review) => {
      if (!productRatings[review.productID]) {
        productRatings[review.productID] = {totalRating: 0, count: 0};
      }
      productRatings[review.productID].totalRating += review.rating;
      productRatings[review.productID].count += 1;
    });

    // Calculate average ratings for each product
    const productAverageRatings = Object.entries(productRatings).map(([productID, {totalRating, count}]) => ({
      productID,
      averageRating: totalRating / count
    }));

    // Sort products by average rating in descending order
    productAverageRatings.sort((a, b) => b.averageRating - a.averageRating);

    // Get the top 4 products
    const top4Products = productAverageRatings.slice(0, 4);

    // Return the list of product IDs only (no stringified JSON)
    return top4Products;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Error fetching reviews', error: error.message})
    };
  }
};
