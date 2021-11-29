const { urls } = require("../../../config/config");
const data = new URLSearchParams();

//const response = await axios.post(url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
class FilesManager{
    constructor(){
         this.axios = require("axios");
    }

    

    async writerProfile(files){
         data.append('files',files);
         const result = await this.axios.post(urls.profileApiUrl,data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
         console.log(result.data);
    }
}

module.exports ={
    FilesManager
}