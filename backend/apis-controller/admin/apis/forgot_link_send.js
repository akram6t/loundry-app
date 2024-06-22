const { MongoClient, ObjectId } = require('mongodb');
const { Collections, Messages } = require('../../../Constaints');
const { ApiAuthentication } = require("../../../utils/ApiAuthentication");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hideEmail } = require("../../../utils/hide_email");
const { emailTransporter, forgotHtmlContent } = require("../../../utils/emailTransporter");

const DB_URL = process.env.DB_URL;
const DOMAIN = process.env.RESEND_EMAIL_DOMAIN;

const forgotLinkSend = async (req, res) => {
     if (!ApiAuthentication(req, res)) {
          return res.json({ status: false, message: Messages.wrongApi });
     }
     const serverOrigin = `${req.protocol}://${req.get('host')}`;

     const client = new MongoClient(DB_URL);
     const db = client.db();
     const col_store = db.collection(Collections.SHOPS);
     const col_admin = db.collection(Collections.ADMIN);

     const [store] = await col_store.find().project({ name: 1 }).toArray();
     const [admin] = await col_admin.find().toArray();

     const resetToken = jwt.sign({ email: admin?.email }, process.env.JWT_SECRET, { expiresIn: '10m' });

     const resetLink = `${serverOrigin}/auth/reset_password?token=${resetToken}`;

     const mailOptions = {
          from: `"${store?.name}" <${process.env.NODEMAILER_EMAIL}>`,
          to: admin?.email,
          subject: `${store?.name} - Reset Your Password`,
          html: forgotHtmlContent({ companyName: store?.name, resetLink: resetLink })
     };

     await emailTransporter.sendMail(mailOptions);

     //     const result = await col_admin.updateOne({ _id: new ObjectId(admin[0]?._id)}, { $set: { tempPassword: genratedPassword } });

     //     if(result.modifiedCount > 0){
     return res.status(200).json({
          status: true,
          message: 'Successfully sended link in your registered email account - ' + hideEmail(admin?.email)
     });

}

module.exports = forgotLinkSend;