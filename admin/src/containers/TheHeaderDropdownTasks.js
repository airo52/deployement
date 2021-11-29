import React, { useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ModalCard from 'src/views/modal/Modal'
import Loader from 'react-loader-spinner'


const TheHeaderDropdownTasks = () => {
      const [show,SetShow] = useState(false);
      const [isShowLoader,setIshowLoader]= useState(false);

      const Open=()=>{
         SetShow(true);
      }
      const close=()=>{
        SetShow(false);
      }

      const Content=()=>{
        return <>
               <form class="row g-3">
               <div style={{
                  display:"block",
                  cursor:"pointer",
                   zIndex:99,
                  position:"absolute",
                  top:"40%",
                  left:'40%',
                  right:"40%",
                  
             }}>
               
                 
                {isShowLoader &&  <Loader
                   type="Circles"
                   color="#00BFFF"
                    height={100}
                    width={100}
      
                  />}
               
             </div>
  <div class="col-md-12">
    <label for="inputEmail4" class="form-label">Payment Name</label>
    <input type="text" class="form-control" id="inputEmail4"/>
  </div>
  </form>
              </>
      }
      const Save=()=>{
         setIshowLoader(true);
         
      }
  return (
    <>
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
     
    >
      <CDropdownToggle onClick={()=>Open()} className="c-header-nav-link" caret={false}>
        <CIcon name="cil-list" />
        
      </CDropdownToggle>
   
    </CDropdown>
    <ModalCard 
     Close={close}
     Save={Save}
     ButtonName={"Add Payment Method"}
     Show={show}
     isShowLoader={isShowLoader}
     content={<Content/>}
    />
    
    </>
  )
}

export default TheHeaderDropdownTasks