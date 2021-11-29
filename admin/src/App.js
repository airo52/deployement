import React, { Component } from 'react';
import { HashRouter, Route, Switch ,useHistory} from 'react-router-dom';
import {  requestRefreshToken, veryAccessTokens} from './Api/authThenticateToken';
import io from 'socket.io-client';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Activate = React.lazy(()=>import('./views/pages/activate/activate'));
const Forgot = React.lazy(()=>import('./views/pages/activate/forgot'));
//let socket = io('http://localhost:4000', {transports: ['websocket']});
function NotFound(){
  let history = useHistory();
  return <div style={{margin:"300px auto"}} className="page-wrap d-flex flex-row align-items-center">
  <div className="container">
      <div className="row justify-content-center">
          <div className="col-md-12 text-center">
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">The page you are looking for was not found.</div>
              
              <button className="btn btn-simple" onClick={() => history.goBack()}>Go Back</button>
          </div>
      </div>
  </div>
</div>
}

class App extends Component {


  constructor(props){
    super(props);
    this.state={
         username:"",
         profile:"",
         home:false,
         email:'',
        ENDPOINT:'localhost:4000',
         
    }


  }
  

  handleProfile=(data)=>{
    
    const {username,profile,email} = data;
  
    this.setState({username:username,profile:profile,home:true,email:email});
   
 }

 route =async ()=>{
   
  //this.state.home == true?"":window.location.href="/#/auth";
    var tr= localStorage.getItem('tr');
    var ta = localStorage.getItem('ta');
     
      const check = await veryAccessTokens(ta,this.handleProfile);//authenTicateWebRefresh(ta,tr,this.handleProfile);
      
       
      
      if(check == true){
          this.setState({home:true})
      }else if( check == false){
        const checkRefresh = await requestRefreshToken(tr,this.handleProfile);
        if(checkRefresh == true){
          this.setState({home:true});
        }
      }
  if(!this.state.home){
      window.location.href="/#/login"
  }
 }
/*
 componentDidMount=()=>{
  socket = io.connect(this.state.ENDPOINT);

  
  
  
 
  return () =>{
  socket.emit('disconnect');
  socket.off();
  }
 }
*/
 
  componentDidMount=()=>{
    const url = window.location.href.split('/#/')[1];

    if(url === "auth/activate"){}
    else{
      
     if(url.split('?')[0] === "auth/activate"){
      console.log(url);
     }else{
       
       this.route();
     }
    }

   

  }

  render() {
  
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
             {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
            */}
            {!this.state.home && <Route exact path="/" name="Login Page" render={props => <Login Profile={this.handleProfile} {...props}/>} />}
            {!this.state.home && <Route exact path="/login" name="Login Page" render={props => <Login Profile={this.handleProfile} {...props}/>} />}
           {!this.state.home && <Route exact path="/auth/ForgotPassWord" name="Forgot" render={props => <Forgot {...props}/>} />}
           {!this.state.home &&<Route exact path="/auth/activate" name="Login Page" render={props => <Activate {...props}/>} />}
           {this.state.home && <Route path="/" name="Home" render={props => <TheLayout Uname={this.state.username} email={this.state.email} Pfile={this.state.profile} {...props}/>} />}
           {/*this.state.home && <Route path="/dashboard" name="Dashboard" render={props=><TheLayout Uname={this.state.username} Pfile={this.state.profile}/>}/>*/}
           <Route component={NotFound} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
