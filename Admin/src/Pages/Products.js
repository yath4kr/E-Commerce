import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { baseApiUrl, mediaUrl } from "../config";
import axios from 'axios'


function Products(){
   let navigate = useNavigate();
    let [pros, setPros] = useState([])
    let [errMsg, setErrMsg] = useState('')

    async function delPro(_id){
        try{
             let res = await axios.delete(`${baseApiUrl}/product/delete/${_id}`, {"_id" : _id})
             window.location.reload(false);
        }catch(error){
            setErrMsg(error.message)
        }
    }

    async function getPros(){
        try{
          let res = await axios.get(`${baseApiUrl}/product/`);
          console.log(res)
          setPros(res.data.msg)
        }
        catch (error){
          setErrMsg(error.message)
        }
    }

    useEffect(()=>{getPros();}, [])

    return(
        <>
            <Navbar/>
            <button className="btn btn-success" onClick={(e)=>navigate('/add-pro')}>Add Product</button>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Pic</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
            {!errMsg && typeof pros==="object" ?
                pros?.map((v,i) => {
                return (
                  <tr key={v._id}>
                    <th>{i+1}</th>
                    <td>{v.title?v.title:"N/A"}</td>
                    <td>{v.description}</td>
                    <td>
                      <img src={v.pic?`${mediaUrl}/products/${v.pic}`:"assets/images/avatar.png"} height={50} />
                    </td>
                    <td>{v.price}</td>
                    <td>{v.category}</td>
                    <td><button className="btn btn-danger" onClick={()=>delPro(v._id)}>Delete</button></td>
                  </tr>
                );
              })
                :
                <h1>No Products</h1>}
          </tbody>
</table>
<h3 className="text-danger">{errMsg}</h3>
        </>
    )
}
export default Products;