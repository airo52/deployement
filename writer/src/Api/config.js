import axios from 'axios';
import Urls from './urls';

const Url =Urls.apiFullPath; //'http://localhost:4000/peakwriter/api/c2/writer/';

//const Url ='http://ogada.softonica.buzz/peakwriter/api/c2/writer/'

const AUTH_TOKEN ='Bearer eyJhbGciOiJIUzI1NiJ9.TmV3c0JhbmtBZG1pblBhbmVs.9Bc5SJei_sd1BiSXVhWHc4HzdGzlKURD00KZVDP7utc';

const Axios = axios.create({
    baseURL:Url,
})

Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


export default Axios;