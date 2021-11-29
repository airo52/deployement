const axios = require("axios");
const { urls } = require("../../config/config");

//const Url = 'https://mailer.peak-writers.com/index.php?'
const Url = urls.MailerUrl;

//const Url = Urls.apiFullPath; //'http://localhost:4000/peakwriter/api/c1/admin/';

const AUTH_TOKEN ='Bearer eyJhbGciOiJIUzI1NiJ9.TmV3c0JhbmtBZG1pblBhbmVs.9Bc5SJei_sd1BiSXVhWHc4HzdGzlKURD00KZVDP7utc';

/*const Axios = axios.create({
    baseURL:Url,
})*/

//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

//export default Axios;
const sendEmails = async(email,body,subject)=>{
    //const Endpoint = "&email="+email+"&body="+body+"&subject="+subject;

    var data ={
        email:email,
        body:body,
        subject:subject
    }

    const result = await axios.post(urls.MailerUrl,data);

    return result.data;
}

module.exports ={
    sendEmails
}