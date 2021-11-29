import React, { Component } from 'react';
import { HashRouter, Route, Switch,useHistory } from 'react-router-dom';
import { requestRefreshToken, veryAccessTokens } from './Api/authThenticateToken';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Activate = React.lazy(()=>import('./views/pages/activate/activate'));
const Forgot = React.lazy(()=>import('./views/pages/activate/forgot'));
const Home = React.lazy(()=>import('./views/pages/Home/home'));
const Terms = React.lazy(()=>import('./views/pages/Home/Terms'));
const ConfirmPayment = React.lazy(()=>import('./views/pages/activate/ConfirmPayment'));
// Pages
/*

const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
*/


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
  
    //alert(username)
    this.setState({username:username,profile:profile,home:true,email:email});
   
 }


 route =async ()=>{
   
  //this.state.home == true?"":window.location.href="/#/auth";
    var ta= localStorage.getItem('wat');
    var tr = localStorage.getItem('wtr');
     
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
      window.location.href="/#/"
  }
 }

  componentDidMount=()=>{
    const url = window.location.href.split('/#/')[1];
   
    if(url === "auth/activate"){}
    else if(url === "confirm"){

    }
    else{
      
     if(url.split('?')[0] === "auth/activate"){
       
      //console.log(url);
     }
     else if(url.split('?')[0] === "confirm"){

     }
     else{
       
       this.route();
     }
    }

  }

  render() {

    
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
            {!this.state.home && <Route exact path="/login" name="Login Page" render={props => <Login Profile={this.handleProfile} {...props}/>} />}
           {!this.state.home &&<Route exact path="/" name="Home Page" render={props => <Home  {...props}/>} />}
           {!this.state.home && <Route exact path="/auth/ForgotPassWord" name="Forgot" render={props => <Forgot {...props}/>} />}
           {!this.state.home &&<Route exact path="/auth/activate" name="Login Page" render={props => <Activate {...props}/>} />}
           {/*
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
            */}
            {this.state.home &&  <Route path="/" name="Home" render={props => <TheLayout email={this.state.email} Uname={this.state.username} Pfile={this.state.profile} {...props}/>} />}
            {!this.state.home &&<Route exact path="/Terms" name="Home Page" render={props => <Terms  {...props}/>} />}
            
            {!this.state.home && <Route exact path="/confirm" name="confirm" render={props => <ConfirmPayment {...props}/>}/>}
            {!this.state.home && <Route component={NotFound} />}
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
