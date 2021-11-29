import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,

} from '@coreui/react'

import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple';


const WidgetsDropdown = ({dashboard}) => {
  var data = dashboard[0];
  // render
  return (
    <CRow>
      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-primary"
          header={data.assignedOrders[0].count}
          text="Assigned Orders"
          width="200px"
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

      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-info"
          
          text="0rders in Progress"
         
          header={data.assignedOrders[0].count}
        
          width="200px"
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
          color="gradient-warning"
         
          text="Completed Orders"
          header={data.completedOrders[0].count}
         
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

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
         
          text="Orders being Reviewed"
          header={data.pendingReviews[0].count}
          
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
          color="gradient-success"
         
          text="Orders Being Redone"
          header={data.ordersBeingRedone[0].count}
          
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
          color="gradient-primary"
         
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
    </CRow>
  )
}

export default WidgetsDropdown
