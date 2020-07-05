import React, { useState, useEffect } from 'react'

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Card, Input, TextField } from '@material-ui/core';



let paras = [];
const AddNews = () => {
    const [state, setState] = useState({
        noOfParas: 3,
        data :{
            title:'',
            mainImage:'',
            paras: [],
            images: {}
        }
      
    });

    const paraChanged = (e) => {
        console.log(e);
        if (!e) {
            return;
        }
        let length = paras.length > e ? paras.length - e : e - paras.length;
        let addOrSub = paras.length > e ? 1 : 0; // 1 =sub , 0 = add
        for (let i = 0; i < length; i++) {
            if (addOrSub === 0) {
                paras.push(
                    <div className="row">
                        <div className="col-md-5 col-sm-12">

                            <label>Para {paras.length + 1} </label>
                            <br />
                            <TextareaAutosize aria-label="minimum height" rowsMin={4} cols={60} placeholder="Enter The Title" />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <label>Image for Para  {paras.length + 1}</label> <br />
                            <Input type="file"></Input>
                        </div>
                    </div>
                )
            } else {
                paras.pop();
            }

        }
        setState({ ...state, noOfParas: e });
    }
    useEffect(() => {
        paraChanged(3);

    }, [])



    return (
        <Card>
            <div>
                <br />
                <h2 style={{ paddingLeft: "6%" }}>Enter The News</h2>
                <br />
            </div>
            <div  >
                <form style={{ paddingLeft: "10%" }}  noValidate autoComplete="off">
                    <div className="row">
                        <div className="col-md-5 col-sm-12">

                            <label>Title</label>
                            <br />
                            <TextareaAutosize aria-label="minimum height" rowsMin={2} cols={60} placeholder="Enter The Title" />
                        </div>

                        <div className="col-md-3 col-sm-12">
                            <label>Upload Main Image</label> <br />
                            <Input type="file"></Input>
                        </div>
                  
                        <div className="col-md-2 col-sm-12">

                            <label>Enter No Of Paragraphs</label>
                            <br />
                            <TextField id="outlined-basic" placeholder="No Of Paragraphs" defaultValue="3" onChange={(e) => paraChanged(e.target.value)} variant="outlined" />
                        </div>


                    </div>
                    <div>
                <br />
                <h4>Enter The Main Content</h4>
                <br />
            </div>
                    {paras.map((val, i) => {
                        return (
                            <span key={i}>
                                {val}
                            </span>

                        )
                    })}
                    <div className="d-flex justify-content-center" >
                        <button type="button" className="btn btn-secondary">Save</button> 
                        <button style={{marginLeft:"1%"}} type="reset" className="btn btn-danger">Clear</button>
                    </div>
                    <br/>
                </form>
            </div>
        </Card>
    )
}

export default AddNews