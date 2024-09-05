import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';

function Home() {
    
    const [data, setData] = useState([]);
    const [record, setRecord] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/user')
        .then(res => {
            setData(res.data)
            setRecord(res.data)
        })
        .catch(err => console.log(err))
      }, [])
    
    const handleDelete = (id) => {
        const confirm = window.confirm("Would you like to Delete?");
        if(confirm){
            axios.delete(`http://localhost:5000/user/${id}`)
            .then(res => {
                setData(data.filter(d => d.id !== id))
            })
            .catch(err => console.log(err))
        }
    }  

    const filter = (e) => {
        setRecord(data.filter(f => f.name.toLowerCase().includes(e.target.value)));
    }


      return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <h1>List of Users</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>

                <div className='d-flex justify-content-end'>
                    <input type='text' className='input w-25 me-3 rounded' placeholder='Search' onChange={filter}/>
                    <Link to='/create' className='btn btn-success'>Add +</Link>
                </div>

                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            record.map((d, i) =>(
                                <tr key={i}>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.phone}</td>
                                    <td>
                                        <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                                        <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                        <button onClick={(e) => handleDelete(d.id)} className='btn btn-sm btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
          
        </div>
  )
}

export default Home
