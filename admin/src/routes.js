import React from 'react';


const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));

const TaskMagement = React.lazy(()=>import('./views/base/Task/management/mangement'));
const AssignTask = React.lazy(()=>import('./views/base/Task/assign/assign'));
const PostTask = React.lazy(()=>import('./views/base/Task/post/postTask'));

const Writers = React.lazy(()=>import('./views/base/Users/writers/writers'));
//const Administrators = React.lazy(()=>import('./views/base/Users/admin/admin'));

const PaymentHistory = React.lazy(()=>import('./views/base/Payments/history/history'));
const PaidInvoices = React.lazy(()=>import('./views/base/Payments/Paid/paid'));
const PendingPayments = React.lazy(()=>import('./views/base/Payments/pending/pendingPayments'));

const Seatings = React.lazy(()=>import('./views/seatings/seatings'));
const SupportCenter = React.lazy(()=>import('./views/supportCenter/support'));
//const UserActivities = React.lazy(()=>import('./views/seatings/userActivities'));






const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
   {path:"/base/users",exact:true,name:"Writers",component:Writers},
  // {path:"/base/admins",exact:true,name:"AdminiStrator",component:Administrators},
   {path:"/task/post",exact:true,name:"Add New Task",component:PostTask},
   {path:"/task/all",exact:true,name:"Mange All Task",component:TaskMagement},
   {path:"/task/assign",exact:true,name:"Assign Task To users",component:AssignTask},
   {path:"/Payments/History",exact:true,name:"Payment History",component:PaymentHistory},
   {path:"/Payments/pending",exact:true,name:"Pending Invoices",component:PendingPayments},
   {path:"/Payments/paid",exact:true,name:"Fully Paid Invoices",component:PaidInvoices},
   {path:"/support",exact:true,name:"Support Center",component:SupportCenter},
   {path:"/seatings/profile",name:'Profile Seatings',component:Seatings},
  // {path:'/seatings/activities',name:'Administrators Activities',component:UserActivities}

];

export default routes;
