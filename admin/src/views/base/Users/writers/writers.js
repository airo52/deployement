
import { useEffect, useState } from 'react';
import ModalCard from 'src/views/modal/Modal';
import TableCard from '../../../table/TableCard';
import NewWriter from './newWriter';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import CategoryEdit from './editCategory';
import { element } from 'prop-types';
import Profile from './profile/profile';
import FormValidation from './formValidate';
import ApiRequest from 'src/Api/Data/requestApi';


const Writers = ({socket})=>{

    const notify = (data) => toast(data);

    const [show, setShow] = useState(false);
    const [isShowLoader,setShowLoader] = useState(false);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [ConfirmPassword,setConfirmPassword] = useState('');
    const [country,setCountry] = useState('');
    const [address,setAdress] = useState('');
    const [phone,setPhone] = useState('');
    const [category,setCategory] = useState([]);
    const [username,setUsername] = useState('');
    const [userId,setUserId]=useState('');
    const  [categories,setCategories] = useState([]);
    const [writers,setWriter] = useState([]);
    const [userName,setUserName] = useState('');
    const [checkd,setCheck] = useState();
   //const [userEmail,setEmail] = useState('');
    

    const [initialSelected,setInititialSelected] = useState([
      { label: "Short Stories.",value:"short"},
      { label: "Technically",value:"technical"},
      { label: "Novellas",value:"novels"},
      { label: "Scripts and Screenplays",value:"scripts"},
      { label: "True Crime. ...",value:"true"},
      { label: " Auto/Biography.",value:"auto"},
     ]);
    const [selected, setSelecteds] = useState('');
   const options = [
      { label: "Short Stories.",value:"short"},
      { label: "Technically",value:"technical"},
      { label: "Novellas",value:"novels"},
      { label: "Scripts and Screenplays",value:"scripts"},
      { label: "True Crime. ...",value:"true"},
      { label: " Auto/Biography.",value:"auto"},
    
      ];

      const setSelected=data=>{
       
          setSelecteds(data)
      }

      const LoadCategories =async ()=>{
        const result = await ApiRequest.getCategories();
      
         setCategories(result.data);
      //  setSelected(result.data)
      }

      const ProfileImage=image=>{
    
        return <img 
                style={{
                  width:"70px",
                  height:"70px",
                  borderRadius:"35px"
                }}
            src={image} alt="profile"/>
      }

      const LoadWriters = async ()=>{
            const result = await ApiRequest.getWriters();
            const sortedItems=[];
             //console.log(result);
            if(result.data !=="empty" && result.data != false){
            result.data.map((item)=>{
             // =${`badge badge-primary`}
                 var data={
                  "#writerId":"#"+item.witer_id,
                  image:ProfileImage(item.writer_profile),
                  writerName:item.writer_name,
                  email:item.writer_email,
                  status:<span className={item.writer_account_status == "0"?"badge badge-danger":"badge badge-primary"}>{item.writer_account_status == "0"?"deactivated":"Active"}</span>,
                  writercategory:item.writer_category,
                  Action:Buttons(item.witer_id,item.writer_name,item.writer_email,checkes(item.writer_account_status))
                 }

                 sortedItems.push(data);
            })
          }


          setWriter(sortedItems);
      }
      const checkes=(status)=>{
        return status == "0"?false:true;
      }

    //load writers

      useEffect(()=>{
         LoadCategories();
         LoadWriters();
      },[]);


    const [edit,setEdit] = useState(false);

    const handleClose = () => {setShow(false);setEdit(false)};
    const handleShow = () => setShow(true);

    const BlockUserPermanet=(id,username)=>{
        swal("You Are About To Permanently Block "+username+"!?", {
            buttons: {
              cancel: "Dont Block!",
              delete: {
                text: "Block User",
                value: "delete",
              },
             
            },
          })
          .then(async (value) => {
            switch (value) {
           
             
           
              case "delete":
                  const result = await ApiRequest.BlockUser(id);
                  if(result.data == true){
                swal(`${username}`, "Deleted Succesfully", "success");
                LoadWriters();
                  }
                break;
           
              default:
                swal("Process Canceled Succesfully!");
            }
          });
    }

    const DisableUser =(id,username)=>{
      swal("","Unblock "+username+"!?","warning", {
        buttons: {
          cancel: "Cancel!",
          delete: {
            text: "Unblock User",
            value: "unblock",
          },
         
        },
      })
      .then(async (value) => {
        switch (value) {
       
         
       
          case "unblock":
            const result = await ApiRequest.unblockUser(id);
            
           if(result.data == true){
            swal(`${username}`, "unblocked Succesfully", "success");
            LoadWriters();
           }
            break;
       
          default:
            swal("Process Canceled Succesfully!");
        }
      });
    }

    const EditUser=(id,checkeds,username,email)=>{
         setUserId(id);
         setUserName(username);
         setCheck(checkeds);
         setEdit(true)
         setEmail(email);
    }
    const Back=()=>{
      setUserId('')
      setEdit(false);
    }

    const CreateNewWriter = async ()=>{
      
        setShowLoader(true);
            const test = FormValidation.RegisterForm(email,username,password,ConfirmPassword,country,address,phone,category);
            if(test == true){
                 const result = await ApiRequest.RegisterWriter(email,username,password,ConfirmPassword,country,address,phone,category);
                  if(result.data == true){
                    notify('Writer added Succesfully');
                    setShowLoader(false);
                    LoadWriters();
             setEmail('');
             setPassword('');
             setAdress('');
             setPassword('');
             setConfirmPassword('');
             setCountry('');
             setPhone('');
             setUsername('');
                  }else{
                       notify(result.data);
                       setShowLoader(false);
                       setEmail('');
                        setPassword('');
                        setAdress('');
                        setPassword('');
                          setConfirmPassword('');
                        setCountry('');
                     setPhone('');
                     setUsername('');
                  }

            }else{

       notify(test);
       setTimeout(() => {
             setShowLoader(false);
            setEmail('');
             setPassword('');
             setAdress('');
             setPassword('');
             setConfirmPassword('');
             setCountry('');
             setPhone('');
             setUsername('');
       }, 2000);
      }
    }


    const Buttons =(id,username,email,checkeds)=>{
     return <> 
          <button style={{color:"blue"}} onClick={()=>EditUser(id,checkeds,username,email)} className="fa fa-edit btn"></button> 
          <button  onClick={()=>checkeds==true?BlockUserPermanet(id,username):DisableUser(id,username)} className={checkeds?"fa fa-unlock btn btn-info":"fa fa-lock btn btn-warning"}></button> 
           
      </>
        }
    
    const columns = [
        {
          dataField: "#writerId",
          text: "WriterId",
         
        },
        {
          dataField: "image",
          text: "Profile",
        
          sort: true
        },
        {
          dataField: "writerName",
          text: "Username",
       
        },
        {
          dataField: "email",
          text: "email",
        
        },
        {
          
            dataField: "status",
            text: "status",
          
          
        },
        {
          
            dataField: "writercategory",
            text: "writer Category",
          
          
        },
        {
            dataField: "Action",
            text: "Action",
         
          }
      ];

      const products = [
           { 
               "#writerId":"#9988",
                image:"image",
                writerName:"Airo",
                email:"airotony8@gmail.com",
                status:<span className="badge badge-primary">cancelled</span>,
                writercategory:"Litrature",
                Action:Buttons(1,"Linet")
         },
         { 
            "#writerId":"#9988",
             image:"image",
             writerName:"Airo",
             email:"airotony8@gmail.com",
             status:<span className="badge badge-primary">cancelled</span>,
             writercategory:"Litrature",
             Action:Buttons(2,"Brayo")
      },
      { 
        "#writerId":"#9988",
         image:"image",
         writerName:"Airo",
         email:"airotony8@gmail.com",
         status:<span className="badge badge-primary">cancelled</span>,
         writercategory:"Litrature",
         Action:Buttons(3,"Kevo")
  },
      
      ];
    
    return <>
     {edit && <Profile
      category={categories}
      existingCategories={initialSelected}
      back={Back}
      DisableUser={DisableUser}
      BlockUserPermanet={BlockUserPermanet}
      id={userId}
      username={userName}
      checkeds={checkd}
      email={email}
      socket={socket}
      />}
      {/*<CategoryEdit data={options} selected={category} setSelected={setCategory}/>*/}
     <ModalCard 
       content={<NewWriter 
        isShowLoader={isShowLoader}
         email={email}
         setEmail={setEmail}
         password={password}
         setPassword={setPassword}
         ConfirmPassword={ConfirmPassword}
         setConfirmPassword={setConfirmPassword}
         country={country}
         setCountry={setCountry}
         address={address}
         setAdress={setAdress}
         phone={phone}
         setPhone={setPhone}
         category={categories}
         setCategory={setCategory}
         username={username}
         setUsername={setUsername}
         setSelected={setCategory}
        />}
        Show={show}
        Close={handleClose}
       Save={CreateNewWriter} ButtonName={"Create New Writer"}
      />
      {!edit && <> <div style={{height:"60px",display:"flex",flexDirection:"row",justifyContent:"space-between"}} className="card">
            <h4 style={{marginTop:"10px",marginLeft:"20px"}}><i>CREATE NEW USER</i></h4>
             <button onClick={()=>handleShow()} style={{width:"40px",height:"40px",marginRight:"10px",marginTop:"7px"}} className="btn btn-primary fa fa-plus"></button>
        </div>
      <div className="container card">
       <TableCard products={writers} columns={columns} title={"Writers"}/>
       </div></>}
       
       <ToastContainer />
    </>
}

export default Writers;