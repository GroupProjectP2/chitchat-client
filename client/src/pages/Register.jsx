import Swal from 'sweetalert2'
import axios from 'axios'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'



export default function Login() {
    const [fullName,setFullName] = useState("")
    const [username,setUsername] = useState("")
    const [gender,setGender] = useState("")
    const [profilePic,setProfilePic] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading, setLoading]= useState(false)
    const navigate = useNavigate()
    
    const handleOnSubmit = async (event)=> {
        event.preventDefault()
        setLoading(true)

    try {
        let {data} = await axios.post("https://localhost:3000/register",{
            fullName,
            username,
            gender,
            profilePic,
            email,
            password,
        })
        localStorage.setItem("access_token", data.access_token)
        Swal.fire({
            title: "Success login!",
            text: 'Welcome to ChitChat App',
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
                                <label htmlFor="fullName" className="form-label">
                                    Full Name 
                                </label>
                                <input
                                    type="fullName"
                                    className="form-control"
                                    id="fullName"
                                    autoComplete="off"
                                    value = {fullName}
                                    onChange={(event) => setFullName(event.target.value)}
                                />
                                <label htmlFor="username" className="form-label">
                                    User Name
                                </label>
                                <input
                                    type="username"
                                    className="form-control"
                                    id="username"
                                    autoComplete="off"
                                    value = {username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                                <label htmlFor="gender" className="form-label">
                                   Gender
                                </label>
                                <input
                                    type="gender"
                                    className="form-control"
                                    id="gender"
                                    autoComplete="off"
                                    value = {gender}
                                    onChange={(event) => setGender(event.target.value)}
                                />
                                <label htmlFor="username" className="form-label">
                                    Profile Picture URL
                                </label>
                                <input
                                    type="profilePic"
                                    className="form-control"
                                    id="profilePic"
                                    autoComplete="off"
                                    value = {profilePic}
                                    onChange={(event) => setProfilePic(event.target.value)}
                                />
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
                        <p className='text-center mt-3'>Do you have an account? <Link to={'/login'}>Login</Link> </p>
                    </div>
                </div>
            </div>
        </div>

    )
}