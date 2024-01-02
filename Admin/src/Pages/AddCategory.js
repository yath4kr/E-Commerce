import Navbar from "../components/Navbar";
import {useState, useEffect} from 'react';
import {mediaUrl, baseApiUrl} from '../config'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


function AddCategory(){

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
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

async function addCat(e){
    e.preventDefault();
    if(!title || !description || !pic){
        setErrMsg('Please Fill the details')
    }else{
        let fData = new FormData;
        fData.append("title", title)
        fData.append("description", description)
        fData.append("pic", pic)


        try{
            let res = await axios.post(`${baseApiUrl}/category/add-cat`, fData)
            console.log(res)
            if(res) navigate('/categories')
        } catch(err){
            setErrMsg(err.message)
        }
    }

}

    return(
        <>
            <Navbar/>
             <div className="jumbotron text-center bg-gr text-white jumbotron-fluid">
                <h1>Add Category Here</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <form onSubmit={addCat} encType="multipart/form-data">
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
                            <p className="text-danger">{errMsg}</p>
                            <button className="btn btn-success" type="submit">Add Cat</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddCategory;