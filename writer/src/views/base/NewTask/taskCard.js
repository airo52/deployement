import {
    CBadge,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CCollapse,
    CFade,
    CSwitch,
    CLink
  } from  '@coreui/react'
  import CIcon from '@coreui/icons-react'
const TaskCard =({stateId,id,showcard,collapse,handleCollapse,handleShowCard,showDetails})=>{
   return <CCol xs="12" sm="6" md="4">
   <CFade in={stateId===id?showcard:true}>
     <CCard>
       <CCardHeader>
         Card actions
         <div className="card-header-actions">
           <CLink className="card-header-action">
             <CIcon name="cil-settings" />
           </CLink>
           <CLink className="card-header-action" onClick={() => handleCollapse(id)}>
             <CIcon name={collapse ? 'cil-chevron-bottom':'cil-chevron-top'} />
           </CLink>
           <CLink className="card-header-action" onClick={() => handleShowCard(id)}>
             <CIcon name="cil-x-circle" />
           </CLink>
         </div>
       </CCardHeader>
       <CCollapse show={stateId == id?collapse:false}>
         <CCardBody>
           Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
           laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
           ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
         </CCardBody>
       </CCollapse>

       <CCardFooter>
         
           &nbsp; fixed-price($200)&nbsp;|| &nbsp;
           <button style={{float:'right'}} onClick={()=>showDetails(id)} className="btn btn-info">Full Details</button>
       </CCardFooter>
     </CCard>
   </CFade>
 </CCol>
}

export default TaskCard;