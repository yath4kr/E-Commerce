import Navbar from "../components/Navbar";
import {useState, useEffect} from 'react';
import {mediaUrl, baseApiUrl} from '../config'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Addusers(){
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [pic, setPic] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate();



function choosePic(e){
    let myFile=e.target.files[0]
    
    let {name}=myFile
    let fileArr=name.split(".")
    let ext=fileArr[fileArr.length-1]
    if(ext=="png" || ext=="jpg"){
      setPic(myFile)
      setErrMsg("")
    }else{
      setErrMsg("Please Choose Valid Image")
      e.target.value=""
      setPic("")
    }
  }

async function registerUser(e){
    e.preventDefault();
    if(!name || !email || !pass || !pic){
        setErrMsg('Please Fill the details')
    }else{
        let fData = new FormData;
        fData.append("name", name)
        fData.append("email", email)
        fData.append("password", pass)
        fData.append("pic", pic)


        try{
            let res = await axios.post(`${baseApiUrl}/admin-user/register`, fData)
            console.log(res)
            if(res) navigate('/users')
        } catch(err){
            setErrMsg(err.message)
        }
    }

}

    return(
        <>
            <Navbar/>
             <div className="jumbotron text-center bg-gr text-white jumbotron-fluid">
                <h1>Register Here</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <form onSubmit={registerUser} encType="multipart/form-data">
                            <div className="form-group">
                                <label>Name</label>
                                <input type={'text'} className="form-control" onChange={(e)=>{setName(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label>Picture</label>
                                <input type={'file'} className="form-control" onChange={choosePic}/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type={'email'} className="form-control" onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type={'password'} className="form-control" onChange={(e)=>{setPass(e.target.value)}}/>
                            </div>
                            <p className="text-danger">{errMsg}</p>
                            <button className="btn btn-success" type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Addusers;