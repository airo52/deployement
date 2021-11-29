import React from 'react'
import {
  
    CRow,
   
  } from  '@coreui/react'
 // import CIcon from '@coreui/icons-react'
//import { DocsLink } from 'src/reusable'
//import TaskCard from './taskCard'
import AssignedOrders from '../Orders/assigned'
const NewTask =({limit,showSingleTask})=>{
   /* const [collapsed, setCollapsed] = React.useState(false)
    const [showCard, setShowCard] = React.useState(false);
    const [id,setId] = React.useState('');

    const handleCollapse=(id)=>{
       setId(id);
       
       setCollapsed(!collapsed);
       setShowCard(true);
    }

    const handleShowCard=(id)=>{
      setId(id);
      setShowCard(!showCard);
    }*/
  
    return (
      <>
      
         <AssignedOrders/>
      
      </>
    )
}

export default NewTask;
