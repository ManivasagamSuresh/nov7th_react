import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { config } from './config';


function Login() {
    const navigate = useNavigate()
    const loginform = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        onSubmit:async(values)=>{
// console.log(values);
try {
   const user = await axios.post(`${config.api}/user/login`,values);
   localStorage.setItem("myreact",user.data.token)
   if(user.data.message === "success")
   {navigate("/products")}
   
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
                <label>Password</label>
                <input name='password' onChange={loginform.handleChange} value={loginform.values.password} className='form-control' type={"password"}></input>
            </div>
            <div className='col-lg-12 form-group'>

                <input className='btn btn-primary' type={"submit"}></input>
                <Link to={"/ForgotPassword"} >Forgot Password</Link>
            </div>
        </div>
        </form>
        <div className='col-4-lg mt-5'>
        <Link to={"/CreateUser"}><button className=" btn btn-primary">Create User</button></Link>
            
        </div>
        
    </div>

  )
}

export default Login
