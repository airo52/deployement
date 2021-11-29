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
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'New Tasks',
    to: '/base/NewTask',
    icon: 'cil-calculator',
    badge: {
      color: 'info',
      text: '50',
    },
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Orders',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
     
     
      {
        _tag: 'CSidebarNavItem',
        name: 'My assigned Orders',
        to: '/base/assignedOrders',
        icon:"cil-align-left"
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Completed Orders',
        to: '/base/completedOrder',
        icon:"cil-align-left"
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'My ongoing Orders',
        to: '/base/OngoingOrder',
        icon:"cil-align-left"
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'My orders being ReDone',
        to: '/base/Redone',
        icon:"cil-align-left"
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'My orders being reviewed',
        to: '/base/OrderBeingReviewed',
        icon:"cil-align-left"
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cancelled Orders',
        to: '/base/CancelledOrders',
        icon:"cil-align-left"
      },
    
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Finances',
    route: '/base',
    icon: 'cil-cursor',
    _children: [
    /*  {
        _tag: 'CSidebarNavItem',
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Brand buttons',
        to: '/buttons/brand-buttons',
      },*/
      {
        _tag: 'CSidebarNavItem',
        name: 'Unpaid orders',
        icon: 'cil-star',
        to: '/base/unpaid',
      },
      /*{
        _tag: 'CSidebarNavItem',
        name: 'Unpaid Orders(Next Period)',
        icon: 'cil-star',
        to: '/base/nextPeriodPayment',
      },*/
      {
        _tag: 'CSidebarNavItem',
        name: 'Payment History',
        icon: 'cil-star',
        to: '/base/history',
      },
    
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Support Center',
    to: '/support',
    icon: 'cil-phone'
  },
 
  /*{
    _tag: 'CSidebarNavDropdown',
    name: 'Icons',
    route: '/icons',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },*/
 
 
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Extras'],
  },
  
 
  
]

export default _nav
