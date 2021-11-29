import React, { useState } from 'react'
//import './styles.css'
const DynamicForm = ()=>{
    




    const [formValues, setFormValues] = useState([{ name: ""}])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { name: ""}])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
        <form   onSubmit={handleSubmit}>
            <button style={{
                  float:"right",
                  border:'0px',
                  outline:"none",
                  border:"1px solid blue",
                  height:"30px",
                  width:"30px",
                  borderRadius:"15px",
                  color:"white"
            }} className="fa fa-plus badge-info" type="button" onClick={() => addFormFields()}></button>
          {formValues.map((element, index) => (
            <div style={{width:"100%"}} className="form-group row" key={index}>
                 <div style={{width:"80%",display:"flex",flexDirection:"row",marginLeft:"20px"}} class="form-group">
                 
               <input  type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
             
             
              {
                index ? 
                  <button type="button" style={{marginLeft:"10px",
                  border:'0px',
                  outline:"none",
                  border:"0px solid red",
                  height:"30px",
                  width:"30px",
                  borderRadius:"15px",
                  color:"red",
                  backgroundColor:"white"
                     
                   }}  className="fa fa-trash" onClick={() => removeFormFields(index)}></button> 
                : null
              }
              </div>
            </div>
          ))}
          <div className="button-section">
              
              <button style={{width:"100%"}} className="btn btn-info" type="submit">Submit</button>
          </div>
      </form>
    )
}
export default DynamicForm;