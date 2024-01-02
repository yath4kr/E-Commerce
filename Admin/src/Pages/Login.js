import "../App.css"
import axios from 'axios'
import {useEffect, useState} from 'react'
import { baseApiUrl } from "../config";
import {useNavigate} from 'react-router-dom'



function Login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [errMsg, setErrMsg] = useState("")


    useEffect(()=>{
        let isLogin=localStorage.getItem("admin_email")
        if(isLogin) navigate("/dashboard")
    },[])

    async function loginUser(e){
        e.preventDefault()

        if(!email || !pass){
            setErrMsg('Please Fill The Fields')
        }else{
                try {
            let res=await axios.post(`${baseApiUrl}/admin-user/login`,{email,pass})
            localStorage.setItem("admin_email",email)
            setErrMsg("")
            navigate('/dashboard')
          } 
            catch (error){
                setErrMsg('Please try Again')
                console.log(error.message)
            }
        }
    }

    return(
        <>
            <div className="jumbotron text-center bg-gr text-white jumbotron-fluid">
                <h1>Login Here</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <form onSubmit={loginUser}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type={'email'} className="form-control" onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type={'password'} className="form-control" onChange={(e)=>{setPass(e.target.value)}}/>
                            </div>
                            <p className="text-danger">{errMsg}</p>
                            <button className="btn btn-success" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;