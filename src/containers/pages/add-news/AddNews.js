import React, { useState, useEffect } from 'react'

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Card, TextField, Input } from '@material-ui/core';

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


let paras = [];
const AddNews = () => {
    const [state, setState] = useState({
        noOfParas: 0,
        data: {
            alt_image: '',
            description: '',
            writer: '',
            title: '',
            mainImage: '',
            category: [],
            paras: [],
            link: ''

        },
        save: false,
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

    const addToSave = () => {
        if (state.data.writer === '' || state.data.title === '' || state.data.mainImage === '' || state.data.category.length === 0 || state.data.paras.length === 0 || state.data.paras[0].content.length === 0) {
            Swal.fire('Error', 'Please Add All details', 'error');
            // paras = [];

            // setState((prevState) => {
            //     let temp = { ...prevState };
            //     temp.data = { ...prevState.data };
            //     temp.data.paras = [];
            //     return { ...temp, loading: false, save: false }
            // });
        } else {
            setState({ ...state, save: true })
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
    const paragraphImageChange = (e, place, index) => {
        setState((prevState) => { return { ...prevState, loading: true } });
      
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
                temp.data.paras = [...prevState.data.paras];
                temp.data.paras[index][place] = res.data.result;
                temp.loading = false;
                return temp;
            })
        });

    }

    const setPara = (e,len) => {
       let arr= [];
          
     
            for(let i=0; i< len;i++){
                arr.push( {sub_title: '', content: '', image: '' })
            }
           
             setState((prevState) => {
               
                let temp = { ...prevState , noOfParas : e};
                temp.data = { ...prevState.data };
    
                temp.data.paras = [...prevState.data.paras,...arr]
               
              console.log(temp);
                return temp;
            });
           
        
      
    }


    const paraChanged = (e) => {
       
        if (!e) {
            return;
        }
        let length = paras.length > e ? paras.length - e : e - paras.length;
        let addOrSub = paras.length > e ? 1 : 0; // 1 =sub , 0 = add
        console.log(state, 'length', length, 'addor sub', addOrSub, paras);
        if(addOrSub === 0){
            setPara(e,length);
        }
        for (let i = 0; i < length; i++) {
            if (addOrSub === 0) {
                 
                paras.push(
                    <div>
                        <br />
                        <h5>Paragraph {paras.length + 1}</h5>
                        <br />
                        <div className="row">

                            <div className="col-md-3 col-sm-12">
                                <label>Sub Title (Optional)</label>
                                <br />
                                <TextareaAutosize aria-label="minimum height" rowsMin={2} cols={30} onChange={(e) => paragraphDataChange(e.target.value, 'sub_title', i)} placeholder="Enter The Sub-Title" />
                            </div>
                            <div className="col-md-6 col-sm-12">

                                <label>Para {paras.length + 1} </label>
                                <br />



                                <ReactQuill modules={modules}
                                    formats={formats}
                                    onChange={(e) => {
                                      
                                        
                                        paragraphDataChange(e, 'content', i);
                                    }} />


                            </div>
                            <div className="col-md-3 col-sm-12">
                                <label>Image (Optional)</label><br />
                                <TextField type="file" onChange={(e) => paragraphImageChange(e, 'image', i)}></TextField>
                            </div>

                        </div>
                    </div>
                )
            } else {
                paras.pop();

                let temp = { ...state ,  noOfParas: +e};
                temp.data = { ...state.data };
                temp.data.paras = [...state.data.paras];
                temp.data.paras.splice(-1, 1);

                setState({ ...temp });
            }

        }
  
    }
    useEffect(() => {
        //paraChanged(3)
        axios.post("/common_get_with_table_name",
            { table: 'news_category_list', data: {} }).then(res => {
                
                setState(prevState => {
                    return { ...prevState, categoryList: res.data.result }
                });
            })
        return () => {
            paras = [];
        }
    }, [])

    useEffect(() => {
       
        if (state.save === true) {

            setState((prevState) => { return { ...prevState, loading: true } });
            //save

            let data = { ...state.data };

            for (let i = data.paras.length - 1; i > 0; i--) {
                console.log(data.paras);
                if (data.paras[i].content.length < 1) {
                    data.paras.pop();
                }
            }
            console.log(data);
            axios.post("save_news", data).then(res => {
                if (res.data.code === 0) {
                    Swal.fire('Success', 'News Added Successfully', 'success').then(() => window.location.reload(false));
                } else {
                    Swal.fire('Error', res.msg, 'error');
                }


                paras = [];

                setState((prevState) => {
                    let temp = { ...prevState };
                    temp.data = { ...prevState.data };
                    temp.data.paras = [];
                    return { ...temp, loading: false, save: false }
                });
                //save
            });




        }
    }, [state.save])

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
            {!state.save ? <div>

                <div>
                    <br />
                    <h2 style={{ paddingLeft: "6%" }}>Enter The News</h2>
                    <br />
                </div>
                <div  >
                    <form style={{ paddingLeft: "10%" }} noValidate autoComplete="off">
                        <div className="row">
                            <div className="col-md-3 col-sm-12">

                                <label>Writer Username</label>
                                <br />
                                <input id="outlined-basic" className="form-control" placeholder="Username" defaultValue="" onChange={(e) => { contentChange(e.target.value, 'writer') }} variant="outlined" />
                            </div>
                            <div className="col-md-3 col-sm-12">

                                <label>Enter No Of Paragraphs</label>
                                <br />
                                <input style={{ height: "30px" }} id="outlined-basic" className="form-control" placeholder="No Of Paragraphs" defaultValue="" onChange={(e) => paraChanged(e.target.value)} variant="outlined" />
                            </div>


                            <div className="col-md-3 col-sm-12">
                                <label>Upload Main Image</label> <br />
                                <Input type="file" onChange={(e) => onImageChange(e, 'mainImage')}></Input>
                                <br />

                            </div>
                            <div className="col-md-3 col-sm-12">
                                <label>Alt Image</label> <br />
                                <input type="text" className="form-control" placeholder="Alt Image" onChange={(e) => { contentChange(e.target.value, 'alt_image') }} />
                            </div>

                            <div className="col-md-5 col-sm-12">

                                <label>Title</label>
                                <br />
                                <input aria-label="minimum height" onChange={(e) => { contentChange(e.target.value, 'title') }} className="form-control" placeholder="Enter The Title" />
                            </div>
                            <div className="col-md-6 col-sm-12">

                                <label>Description</label>
                                <br />
                                <TextareaAutosize aria-label="minimum height" onChange={(e) => { contentChange(e.target.value, 'description') }} rowsMin={2} className="form-control" placeholder="Enter The Description" />
                            </div>
                            <div className="col-md-5 col-sm-12">

                                <label>Custom Link (Optional)</label>
                                <br />
                                <input onChange={(e) => { contentChange(e.target.value, 'link') }} className="form-control" placeholder="Link" />
                            </div>
                            {state.data.category.length < 4 ? <div className="col-md-7 col-sm-12">

                                <label>Category</label>
                                <br />
                                <div className="row">
                                    {/* <div className="col-md-12 col-sm-12">  */}
                                    {state.categoryList.map((val, index) => {

                                        if (state.data.category.length >= 3 && state.data.category.indexOf(val.category) === -1) {
                                            return (<div style={{ padding: '5px' }} key={val._id}><input disabled type="checkbox" value={val.category} onChange={handleChangeChk} /> {val.category}</div>);
                                        }
                                        return (<div style={{ padding: '5px' }} key={val._id}><input type="checkbox" value={val.category} onChange={handleChangeChk} /> {val.category.split("-").join(" ")}</div>);
                                    })}
                                    {/* </div> */}
                                </div>
                            </div> : ''}
                        </div>
                     
                        <div>
                            <br />
                            <h4>Enter The Main Content</h4>

                        </div>
                       
                        {paras.map((val, i) => {
                             
                            return (
                                <span key={i}>
                                   
                                    {val}
                                </span>

                            )
                        })}
                        <br />  <br />
                        <div className="d-flex justify-content-center" >
                            <button type="button" className="btn btn-secondary" onClick={addToSave}>Save</button>
                            <button style={{ marginLeft: "1%" }} type="reset" className="btn btn-danger">Clear</button>
                        </div>
                        <br />
                    </form>
                </div>
            </div> : ''}
        </Card>
    )
}

// 
export default AddNews;