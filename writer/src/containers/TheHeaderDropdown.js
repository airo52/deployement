import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Logout } from 'src/Api/auth/auth'

const TheHeaderDropdown = ({profile}) => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={profile}
            className="c-avatar-img"
            alt="writer"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          
        </CDropdownItem>
        
       
        <CDropdownItem>
          
        <CLink className="c-subheader-nav-link"
              aria-current="page" 
              to="/ProfileSeating"
            >
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
          </CLink>
        </CDropdownItem>
        <CLink className="c-subheader-nav-link"
              aria-current="page" 
              to="/base/history"
            >
        <CDropdownItem>
        <CLink className="c-subheader-nav-link"
              aria-current="page" 
              to="/base/history"
            >
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">42</CBadge>
          </CLink>
        </CDropdownItem>
        </CLink>
       
        <CDropdownItem divider />
        
        <CDropdownItem onClick={()=>Logout()}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
