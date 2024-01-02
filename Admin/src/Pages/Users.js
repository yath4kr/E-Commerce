import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { baseApiUrl, mediaUrl } from "../config";
import axios from 'axios'

function Users(){

    let navigate = useNavigate();
    let [users, setUsers] = useState([])
    let [errMsg, setErrMsg] = useState('')

    async function getUsers(){
        try{
          let res = await axios.get(`${baseApiUrl}/admin-user/`);
          console.log(res)
          setUsers(res.data.msg)
        }
        catch (error){
          setErrMsg(error.message)
        }
    }

    useEffect(()=>{getUsers();}, [])

    console.log(users)

    return(
        <>
            <Navbar/>
            <button className="btn btn-success" onClick={(e)=>navigate('/addusers')}>Add User</button>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Pic</th>
    </tr>
  </thead>
  <tbody>
            {!errMsg &&
              users?.map((v,i) => {
                return (
                  <tr key={v._id}>
                    <th>{i+1}</th>
                    <td>{v.name?v.name:"N/A"}</td>
                    <td>{v.email}</td>
                    <td>
                      <img src={v.pic?`${mediaUrl}/users/${v.pic}`:"assets/images/avatar.png"} height={50} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
</table>
<h3 className="text-danger">{errMsg}</h3>
        </>
    )
}
export default Users;