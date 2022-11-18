import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom';
import { config } from './config';

function ChangePassword() {
    const params = useParams()
    const form = useFormik({
        initialValues:{
            password:"",
            confirmpassword:"",
        },
        onSubmit:async(values)=>{
            await axios.put(`${config.api}/passChange/${params.id}`,values);


        }
    })
  return (
    <div className='container'>
    <form onSubmit={form.handleSubmit}>
    <div className='row'>
        <div className='col-lg-12 form-group'>
            <label>password</label>
            <input name='email' onChange={form.handleChange} value={form.values.password} className='form-control' type={"password"}></input>
        </div>
        <div className='col-lg-12 form-group'>
            <label>Confirm Password</label>
            <input name='password' onChange={form.handleChange} value={form.values.confirmpassword} className='form-control' type={"password"}></input>
        </div>
        <div className='col-lg-12 form-group'>

            <input className='btn btn-primary' type={"submit"}></input>
            
        </div>
    </div>
    </form>
</div>

  )
}

export default ChangePassword