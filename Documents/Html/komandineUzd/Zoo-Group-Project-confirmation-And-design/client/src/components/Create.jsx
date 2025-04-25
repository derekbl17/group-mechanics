import React, { useState } from 'react'
import axios from "axios";


const Create = ({refreshData,data}) => {
    const [values, setValues]=useState({
        gyvūnoPav:"",
        rūšis:"",
        svoris:"",
        aplinka:"",
        gyvenaLietuvoje:""
    })
    //sukuria irasa
    function handleSubmit(e){
        e.preventDefault();
        if(values.gyvūnoPav && values.rūšis && values.svoris && values.aplinka){
            axios.post('http://localhost:5000/addAnimal', values).then((res)=>{
            refreshData()
            console.log(res)
            alert("animal added")
            }).catch((error)=>{console.log(error)})
        }else{
            alert("fill out all fields")
        }
        

    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
  return (
    <div className='addContainer'>
        <form onSubmit={handleSubmit}>
            <h2>Add animal</h2>
            <div>
                <label>Name</label>
                <input className='formInput' type="text" name="gyvūnoPav" value={values.gyvūnoPav} onChange={handleChange}/>
            </div>
            <div>
                <label>Type</label>
                <input className='formInput' type="text" name="rūšis" value={values.rūšis} onChange={handleChange}/>
            </div>
            <div>
                <label>Weight</label>
                <input className='formInput' type="number" name="svoris" step="any" value={values.svoris} onChange={handleChange}/>
            </div>
            <div>
                <label>Habitat</label>
                <input className='formInput' type="text" name="aplinka" value={values.aplinka} onChange={handleChange}/>
            </div>
            <div className='checkBox-container'>
                <label>Lives in Lithuania</label>
                <input className='formInput checkBox' type="checkbox" name="gyvenaLietuvoje" checked={values.gyvenaLietuvoje} onChange={handleChange}/>
            </div>
            <button className='submit' type='submit'>submit</button>
        </form>
    </div>
  )
}

export default Create
