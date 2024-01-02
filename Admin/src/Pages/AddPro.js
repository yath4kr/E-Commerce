import Navbar from "../components/Navbar";
import {useState, useEffect} from 'react';
import {mediaUrl, baseApiUrl} from '../config'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function AddPro(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [pic, setPic] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate();


    async function getCats(){
        try {
            let res=await axios.get(`${baseApiUrl}/category`)
            setCategories(res.data.msg)
            console.log(categories)
        } catch (error) {
            navigate("/categories")
        }
    }

    useEffect(()=>{
        getCats();
    }, [])



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

async function addPro(e){
    e.preventDefault();
    if(!title || !description || !pic || !price || !category){
        setErrMsg('Please Fill the details')
    }else{
        let fData = new FormData;
        fData.append("title", title)
        fData.append("description", description)
        fData.append("pic", pic)
        fData.append("price", price)
        fData.append("category", category)


        try{
            let res = await axios.post(`${baseApiUrl}/product/add-pro`, fData)
            console.log(res)
            if(res) navigate('/products')
        } catch(err){
            setErrMsg(err.message)
        }
    }

}

    return(
        <>
            <Navbar/>
             <div className="jumbotron text-center bg-gr text-white jumbotron-fluid">
                <h1>Add Product Here</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <form onSubmit={addPro} encType="multipart/form-data">
                            <div className="form-group">
                                <label>Title</label>
                                <input type={'text'} className="form-control" onChange={(e)=>{setTitle(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                                <label>Picture</label>
                                <input type={'file'} className="form-control" onChange={choosePic}/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" onChange={(e)=>{setDescription(e.target.value)}}>
                                </textarea>
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input type={'text'} className="form-control" onChange={(e)=>{setPrice(e.target.value)}}/>
                            </div>
                            <div className="form-group">
                    <label>Category</label>
                    <select onChange={(e)=>setCategory(e.target.value)} className="form-control">
                        <option selected disabled>Choose Category</option>
                        {
                            categories?.map(v=><option style={{textTransform:"uppercase"}} key={v._id} value={v._title}>{v.title}</option>)
                        }
                    </select>
                </div>

                            <p className="text-danger">{errMsg}</p>
                            <button className="btn btn-success" type="submit">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddPro;