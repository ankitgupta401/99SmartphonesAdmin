
import React, { useState } from 'react'
import { Card } from '@material-ui/core'
import axios from '../../../axios-url';
import Swal from 'sweetalert2';
import CircleLoader from "react-spinners/CircleLoader";
import ListView from '../../../components/ListView';
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const MainBlog = () => {




    const paragraphDataChange = (data, place) => {
        let val = data.target.value;
        setState(prevState => {

            let temp = { ...prevState };
            temp.data = { ...prevState.data };
            temp.data[place] = val
            return temp
        });

    }


    const paragraphDataChange2 = (data, place) => {
        let val = data.target.value;
        setState(prevState => {

            let temp = { ...prevState };
            temp[place] = val
            return temp
        });

    }

    const paragraphImageChange = (e, place) => {
        setState((prevState) => { return { ...prevState, loading: true } });

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


    const handleSubmit2 = (e) => {
        e.preventDefault()
        let error = false
        if (!state.query) {
            Swal.fire('All Fields Are Required', 'Please Fill in All The Data', 'error')
        } else {
            let dataToTransfer = { ...state }
            try {
                dataToTransfer.query = JSON.parse(state.query);

            } catch (err) {
                error = true
                Swal.fire('Invalid Json', 'Please Make Sure You Have Entered Valid Json In The Query Field', 'error')
            }
            try {

                dataToTransfer.sort = JSON.parse(state.sort);
            } catch (err) {
                error = true
                Swal.fire('Invalid Json', 'Please Make Sure You Have Entered Valid Json In The Sort Field', 'error')
            }

            if (!error) {
                setState(prevState => {
                    return { ...prevState, loading: true }
                })
                dataToTransfer.query = JSON.stringify(dataToTransfer.query)
                dataToTransfer.sort = JSON.stringify(dataToTransfer.sort)
                axios.post("check_query_and_sort", { sort: dataToTransfer.sort, query: dataToTransfer.query, no_of_products: dataToTransfer.no_of_products }).then(res => {
                    setState(prevState => {
                        return { ...prevState, loading: false }
                    })
                    if (res.data.code === 0) {
                        setState(prevState => {
                            return { ...prevState, list: res.data.result }
                        })
                    } else {
                        Swal.fire('Failed To Fetch', res.data.msg, 'error')
                    }
                })
            }
        }
    }
    const handleSubmit = (e) => {

        e.preventDefault()
        let error = false
        if (!state.data.title || !state.data.description
            || !state.data.image
            || !state.data.no_of_products || !state.data.query) {
            Swal.fire('All Fields Are Required', 'Please Fill in All The Data', 'error')
        } else {
            let dataToTransfer = { ...state.data }
            try {
                dataToTransfer.query = JSON.parse(dataToTransfer.query);

            } catch (err) {
                error = true
                Swal.fire('Invalid Json', 'Please Make Sure You Have Entered Valid Json In The Query Field', 'error')
            }
            try {

                dataToTransfer.sort = JSON.parse(dataToTransfer.sort);
            } catch (err) {
                error = true
                Swal.fire('Invalid Json', 'Please Make Sure You Have Entered Valid Json In The Sort Field', 'error')
            }

            if (!error) {
                setState(prevState => {
                    return { ...prevState, loading: true }
                })
                axios.post("save_post_main_blog", dataToTransfer).then(res => {
                    if (res.data.code === 0) {
                        Swal.fire('Saved', 'Saved Successfully', 'success')
                        setState(prevState => {
                            return {
                                data: {
                                    author_name: '',
                                    description: '',
                                    image: '',
                                    deleted: false,
                                    title: '',
                                    sort: '',
                                    query: '',
                                    no_of_products: 5
                                },
                                sort: '',
                                query: '',
                                no_of_products: 5,
                                list: [],

                                loading: false,
                            }
                        })


                    } else {
                        setState(prevState => {
                            return { ...prevState, loading: false }
                        })
                        Swal.fire('Failed To Save', res.data.msg, 'error')
                    }
                })
            }

        }


    }


    const [state, setState] = useState({
        data: {
            author_name: '',
            description: '',
            image: '',
            deleted: false,
            title: '',
            sort: '',
            query: '',
            no_of_products: 5
        },
        sort: '',
        query: '',
        no_of_products: 5,
        list: [],
        loading: false,


    })

    return (
        <div>
            <div>
                <Card>
                    <div className="sweet-loading d-flex justify-content-center align-items-center">
                        <CircleLoader
                            css={override}
                            size={80}
                            color={"#F89C04"}
                            loading={state.loading}
                        />
                    </div>


                </Card>
                <br />


                <Card>
                <div>
                        <br />
                        <h4 style={{ paddingLeft: "6%" }}>Check Query And Sorting</h4>
                        <br />
                    </div>
                    <div className="container">
                        <form onSubmit={handleSubmit2} >

                            <div className="row">

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">No. Of Products</label>

                                    <input type="number" className="form-control" value={state.no_of_products} onChange={(e) => paragraphDataChange2(e, 'no_of_products')} id="exampleFormControlSelect2" placeholder="No Of Products" />

                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputAddress2">Query</label>
                                    <input type="text" value={state.query} className="form-control" onChange={(e) => paragraphDataChange2(e, 'query')} id="inputEmail4" placeholder="Query" />
                                </div>

                                <div className="form-group col-md-12">
                                    <label htmlFor="inputAddress2">Sort</label>
                                    <input type="text" value={state.sort} className="form-control" onChange={(e) => paragraphDataChange2(e, 'sort')} id="inputEmail4" placeholder="Sort" />
                                </div>
                                <div style={{ paddingLeft: "50%" }}>
                                    <button type="submit" className="btn btn-primary">Search</button>
                                </div>

                            </div>
                        </form>
                       
                    </div>
                    <br />  <br />
                </Card>
                <br />
                <div className="d-flex justify-content-center">
                <div className="col-md-8">
                            {state.list.map((val, i) => {
                                return (<><Card key={i}>
                                    <div className="container"> <ListView data={val} index={i + 1} /></div>
                                 <br /> <br />
                                </Card>  <br /><br /></>)
                            })}
                        </div>
                        </div>
                        <br />
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
                        <br />
                        <h4 style={{ paddingLeft: "6%" }}>Enter The Main Page Blog Details</h4>
                        <br />
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="col-md-8 col-sm-12">
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">Writer Name</label>
                                        <input type="text" value={state.data.author_name} className="form-control" onChange={(e) => paragraphDataChange(e, 'author_name')} id="inputEmail4" placeholder="Writer Name" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">No. Of Products</label>

                                        <input type="number" className="form-control" value={state.data.no_of_products} onChange={(e) => paragraphDataChange(e, 'no_of_products')} id="exampleFormControlSelect2" placeholder="No Of Products" />

                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputPassword4">Title</label>

                                        <input className="form-control" value={state.data.title} onChange={(e) => paragraphDataChange(e, 'title')} id="exampleFormControlSelect2" placeholder="Title" />

                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputAddress2">Description</label>
                                    <textarea type="text" value={state.data.description} className="form-control" onChange={(e) => paragraphDataChange(e, 'description')} id="inputAddress" placeholder="Description" ></textarea>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputAddress2">Query</label>
                                        <input type="text" value={state.data.query} className="form-control" onChange={(e) => paragraphDataChange(e, 'query')} id="inputEmail4" placeholder="Query" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="inputAddress2">Sort</label>
                                        <input type="text" value={state.data.sort} className="form-control" onChange={(e) => paragraphDataChange(e, 'sort')} id="inputEmail4" placeholder="Sort" />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputAddress2">Image</label>
                                        <input type="file" accept="image/*" onChange={(e) => paragraphImageChange(e, 'image')} className="form-control" id="inputPassword4" placeholder="Image" />
                                    </div>


                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                    </div>
                    <br />
                </Card>
            </div>
        </div>
    )
}
