const { MongoClient, ObjectId } = require('mongodb');
const  { Collections, Messages } = require('../../../Constaints');
const { ApiAuthentication } = require('../../../utils/ApiAuthentication');
const { matchPassword } = require('../../../utils/password');

const DB_URL = process.env.DB_URL;

const adminLogin = async (req, res) => {
    if(!ApiAuthentication(req, res)){
        return res.json({ status: false, message: Messages.wrongApi});
    }
    const  { login, password, authToken }  = req.body;
    
    let client;
    
    try{

    client = new MongoClient(DB_URL);
        
    const collection = client.db().collection(Collections.ADMIN);

    const [admin] = await collection.find().toArray();

    const passwordCondition = await matchPassword(password, admin?.password);

    if((admin?.email === login || admin?.username === login) && passwordCondition){
         await collection.updateOne({_id: new ObjectId(admin?._id)},{ $set: { authToken: authToken } })
        return res.send({
            status: true,
            message: 'login'
        })

    }else{
        return res.send({
            status: false,
            message: 'Login and Password is Wrong?'
        })
    }

}catch(err){
    console.log(err);
    res.send({
        status: false,
        message: err
    })
}finally{
    client.close();
}

}

module.exports = adminLogin;