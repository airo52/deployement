import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeaderNav,
 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const MoreButton = ({writer,accept,Reject,task,taskid,writerId}) => {
  return (
      
    <CHeaderNav className="px-3">
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div>
           <button  className="btn btn-outline-primary fa fa-tasks"></button>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        
       
        <CDropdownItem onClick={()=>task(taskid)}>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks Details
          
        </CDropdownItem>
       
      
        <CDropdownItem onClick={()=>writer(writerId)}>
          <CIcon name="cil-user" className="mfe-2" />Writer Requesting
        </CDropdownItem>
      
        <CDropdownItem onClick={()=>accept(taskid)}>
          <CIcon name="cil-credit-card" className="mfe-2" />
           Accept Request
          
        </CDropdownItem>
        <CDropdownItem onClick={()=>Reject(taskid)}>
          <CIcon name="cil-file" className="mfe-2" />
          Reject Request
          
        </CDropdownItem>
       
      </CDropdownMenu>
    </CDropdown>
    </CHeaderNav>
  )
}

export default MoreButton
