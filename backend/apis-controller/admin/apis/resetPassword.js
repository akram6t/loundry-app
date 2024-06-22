const jwt = require('jsonwebtoken');
const { hashPassword } = require('../../../utils/password');
const { Collections } = require('../../../Constaints');
const { MongoClient } = require('mongodb');

const DB_URL = process.env.DB_URL;

function resetPassword(req, res) {
     const { token, newPassword } = req.body;
     if (!token || !newPassword) {
          return res.status(503).json({ status: false, message: 'Invalid password' });
     }

     jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
          if (err) {
               console.log(err);
               return res.status(503).json({ status: false, message: 'Token has expired.' });
          } else {
               const hashedPass = await hashPassword(newPassword);
               const { email } = decoded;
               const client = new MongoClient(DB_URL);
               const db = client.db();
               const admin = db.collection(Collections.ADMIN);

               await admin.updateOne(
                    { email: email },
                    { $set: { password: hashedPass } }
               )

               return res.status(200).json({ status: true, message: 'Password updated now.' });

          }
     });

}

module.exports = resetPassword;