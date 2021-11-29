
const nodemailer = require('nodemailer');
const { mailConfig } = require('../../config/config');
const { sendEmails } = require('./MailApi');

const mailOptions ={
    from:"peakwriters.com-no-reply",
    to:"",
    subject:"",
    text:"",
    html:"",
}
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service:"gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user:mailConfig.user, // generated ethereal user
      pass:mailConfig.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  
  async function sendMail(body,userEmail,subject,text){
       /*   mailOptions.to=userEmail;
          mailOptions.subject=subject,
          mailOptions.text=text;
          mailOptions.html=body;
        
        transporter.sendMail(mailOptions,(err,info)=>{
              if(err){
                  console.log(err);
                  return false;
              }
              else{ 
                  //console.log(info)
                return true};
        });*/
        
        var bodY =`<div>${body}</div>`;

     await sendEmails(userEmail,bodY,subject);

       return true;

          //return {success:true,message:info.messageId};
  }
  

module.exports = {sendMail}