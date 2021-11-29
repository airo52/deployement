
import { MultiSelect } from "react-multi-select-component";
import { useState } from 'react';
const CategoryEdit=({data,selected,setSelected})=>{
    
    
   
    return <>
        <MultiSelect
        options={data}
        defaultValue={["value"]}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
      </>
}

export default CategoryEdit;