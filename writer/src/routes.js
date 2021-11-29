import React from 'react';
const Tables = React.lazy(() => import('./views/base/tables/Tables'));


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const newTask = React.lazy(()=>import('./views/base/NewTask/index'));

const OrdersBeingRedone = React.lazy(()=>import('./views/base/Orders/Redone/index'));
const AssignedOrders = React.lazy(()=>import('./views/base/Orders/assigned/index'));
const CancelledOrders = React.lazy(()=>import('./views/base/Orders/cancelled/index'));
const CompletedOrders = React.lazy(()=>import('./views/base/Orders/completed/index'));
const OrdersBeingReviewed = React.lazy(()=>import('./views/base/Orders/in-review/index'));
const OrdersInProgress = React.lazy(()=>import('./views/base/Orders/inprogress/index'));

const NextPeriodPayment = React.lazy(()=>import('./views/base/Finaces/unpaid(next-period)/index'));
const UnpaidOrders = React.lazy(()=>import('./views/base/Finaces/unpaid/index'));
const PaymentHistory = React.lazy(()=>import('./views/base/Finaces/paymentHistory/index'));
const SupportCenter = React.lazy(()=>import('./views/supportCenter/support'));

const Profile = React.lazy(()=>import('./views/base/Profile/profile'));





const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  {path:'/base/NewTask',name:"All available NewTask",component:newTask},
  {path:"/base/assignedOrders",name:"Assigned Orders",component:AssignedOrders},
  {path:"/base/completedOrder",name:"Completed Orders",component:CompletedOrders},
  {path:"/base/OngoingOrder",name:"Ongoing Orders",component:OrdersInProgress},
  {path:"/base/Redone",name:"Orders Being Redone",component:OrdersBeingRedone},
  {path:'/base/OrderBeingReviewed',name:"Orders Being Reviewed",component:OrdersBeingReviewed},
   {path:"/base/CancelledOrders",name:"Cancelled Orders",component:CancelledOrders},
   {path:"/base/unpaid",name:"Unpaid Orders",component:UnpaidOrders},
   {path:"/base/nextPeriodPayment",name:"Next period payment",component:NextPeriodPayment},
   {path:"/support",exact:true,name:"Support Center",component:SupportCenter},
   {path:"/base/history",name:"Payment History",component:PaymentHistory},
   { path: '/base/tables', name: 'Tables', component: Tables },
   {path:'/ProfileSeating',name:'Current Profile',component:Profile},
   
  
];

export default routes;
