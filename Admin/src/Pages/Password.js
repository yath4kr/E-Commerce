import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { baseApiUrl } from "../config"

function Password(){

    const[oldPass, setOldPass] = useState('')
    const[newPass, setNewPass] = useState('')
    const[cnfPass, setCnfPass] = useState('')
    const[errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()


    async function changePass(e){
        e.preventDefault();
        if(oldPass === newPass){
            return setErrMsg('Old Password and New Password must not be same')
        }
        if(cnfPass !== newPass){
            return setErrMsg('Old Password and New Password must not be same')
        }
        try{
            let res = await axios.put(`${baseApiUrl}/admin-user/password`, {"oldPass" : oldPass, "newPass" : newPass, "cnfPass" : cnfPass, "email" : localStorage.getItem('admin_email')})
            if(res){
                localStorage.removeItem("admin_email")
                navigate('/')
            }
        }catch(error){
            setErrMsg(error.message)
        }
    }

    return (
        <>
        <Navbar/>
        <div className="jumbotron text-center bg-gr text-white jumbotron-fluid">
                <h1>Change Password</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <form onSubmit={changePass}>
                            <div className="form-group">
                                <label>Old Password</label>
                                <input type={'Password'} className="form-control" onChange={(e)=>{setOldPass(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type={'password'} className="form-control" onChange={(e)=>{setNewPass(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type={'password'} className="form-control" onChange={(e)=>{setCnfPass(e.target.value)}}/>
                            </div>
                            <p className="text-danger">{errMsg}</p>
                            <button className="btn btn-success" type="submit">Change Password</button>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Password;