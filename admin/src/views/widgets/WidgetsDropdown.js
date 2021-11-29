import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,

} from '@coreui/react'

import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsDropdown = ({dashboard}) => {

  var data = dashboard[0];

  
  // render
  return ( 
   <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={data.assignedOrders[0].count}
          text="Assigned Orders"
          footerSlot={
            <ChartBarSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={data.assignedOrders[0].points}
              pointHoverBackgroundColor="primary"
              label="Orders %"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>

      

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={data.ordersBeingRedone[0].count}
          text="Orders Being Redone"
          footerSlot={
            <ChartBarSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={data.ordersBeingRedone[0].points}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Revisions"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={data.cancelledOrders[0].count}
          text="Cancelled Orders"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={data.cancelledOrders[0].points}
              backgroundColor="rgb(250, 152, 152)"
              label="Cancelled"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>

     

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-success"
          header={data.pendingReviews[0].count}
          text="Orders Pending Reviews"
          footerSlot={
            <ChartBarSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={data.pendingReviews[0].points}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Pending"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={data.totalUsers[0].count}
          text="Total Users"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={data.totalUsers[0].points}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Total Users"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-success"
          header={data.completedOrders[0].count}
          text="Completed Orders"
          footerSlot={
            <ChartBarSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={data.completedOrders[0].points}
              pointHoverBackgroundColor="primary"
              label="Completed Orders"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-info"
          header={data.totalTask[0].count}
          text="Toatal Task"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              dataPoints={data.totalTask[0].points}

              label="Task %"
              labels="months"
              
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>

      
  
    </CRow>
  )
}

export default WidgetsDropdown

