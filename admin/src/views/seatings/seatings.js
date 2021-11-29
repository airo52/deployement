import { useEffect, useState } from "react";
import AccountSeating from "./admins/accountSeating";
import AdminProfile from "./admins/adminProfile";
import Administrators from "./admins/admins";

const Seatings=()=>{
    
    const [id,setId]= useState('');
    const SetId=(id)=>{
        setId(id);
    }

    useEffect(()=>{
       setId(1);
    },[])
  return <>
  <ul className="nav nav-tabs">
  <li className="nav-item">
    
    <a className={1== id?"nav-link active":"nav-link"} onClick={()=>SetId(1)}  href="javascript:void(0)">Manage Your Account</a>
  
</li>
<li className="nav-item">
    
    <a className={2== id?"nav-link active":"nav-link"}
       onClick={()=>SetId(2)}
     href="javascript:void(0)">Account Seatings</a>
  
</li>
<li className="nav-item">
    
    <a className={3== id?"nav-link active":"nav-link"}
       onClick={()=>SetId(3)}
     href="javascript:void(0)">Administrators</a>
  
</li>
</ul>
{1 === id?<AdminProfile/>:""}
{2=== id? <AccountSeating/>:""}
{3 ===id?<Administrators/>:""}
</>
}

export default Seatings;