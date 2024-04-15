const { MongoClient } = require('mongodb');
const { Collections } = require('../../Constaints');


const DB_URL = process.env.DB_URL;

const sendNotificationToServer = async (data) => {

    const client = new MongoClient(DB_URL);
    await client.connect();
    console.log('save and send notification to the admin...')
    const db = client.db();
    const collection = db.collection(Collections.ADMIN_NOTIFICATIONS);
    const insertData = { ...data, status: 'unread', date: new Date().toISOString() }
    const result = await collection.insertOne(insertData);
    if (result.insertedId) {
        sendNotification(data);
        // res.json({
        //     status: true,
        //     message: 'admin notification added',
        // });
    } else {
        // res.json({
        //     status: false,
        //     message: 'error',
        // });
    }

    client.close();
}


// send notification to the server
async function sendNotification(data) {
}



module.exports = sendNotificationToServer;