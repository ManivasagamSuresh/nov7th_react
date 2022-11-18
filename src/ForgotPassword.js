import axios from 'axios';
import { useFormik } from 'formik';
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
   if(user)
    {
        await axios.post(`${config.api}/sendMail/${user._id}`,user)
            alert("please check your mail")
            await axios.put(`${config.api}/tempPassChange`)
            
        }
    
    else{
        alert('Email does not exist')
    }

   
} catch (error) {
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