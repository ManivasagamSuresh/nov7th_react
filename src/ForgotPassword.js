import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React from 'react'
import { config } from './config';


function ForgotPassword() {
    const loginform = useFormik({
        initialValues:{
            email:"",
        },
        onSubmit:async(values)=>{

try {
   const user = await axios.post(`${config.api}/users/checkmail`,values);
   console.log(user);
   if(user)
    {
        await axios.put(`${config.api}/tempPassChange/${user.data._id}`);
        console.log("temp pass changed");
        await axios.post(`${config.api}/sendMail/${user.data._id}`,user.data);
            
        
            
            alert("please check your mail")
        }
    
    else{
        alert('Email does not exist')
    }

   
} catch (error) {
    console.log(error);
    alert(error.response.data.message)
}
        }
    })

  return (
    <div className='container'>
        <form onSubmit={loginform.handleSubmit}>
        <div className='row'>
            <div className='col-lg-12 form-group'>
                <label>Email</label>
                <input name='email' onChange={loginform.handleChange} value={loginform.values.email} className='form-control' type={"email"}></input>
            </div>
            
            <div className='col-lg-12 form-group'>

                <input className='btn btn-primary' type={"submit"}></input>
            </div>
        </div>
        </form>
    </div>

  )
}

export default ForgotPassword