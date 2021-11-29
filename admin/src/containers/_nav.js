import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['System']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Users',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/base/users',
        icon: 'cil-user',
        },
      
    ],
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Task',
    route: '/task',
    icon: 'cil-spreadsheet',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Post Task',
        to: '/task/post',
        icon: 'cil-shield-alt',
        },
        {
          _tag: 'CSidebarNavItem',
         name: 'Manage All Orders',
          to: '/task/all',
         
          icon: 'cil-save',
        }
        ,
        {
          _tag: 'CSidebarNavItem',
         name: 'Assign Task',
          to: '/task/assign',
          icon: 'cil-user-follow',
        }
    ],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Payments',
    route: '/Payments',
    icon: 'cil-speedometer',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Payment History',
        to: '/Payments/History',
        icon: 'cil-circle',
      },
      {
        _tag: 'CSidebarNavItem',
       name: 'Pending payment Invoices',
        to: '/Payments/pending',
        icon: 'cil-layers',
      },
      
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Support Center',
    to: '/support',
    icon: 'cil-phone'
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Seatings',
    route: '/seatings',
    icon: 'cil-speedometer',
    _children: [
   
      {
        _tag: 'CSidebarNavItem',
       name: 'Profile',
        to: '/seatings/profile',
        icon: 'cil-layers',
      },
  
    ],
  }
 /* {
    _tag: 'CSidebarNavItem',
    name: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie'
  },
  */

 



]


export default _nav
