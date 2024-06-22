const bcrypt = require('bcryptjs');

async function hashPassword(plainPassword) {
     try {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(plainPassword, salt);
          return hash;
     } catch (err) {
          throw err;
     }
}

async function matchPassword(plainPassword, hashedPassword) {
     try {
          const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
          if(isMatch){
               return true;
          }

          return false;
     } catch (err) {
          throw err;
     }

}

module.exports = {
     hashPassword,
     matchPassword
}