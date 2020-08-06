import React, { useState, useEffect } from 'react'
import { Card } from '@material-ui/core'
import axios from '../../../axios-url';
import Swal from 'sweetalert2';
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const AddBlog = () => {
    const [state, setState] = useState({
        data: {
            writer: '',
            description: '',
            image: '',
            deleted: false,
            title: '',
            category: '',
            file: '',
            date: new Date(Date.now()).toISOString()
        },
        images: [],
        category: [],
        loading: false,
        save: false,

    })

    useEffect(() => {
        axios.post('common_get_with_table_name', {
            "table": "news_category_list",
            "data": {}
        }).then(res => {
            if (res.data.code === 0) {
                console.log(res.data.result);
                let temp = { ...state, category: res.data.result }
                temp.data ={...state.data, category: res.data.result[0].category}
                setState({...temp})
            }
        })
    }, [])



    useEffect(() => {
// console.log(state);
// return;
        if (state.save === true) {
            if (state.data.writer === '' || state.data.title === '' || state.data.description === '' || state.data.category === '' || state.data.image === '' || state.data.file === '') {
                Swal.fire('Error', 'Please Add All details', 'error');

                setState((prevState) => {
                    let temp = { ...prevState };


                    return { ...temp, loading: false, save: false }
                });
            } else {
                console.log(state);
                setState((prevState) => { return { ...prevState, loading: true } });
                //save
                let formData = new FormData();
                Object.keys(state.data).forEach((value, index) => {
                    console.log(value, state.data[value]);
                    formData.append(value, state.data[value]);
                });

                axios.post("create_blog", formData).then(res => {
                    if (res.data.code === 0) {
                        Swal.fire('Success', 'Blog Added Successfully', 'success');
                        setState((prevState) => {
                            let temp = { ...prevState, images: [] };
                            temp.data = { ...prevState.data };
                            temp.data = {
                                writer: '',
                                description: '',
                                image: '',
                                deleted: false,
                                title: '',
                                category: '',
                                file: '',
                                date: new Date(Date.now()).toISOString()
                            }
                            return { ...temp, loading: false, save: false }
                        });
                        // setState({...state, clear: false});
                    } else {
                        Swal.fire('Error', res.msg, 'error');
                    }


                    setState((prevState) => {
                        let temp = { ...prevState };

                        return { ...temp, loading: false, save: false }
                    });
                    //save
                });
            }



        }
    }, [state.save])


    const paragraphDataChange = (data, place) => {
        let val = data.target.value;
        setState(prevState => {

            let temp = { ...prevState };
            temp.data = { ...prevState.data };
            temp.data[place] = val
            return temp
        }, console.log(state));

    }

    const htmlAdd = (e, place) => {
        let file = e.target.files[0];
        setState(prevState => {

            let temp = { ...prevState };
            temp.data = { ...prevState.data };
            temp.data[place] = file
            return temp
        }, () => console.log(state));

    }
    const paragraphImageChange = (e, place) => {
        setState((prevState) => { return { ...prevState, loading: true } });
        console.log(e.target.files[0], place);
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        axios({
            method: 'post',
            url: 'upload_blog_image',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            setState(prevState => {
                let temp = { ...prevState };
                temp.data = { ...prevState.data }
                temp.data.image = res.data.result[0];
                temp.loading = false;
                return temp;
            })
        });

    }


    const allimg = (e) => {
        console.log(e.target.files);
        let formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('file', e.target.files[i])
        }


        axios({
            method: 'post',
            url: 'upload_blog_image',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            if (res.data.code === 0) {
                let images = res.data.result;
                console.log(images);
                setState({ ...state, images });
            } else {
                Swal.fire('Failed', 'Failed To Upload Image', 'error');
            }

        });
    }

    return (
        <div>
            <Card>
                <div className="sweet-loading d-flex justify-content-center align-items-center">
                    <CircleLoader
                        css={override}
                        size={80}
                        color={"#F89C04"}
                        loading={state.loading || state.save}
                    />
                </div>
                <div>
                    <br />
                    <h4 style={{ paddingLeft: "6%" }}>Upload Content Images</h4>
                    <br />
                </div>
                <div className="d-flex justify-content-center">
                    {state.images.length === 0 ? <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Image:</label>
                            <br />

                            <input type="file" accept="image/*" multiple onChange={(e) => allimg(e)} />


                        </div>
                    </div> :

                        <div className="row">
                            {console.log(state)}
                            {state.images.map((val, i) => {
                                return (<div key={i} className="col-md-4">
                                    <Card>
                                        <img className="img-responsive" style={{ width: "100%", height: "100px" }} src={val} />
                                        <br />
                                        <input type="text" value={val} />
                                    </Card>

                                </div>)
                            })}
                        </div>

                    }
                </div>
                <br />
                {state.images.length > 0 ? <div className="row d-flex justify-content-center" >
                    <button type="button" className="btn btn-danger" onClick={() => {
                        setState(prevState => {
                            return { ...prevState, images: [] }
                        })
                    }} >Clear</button>
                </div> : ''}
                <br />
            </Card>
            <br />
            <Card>




                <div className="sweet-loading d-flex justify-content-center align-items-center">
                    <CircleLoader
                        css={override}
                        size={80}
                        color={"#F89C04"}
                        loading={state.loading || state.save}
                    />
                </div>
                <div>
                    <br />
                    <h4 style={{ paddingLeft: "6%" }}>Enter The Blog Details</h4>
                    <br />
                </div>
                {!state.save ? <div className="d-flex justify-content-center">
                    <div className="col-md-8 col-sm-12">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email" value={state.data.writer} className="form-control" onChange={(e) => paragraphDataChange(e, 'writer')} id="inputEmail4" placeholder="Email" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Category</label>
  
                                    <select  className="form-control"  onChange={(e) => paragraphDataChange(e, 'category')} id="exampleFormControlSelect2">
 {state.category.map((val ,i)=> {

     return <option key={i} value={val.category}> {val.category.split("-").join(" ")}</option>
 })}
    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Title</label>
                                <textarea type="text" value={state.data.title} className="form-control" onChange={(e) => paragraphDataChange(e, 'title')} id="inputAddress" placeholder="Tilte" ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress2">Description</label>
                                <textarea type="text" value={state.data.description} className="form-control" onChange={(e) => paragraphDataChange(e, 'description')} id="inputAddress" placeholder="Description" ></textarea>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="inputAddress2">Image</label>
                                    <input type="file" accept="image/*" onChange={(e) => paragraphImageChange(e, 'image')} className="form-control" id="inputPassword4" placeholder="Image" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputAddress2">Html File</label>
                                    <input type="file" className="form-control" onChange={(e) => htmlAdd(e, 'file')} id="inputPassword4" placeholder="Html File" />
                                </div>
                            </div>
                            <button type="button" onClick={(e) => { e.preventDefault(); setState({ ...state, save: true }) }} className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div> : ''}
                <br />
            </Card>
        </div>
    )
}
