import React, { useState, useEffect } from 'react'

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Card, TextField, Input } from '@material-ui/core';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import axios from '../../../axios-url';
import Swal from 'sweetalert2';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
let paras = [];
const AddNews = () => {
    const [state, setState] = useState({
        noOfParas: 0,
        data: {
            alt_image:'',
            description:'',
            writer: '',
            title: '',
            mainImage: '',
            category: [],
            paras: [],

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

        setState(prevState => {

            let temp = { ...prevState };
            temp.data = { ...prevState.data };
            temp.data.paras = [...prevState.data.paras];
            temp.data.paras[index][place] = data;
            return temp
        }, console.log(state));

    }


    const handleChangeChk = (e) => {
        console.log(e.target.value);
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
                temp.data.paras = [...prevState.data.paras];
                temp.data.paras[index][place] = res.data.result;
                temp.loading = false;
                return temp;
            })
        });

    }
    const paraChanged = (e) => {
        console.log(e);
        if (!e) {
            return;
        }
        let length = paras.length > e ? paras.length - e : e - paras.length;
        let addOrSub = paras.length > e ? 1 : 0; // 1 =sub , 0 = add
        console.log(state, 'length', length, 'addor sub', addOrSub, paras);
        for (let i = 0; i < length; i++) {
            if (addOrSub === 0) {
                paras.push(
                    <div>
                        <br />
                        <h5>Paragraph {paras.length + 1}</h5>
                        <br />
                        <div className="row">

                            <div className="col-md-3 col-sm-12">
                                <label>Sub Title</label>
                                <br />
                                <TextareaAutosize aria-label="minimum height" rowsMin={2} cols={30} onChange={(e) => paragraphDataChange(e.target.value, 'sub_title', i)} placeholder="Enter The Sub-Title" />
                            </div>
                            <div className="col-md-6 col-sm-12">

                                <label>Para {paras.length + 1} </label>
                                <br />
                                {/* <TextareaAutosize aria-label="minimum height" rowsMin={4} cols={60} placeholder="Enter The Title" /> */}
                                <CKEditor
                                    editor={ClassicEditor}
                                    data=""
                                    onInit={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);

                                        setState(prevState => {
                                            let temp = { ...prevState };
                                            temp.data = { ...prevState.data };
                                            temp.data.paras = [...prevState.data.paras];
                                            temp.data.paras.push({ sub_title: '', content: editor.getData(), image: '' })

                                            return temp;
                                        })


                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        // console.log({ event, editor, data });
                                        paragraphDataChange(data, 'content', i);
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <label>Image</label><br />
                                <TextField type="file" onChange={(e) => paragraphImageChange(e, 'image', i)}></TextField>
                            </div>

                        </div>
                    </div>
                )
            } else {
                paras.pop();
                setState(prevState => {

                    let temp = { ...prevState };
                    temp.data = { ...prevState.data };
                    temp.data.paras = [...prevState.data.paras];
                    temp.data.paras.pop();
                    return { ...temp }
                });
            }

        }
        setState(() => { return { ...state, noOfParas: e } });
    }
    useEffect(() => {
        //paraChanged(3)
        axios.post("/common_get_with_table_name",
            { table: 'news_category_list', data: {} }).then(res => {
                console.log(res);
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
            if (state.data.writer === '' || state.data.title === '' || state.data.mainImage === '' || state.data.category.length === 0 || state.data.paras.length === 0) {
                Swal.fire('Error', 'Please Add All details', 'error');
                paras = [];

                setState((prevState) => {
                    let temp = { ...prevState };
                    temp.data = { ...prevState.data };
                    temp.data.paras = [];
                    return { ...temp, loading: false, save: false }
                });
            } else {
                setState((prevState) => { return { ...prevState, loading: true } });
                //save
                axios.post("save_news", state.data).then(res => {
                    if (res.data.code === 0) {
                        Swal.fire('Success', 'News Added Successfully', 'success');
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

                                <label>Writer email</label>
                                <br />
                                <input id="outlined-basic" placeholder="email" defaultValue="" onChange={(e) => { contentChange(e.target.value, 'writer') }} variant="outlined"  style={{height:"30px"}} />
                            </div>
                            <div className="col-md-3 col-sm-12">

                                <label>Enter No Of Paragraphs</label>
                                <br />
                                <input style={{height:"30px"}}  id="outlined-basic" placeholder="No Of Paragraphs" defaultValue="" onChange={(e) => paraChanged(e.target.value)} variant="outlined" />
                            </div>


                            <div className="col-md-3 col-sm-12">
                                <label>Upload Main Image</label> <br />
                                <Input type="file" onChange={(e) => onImageChange(e, 'mainImage')}></Input>
                                <br/>
                              
                            </div>
                            <div className="col-md-3 col-sm-12">
                            <label>Alt Image</label> <br />
                            <input type="text" placeholder="Alt Image" onChange={(e) => { contentChange(e.target.value, 'alt_image') }}/>
                                </div>

                            <div className="col-md-5 col-sm-12">

                                <label>Title</label>
                                <br />
                                <TextareaAutosize aria-label="minimum height" onChange={(e) => { contentChange(e.target.value, 'title') }} rowsMin={2} className="form-control"  placeholder="Enter The Title" />
                            </div>
                            <div className="col-md-6 col-sm-12">

<label>Description</label>
<br />
<TextareaAutosize aria-label="minimum height" onChange={(e) => { contentChange(e.target.value, 'description') }} rowsMin={2} className="form-control"  placeholder="Enter The Description" />
</div>
                            <div className="col-md-7 col-sm-12">

                                <label>Category</label>
                                <br />
                                <div className="row">
                                    {/* <div className="col-md-12 col-sm-12">  */}
                                    {state.categoryList.map((val, index) => {
                                        return (<div style={{ padding: '5px' }} key={val._id}><input type="checkbox" value={val.category} onChange={handleChangeChk} /> {val.category}</div>);
                                    })}
                                    {/* </div> */}
                                </div>
                            </div>

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
                            <button type="button" className="btn btn-secondary" onClick={() => { setState({ ...state, save: true }) }}>Save</button>
                            <button style={{ marginLeft: "1%" }} type="reset" className="btn btn-danger">Clear</button>
                        </div>
                        <br />
                    </form>
                </div>
            </div> : ''}
        </Card>
    )
}

export default AddNews;