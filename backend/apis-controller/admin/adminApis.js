const express = require('express');
const countOrdersByStatus = require('./apis/count_status');
const bodyParser = require('body-parser');
const addIcons = require('./apis/addIcons');
const deleteDocument = require('./apis/deleteDocument');
const postDirectData = require('./apis/postData');
const getDirectData = require('./apis/getData');
const postNotification = require('./apis/postNotifications');
const incomeChart = require('./apis/income_chart');
const router = express();
const adminNotificationCount = require('./apis/notifications_count');
const checkIfLogin = require('./apis/checkIfLogin');
const adminLogin = require('./apis/adminLogin');
const forgotLinkSend = require('./apis/forgot_link_send');
const resetPassword = require('./apis/resetPassword');

router.use(bodyParser.json())

router.get('/orders_status_count', (req, res) => countOrdersByStatus(req, res));

router.get('/notification_count', (req, res) => adminNotificationCount(req, res));

router.get('/income_chart/:year', (req, res) => incomeChart(req, res));

router.get('/get_list', (req, res) => getDirectData(req, res));

router.post('/post_data', (req, res) => postDirectData(req, res));

router.post('/post_notification', (req, res) => postNotification(req, res));

router.post('/delete_document', (req, res) => deleteDocument(req, res));

router.post('/add_media', (req, res) => addIcons(req, res));

router.get('/forgot_password', (req, res) => forgotLinkSend(req, res));

router.post('/reset_password', (req, res) => resetPassword(req, res));

router.post('/check_login',  (req, res) => checkIfLogin(req, res));
router.post('/admin_login',  (req, res) => adminLogin(req, res));


module.exports = router;