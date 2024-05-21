import Swal from 'sweetalert2'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading, setLoading]= useState(false)
    const navigate = useNavigate()
    
    const handleOnSubmit = async (event)=> {
        event.preventDefault()
        setLoading(true)

    try {
        let {data} = await axios.post("https://api.p2.lc3s6.foxhub.space/login",{
            email,
            password
        })
        localStorage.setItem("access_token", data.access_token)
        Swal.fire({
            title: "Success login!",
            text: 'Welcome to Hacktiv Course',
            icon: "success"
          });
        navigate('/')
    } catch (error) {
        console.log(error.response?.data.message || error.message)
        Swal.fire({
            title: "Error!",
            text: error.response?.data.message || error.message,
            icon: "error"
          });
    }finally{
        setLoading(false)
    }


    }
    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#f59e0b", height: "100vh" }}
        >
            <div className="border w-75 p-5 my-5 bg-white rounded-3 shadow">
                <div className="row">
                    <div className="col-6">
                        <img
                            src="{img1}"
                            alt="login-img"
                            width="100%"
                        />
                    </div>
                    <div className="col-6 align-self-center">
                        <form onSubmit={handleOnSubmit}>
                            <div className="mb-3">
                                <img
                                    src="{h8logo}"
                                    alt="logo-h8"
                                    className="mb-4"
                                    width="200px"
                                />
                                <h5 className="mb-4">Register your account</h5>
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    autoComplete="off"
                                    value = {email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                value = {password}
                                onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            {loading ? <div className="spinner-border"></div> :''}
                            <button type="submit" className="btn btn-primary w-100">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}