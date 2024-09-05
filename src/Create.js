import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Create() {

    const [values, setValues] = useState({
        name:'',
        email:'',
        phone:''
    })
    const nav = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/user', values)
        .then(res => {
            console.log(res);
            nav('/');
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white shadow px-5 pb-5 rounded'>
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <lable htmlFor='name'>Name:</lable>
                    <input type='text' name='name' className='form-control' placeholder='Enter Name'
                    onChange={(e)=> setValues({...values, name:e.target.value})}/>
                </div>

                <div className='mb-2'>
                    <lable htmlFor='email'>Email:</lable>
                    <input type='email' name='email' className='form-control' placeholder='Enter Email'
                    onChange={(e)=> setValues({...values, email:e.target.value})}/>
                </div>

                <div className='mb-3'>
                    <lable htmlFor='phone'>Phone:</lable>
                    <input type='text' name='phone' className='form-control' placeholder='Enter Phone'
                    onChange={(e)=> setValues({...values, phone:e.target.value})}/>
                </div>

                <button className='btn btn-success'>Submit</button>
                <Link to='/' className='btn btn-primary ms-3'>Back</Link>
            </form>
        </div>
    </div>
  )
}

export default Create
