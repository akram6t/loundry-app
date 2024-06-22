const url = process.env.DB_URL;
const { MongoClient } = require('mongodb');
const { Collections, Messages } = require('./../../../Constaints');
const { ApiAuthentication } = require('../../../utils/ApiAuthentication');

async function incomeChart(req, res) {
     const year = parseInt(req.params.year);
     // if(!ApiAuthentication(req, res)){
     // return res.json({ status: false, message: Messages.wrongApi});
     // }
     try {
          const client = new MongoClient(url); // Replace with your MongoDB connection URI
          await client.connect();

          const db = client.db(); // Replace with your database name

          const ordersCollection = db.collection(Collections.ORDERS);

          const data = await ordersCollection.aggregate([
               {
                    $match: {
                      order_date: {
                        $gte: `${year}-01-01T00:00:00.000Z`,
                        $lt: `${year}-12-31T00:00:00.000Z`
                      }
                    }
                  },
                  {
                    $group: {
                      _id: {
                        year: { $year: { $toDate: "$order_date" } },
                        month: { $month: { $toDate: "$order_date" } }
                      },
                      totalAmount: { $sum: "$amount" },
                      serviceFee: { $sum: "$service_fee" },
                      addonPrice: { $sum: { $sum: "$addons.price" } }
                    }
                  },
                  {
                    $project: {
                      _id: 0,
                      year: "$_id.year",
                      month: "$_id.month",
                      total: {
                        totalAmount: "$totalAmount",
                        serviceFee: "$serviceFee",
                        addonPrice: "$addonPrice"
                      }
                    }
                  }

          ]).toArray();

          data.sort(function(a,b){
               return new Date(a.year, a.month) - new Date(b.year, b.month);
          })

          // console.log(counts);
          res.json({
               message: 'orders income get',
               status: true,
               data: data
          });

     } catch (error) {
          console.error(error);
          res.json({
               message: 'orders income occur error',
               status: false
          });
     } finally {
     }
}

module.exports = incomeChart;