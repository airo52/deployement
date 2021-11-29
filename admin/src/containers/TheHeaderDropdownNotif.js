import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ApiRequest from 'src/Api/Data/requestApi'

const TheHeaderDropdownNotif = ({notificationCount,Messages=[]}) => {
  
     const clearReadNotification =()=>{
        setTimeout(() => {
          Messages.forEach(async (element) => {
            await ApiRequest.clearReadNotification(element.id);
          });
        }, 4000);
         
     }

  const itemsCount = notificationCount;
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle onClick={()=>clearReadNotification()} className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell"/>
        <CBadge shape="pill" color="danger">{itemsCount}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu  placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {itemsCount} notifications</strong>
        </CDropdownItem>
          {Messages.map((item)=>{
             return <CDropdownItem ><CIcon name="cil-user-follow" className="mr-2 text-success" /> {item.text}</CDropdownItem>
              
          })}
      
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif