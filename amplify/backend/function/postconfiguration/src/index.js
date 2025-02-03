var aws = require('aws-sdk');
var ddb = new aws.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let DBItem = {
    id: event.request.userAttributes.sub,
    email: event.request.userAttributes.email,
    name: 'Jawad',
    description: 'This is a dummy user'
  };
  try {
    await ddb
      .put({
        TableName: 'Usershopjawad-4qnwpzptcravzi4zmvo2loqlte-dev',
        Item: DBItem
      })
      .promise();
    console.log('Success');
  } catch (err) {
    console.log('Error', err);
  }
  console.log('Success: Everything executed correctly');
  context.done(null, event);
};
