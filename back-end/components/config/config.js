const origins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://10.0.0.8:3000',
    'http://10.0.0.6:3001',
    'http://localhost:3000/#/task/assign'
 ];
 
 const dateGenerator={
       date:()=>{
           return new Date().toISOString().slice(0,10);
       },
 
       dayDifrence:(Date1,Date2)=>{
         var date1 = new Date(Date1);
         var date2 = new Date(Date2);
           
         // To calculate the time difference of two dates
         var Difference_In_Time = date2.getTime() - date1.getTime();
           
         // To calculate the no. of days between two dates
         var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
 
         return Difference_In_Days;
           
       },
       addDaysFromPointX:(date,days)=>{
         var someDate = new Date(date);
         ///var numberOfDaysToAdd = 6;
       //  someDate.setDate(someDate.getDate() + days); 
        // return someDate.toISOString().slice(0,10);
 
         var newdate= new Date(someDate.getTime() + days*24*60*60*1000);
 
         return newdate.toISOString().slice(0,10);
       },
       addDaysToDate:(days)=>{
         var someDate = new Date();
         ///var numberOfDaysToAdd = 6;
       //  someDate.setDate(someDate.getDate() + days); 
        // return someDate.toISOString().slice(0,10);
 
         var newdate= new Date(someDate.getTime() + days*24*60*60*1000);
 
         return newdate.toISOString().slice(0,10);
 
 
       },
       getFromProvidedDate:(date)=>{
         return new Date(date).toISOString().slice(0,10);
       }
 }
 
 //database configaration
 const databaseConfig = {
     host:"localhost",
     user:'root',
     password:'Dmosh$$123',
     database:'writer',
     dateStrings: true 
 }
 
 const Tokens ={
     Auth_Token_Secret:'ec6dc0d0fd9e8e74410062422aaa5672bec9cce33348520484a187c7c97efc0aeb18e320c7565dcc2bf8f87e33e819c7ff303e6802f29e9fdd668a11a3fdc44b',
     Refresh_token_secret:"fce6b66f28c71827a3e9ed7429446d428d7974bfdb59ea25b6a67f484f4c19b18fe7beb20b27945876b96f0e4574dd06676d7ae297e619eeefcba57497dd71a2"
 }
 
 const mailConfig={
    host:"mail.peak-writers.com",
    port:"465",
    user:"writers@peak-writers.com",
    pass:"s=2#)1*ZM=8h"
 
    /* host:"",
     port:"465",
     user:"airotony8@gmail.com",
     pass:"Dmosh$$123"*/
 }
 const environment={
      FilePath:"./public/files/",
      UrlProfile:'./public/profiles/',
     baseUrlAdmin:"/peakwriter/api/c1/admin/",
     baseUrlWriter:"/peakwriter/api/c2/writer/",
     FileLoadUrl:'http://localhost/~tony/Download/index.php',
     
     
 }
 const urls={
     adminUrl:"http://localhost:3000/#/auth/activate?",
     writerUrl:"http://localhost:3001/#/auth/activate?",
     confirmationUrls:'http://localhost:3001/#/confirm?Key=',
     logo:'https://images.unsplash.com/photo-1545231027-637d2f6210f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
     SystemUrl:'http://localhost:3000',
     MailerUrl:'https://mailer.peak-writers.com/index.php?',
     profileApiUrl:'http://localhost/~tony/Download/upload.php'
 }
 module.exports = {
  origins,
  databaseConfig,
  Tokens,
  mailConfig,
  environment,
  dateGenerator,
  urls
 }