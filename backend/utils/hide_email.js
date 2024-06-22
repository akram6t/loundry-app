function hideEmail(email) {
     // Split the email into two parts: the local part and the domain part
     let [local, domain] = email.split('@');
     
     // Check if the email format is valid
     if (!local || !domain) {
         throw new Error('Invalid email format');
     }
 
     // Hide part of the local part (excluding the first and last character)
     let hiddenLocal = local.charAt(0) + '***' + local.charAt(local.length - 1);
 
     // Combine the hidden local part with the domain part
     let hiddenEmail = hiddenLocal + '@' + domain;
 
     return hiddenEmail;
 }


 module.exports = { hideEmail };