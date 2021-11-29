import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import swal from "sweetalert";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Loginn } from 'src/Api/auth/auth';


const Login = ({Profile}) => {
  const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [err,setErr] = useState('');
    const [Err,setEr] = useState(false);
    const [save,SetSave] = useState(false);

    function showError(data){
     // alert(data);
       // swal("LOGIN FAILED",data,'error','1000');
       swal({
        title: "LOGIN FAILED",
        text: data,
        icon: "error",
        timer: 3000
     });
    }

    async function  handLogin(e){
        SetSave(true)
     e.preventDefault();
     
       const result = await Loginn(email,password,Profile);
       //alert(result)
       
      if(result == true){
        
         setEmail('');
         setPassword('');
         SetSave(false)
 
         
 
     }else{
         showError(result)
         setErr(result);
         setEr(true);
         SetSave(false)
       
     }
 
    }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={(e)=>handLogin(e)} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                          <Link to="/auth/ForgotPassWord">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                  <h2>Sign in</h2>
                    <p>
                     Welcome To peak writers
                       Login To continue With your task
                      .</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
