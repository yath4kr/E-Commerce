import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { baseApiUrl, mediaUrl } from "../config";
import axios from 'axios'

function Categories(){
    let navigate = useNavigate();
    let [cats, setCats] = useState([])
    let [errMsg, setErrMsg] = useState('')

    async function delCat(_id){
        try{
             let res = await axios.delete(`${baseApiUrl}/category/delete/${_id}`, {"_id" : _id})
             window.location.reload(false);
        }catch(error){
            setErrMsg(error.message)
        }
    }

    async function getCats(){
        try{
          let res = await axios.get(`${baseApiUrl}/category/`);
          console.log(res)
          setCats(res.data.msg)
        }
        catch (error){
          setErrMsg(error.message)
        }
    }

    useEffect(()=>{getCats();}, [])

    return(
        <>
            <Navbar/>
            <button className="btn btn-success" onClick={(e)=>navigate('/add-cat')}>Add Category</button>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Pic</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
            {!errMsg && typeof cats==="object" ?
                cats?.map((v,i) => {
                return (
                  <tr key={v._id}>
                    <th>{i+1}</th>
                    <td>{v.title?v.title:"N/A"}</td>
                    <td>{v.description}</td>
                    <td>
                      <img src={v.pic?`${mediaUrl}/categories/${v.pic}`:"assets/images/avatar.png"} height={50} />
                    </td>
                    <td><button className="btn btn-danger" onClick={()=>delCat(v._id)}>Delete</button></td>
                  </tr>
                );
              })
                :
                <h1>No Categories</h1>}
          </tbody>
</table>
<h3 className="text-danger">{errMsg}</h3>
        </>
    )

}
export default Categories;