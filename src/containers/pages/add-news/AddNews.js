import React, { useState, useEffect } from 'react'

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Card } from '@material-ui/core';

import ReactQuill from 'react-quill';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import axios from '../../../axios-url';
import Swal from 'sweetalert2';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


let modules = {
    toolbar: {
        container: [
            ["bold", "italic", "underline", "strike", "blockquote","code" , "header"],
            [{ header: [] }],
            [{ size: ["small", false, "large", "huge"] }, { color: [] }],
            [{font:[]}],
           
            [{background:[]}],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            ["link", "image", "video"],
            ["clean"]
        ],
        //   handlers: { image: this.imageHandler }
    },
    clipboard: { matchVisual: false }
};

let formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "font",
    "background",
    "code"
];


const AddNews = () => {
    const [preview , setPreview] = useState(true)
    const [state, setState] = useState({
       
        data: {
            alt_image: '',
            description: '',
            writer: '',
            title: '',
            mainImage: '',
            category: [],
            paras: [{
                content: '',
                sub_title:'',
                image: ''
            }],
            link: ''

        },
        loading: false,
        categoryList: []

    });

    const contentChange = (e, place) => {

        setState((prevState) => {
            let temp = { ...prevState };
            temp.data = { ...prevState.data };
            temp.data[place] = e;
            return temp
        });
    }

    const onImageChange = (e, place) => {
        setState((prevState) => { return { ...prevState, loading: true } });
        console.log(e.target.files[0], place);
        let formData = new FormData();
        formData.append('file', e.target.files[0]);

        axios({
            method: 'post',
            url: 'upload_news_image',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {

            setState(prevState => {
                let temp = { ...prevState };
                temp.data = { ...prevState.data };
                temp.data[place] = res.data.result;
                temp.loading = false;
                return temp;
            });
        });
    }

    const paragraphDataChange = (data, place, index) => {
        console.log(data, index, place ,state.data.paras[index])


        setState(prevState => {
             console.log(prevState)
            let temp = { ...prevState };
            temp.data = { ...prevState.data };
            temp.data.paras = [...prevState.data.paras];
            temp.data.paras[index][place] = data;
            return temp
        });
    
}

    const addToSave =async () => {
        setState((prevState) => { return { ...prevState, loading: true } });
        
   
        if (state.data.writer === '' || state.data.title === '' || state.data.mainImage === '' || state.data.category.length === 0 || state.data.paras.length === 0 || state.data.paras[0].content === '') {
            Swal.fire('Error', 'Please Add All details', 'error');
            setState((prevState) => { return { ...prevState, loading: false } });
            // });
        } else {

            let isWriter = await axios.post("/get_user_by_username", { username: state.data.writer})
            console.log(isWriter.data.code)
            if(isWriter.data.code === 0){
                axios.post("save_news", state.data).then(res => {
                    if (res.data.code === 0) {
                        Swal.fire('Success', 'News Added Successfully', 'success').then(() => window.location.reload(false));

    
                        setState((prevState) => {
                            let temp = { ...prevState };
                            temp.data = { ...prevState.data };
                            temp.data.paras =  [{
                                content: '',
                                sub_title:'',
                                image: ''
                            }];
                            return { ...temp, loading: false}
                        });
                        //save
                    } else {
                        Swal.fire('Error', res.msg, 'error');
                        setState((prevState) => {
                            let temp = { ...prevState };
                            temp.data = { ...prevState.data };
                            return { ...temp, loading: false }
                        });
                    }
    
    
          
                });
            } else {
                Swal.fire('User Does Not Exist', 'Please Check Your Username', 'error');
                setState((prevState) => { return { ...prevState, loading: false } });

            }
          


        }

    }



    const handleChangeChk = (e) => {
    
        let temp = { ...state };
        temp.data = { ...state.data };
        temp.data.category = [...state.data.category];
        if (temp.data.category.length === 0) {
            temp.data.category.push(e.target.value);
        } else {
            if ((temp.data.category.indexOf(e.target.value) > -1)) {
                temp.data.category.splice(temp.data.category.indexOf(e.target.value), 1);
            } else {
                temp.data.category.push(e.target.value);
            }
        }

        setState({ ...temp });
    }

  
    useEffect(() => {
        //paraChanged(3)
        axios.post("/common_get_with_table_name",
            { table: 'news_category_list', data: {} }).then(res => {
                
                setState(prevState => {
                    return { ...prevState, categoryList: res.data.result }
                });
            })
     
    }, [])



    return (
        <Card>
            <div className="sweet-loading d-flex justify-content-center align-items-center">
                <CircleLoader
                    css={override}
                    size={80}
                    color={"#F89C04"}
                    loading={state.loading}
                />
            </div>
            <div>

                <div>
                    <br />
                    <h2 style={{ paddingLeft: "6%" }}>Enter The News</h2>
                    <br />
                </div>
                <div  >
                   
                    <form  style={{ display: !state.loading ? 'block' : 'none' , paddingLeft: "10%"  }} noValidate autoComplete="off">
                        <div className="row">
                        <div className="col-md-10 col-sm-12">

                                <label>Title</label>
                                <br />
                                <input aria-label="minimum height" defaultValue={state.data.title} onChange={(e) => { contentChange(e.target.value, 'title') }} className="form-control" placeholder="Enter The Title" />
                                </div>
                                <br />
                            <div className="col-md-4 col-sm-12">

                                <label>Writer Username</label>
                                <br />
                                <input id="outlined-basic" className="form-control" placeholder="Username" defaultValue={state.data.writer} onChange={(e) => { contentChange(e.target.value, 'writer') }} variant="outlined" />
                            </div>
                   

                            <div className="col-md-3 col-sm-12">
                                <label>Upload Main Image</label> <br />
                                <input type="text"  id="outlined-basic" className="form-control" onChange={(e) => { contentChange(e.target.value, 'mainImage') }} />
                                <br />

                            </div>
                            <div className="col-md-3 col-sm-12">
                                <label>Alt Image</label> <br />
                                <input type="text" className="form-control" defaultValue={state.data.alt_image}  placeholder="Alt Image" onChange={(e) => { contentChange(e.target.value, 'alt_image') }} />
                            </div>

                      
                            <div className="col-md-10 col-sm-12">

                                <label>Description</label>
                                <br />
                                <TextareaAutosize aria-label="minimum height" defaultValue={state.data.description} onChange={(e) => { contentChange(e.target.value, 'description') }} rowsMin={2} className="form-control" placeholder="Enter The Description" />
                            </div>
                            <div className="col-md-5 col-sm-12">

                                <label>Custom Link (Optional)</label>
                                <br />
                                <input onChange={(e) => { contentChange(e.target.value, 'link') }}  defaultValue={state.data.link} className="form-control" placeholder="Link" />
                            </div>
                            {state.data.category.length < 4 ? <div className="col-md-5 col-sm-12">

                                <label>Category</label>
                                <br />
                                <div className="row">
                                    {/* <div className="col-md-12 col-sm-12">  */}
                                    {state.categoryList.map((val, index) => {

                                        if (state.data.category.length >= 3 && state.data.category.indexOf(val.category) === -1) {
                                            return (<div style={{ padding: '5px' }} key={val._id}><input disabled type="checkbox" checked={state.data.category.indexOf(val.category) !== -1} value={val.category} onChange={handleChangeChk} /> {val.category}</div>);
                                        }
                                        return (<div style={{ padding: '5px' }} key={val._id}><input type="checkbox"   checked={state.data.category.indexOf(val.category) !== -1}  value={val.category} onChange={handleChangeChk} /> {val.category.split("-").join(" ")}</div>);
                                    })}
                                    {/* </div> */}
                                </div>
                            </div> : ''}
                        </div>
                     
                        <div>
                            <br />
                            <h4>Enter The Main Content</h4>

                        </div>
                        <div className="col-md-10 col-sm-12"> 
                  {preview ? <ReactQuill modules={modules}
                                    formats={formats}
                                    value={state.data.paras[0].content}
                                    onChange={(e) => {
                                        paragraphDataChange(e, 'content', 0);
                                    }} /> :
                                  <div> <textarea className="form-control" rows={30} value={state.data.paras[0].content} onChange={(e) => {
                                                    console.log(e.target.value)
                                                  paragraphDataChange(e.target.value, 'content', 0);
                                              }} ></textarea>
                                              <br/>
                            <button style={{ marginLeft: "1%" }} onClick={() => setPreview(true)} type="button" className="btn btn-danger">Back</button>
                                              
                                              </div>
                                              } 

</div>
                        <br />  <br />

                        <div className="d-flex justify-content-center" >
                            <button type="button" className="btn btn-secondary" onClick={ () => {  !preview ?  addToSave() : setPreview(false) }} >Save</button>
                            <button style={{ marginLeft: "1%" }} type="reset" className="btn btn-danger">Clear</button>
                        </div>
                        <br />
                    </form>
                </div>
            </div> 
        </Card>
    )
}

// 
export default AddNews;