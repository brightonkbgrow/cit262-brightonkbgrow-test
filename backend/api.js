const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ region: 'us-east-1' });

let dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });


exports.events = async function (req, res) {
  const params = {
    TableName: 'EventsTable'
  };

  try {
    const data = await dynamodb.scan(params).promise();
    res.json(data.Items);
  } catch (err) {
    console.error('Error fetching events from DynamoDB', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.event = async function (req, res) {
  const params = {
    TableName: 'EventsTable',
    Key: {
      id: req.params.eventId
    }
  };

  try {
    const data = await dynamodb.get(params).promise();
    if (data.Item) {
      res.json(data.Item);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    console.error('Error fetching event from DynamoDB', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.addEvent = async function (req, res) {
  const event = {
    id: uuidv4(),
    title: req.body.title,
    detail: req.body.detail,
    date: req.body.date,
 
  };

  const params = {
    TableName: 'EventsTable',
    Item: event
  };

  try {
    await dynamodb.put(params).promise();
    res.status(201).json({ message: 'Event saved to DynamoDB', event });
  } catch (err) {
    console.error('Error saving event to DynamoDB', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteEvent = async function (req, res) {
  const params = {
    TableName: 'EventsTable',
    Key: {
      id: req.params.eventId
    }
  };

  try {
    await dynamodb.delete(params).promise();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event from DynamoDB', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
