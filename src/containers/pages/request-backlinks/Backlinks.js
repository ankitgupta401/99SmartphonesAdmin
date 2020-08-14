import React from 'react'
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

export const Backlinks = () => {
    const [loading, setLoading] = React.useState(false);
    const handleFileUpload = (e) => {
       
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        console.log(formData.has('file'));
        setLoading(true);
        axios({
            method: 'post',
            url: 'send_email_for_backlinks',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            setLoading(false);
            if (res.data.code == 0) {
                if(res.data.result.length > 0){
                    let errors = '';
             
                    for(let i=0; i<  res.data.result.length;i++){
                        errors +=  res.data.result[i] + '<br/>';
                    }
                     Swal.fire( res.data.msg, errors, 'warning')
                } else {

                    Swal.fire('Success', res.data.msg, 'success')
                }
            } else {
                let errors = '';
             
               for(let i=0; i<  res.data.result.length;i++){
                   errors +=  res.data.result[i] + '\n';
               }
                Swal.fire( res.data.msg, errors, 'error')
            }
        })
    }



    return (
        <div>

            <Card>
                <div>
                    <br />
                    <h4 style={{ paddingLeft: "6%" }}>Mail Page</h4>
                    <br />
                </div>
                <div className="sweet-loading d-flex justify-content-center align-items-center">
                    <CircleLoader
                        css={override}
                        size={80}
                        color={"#F89C04"}
                        loading={loading}
                    />
                </div>
                <br />
                <br />
                <div className="container">
                    <div className="col-md-6">
                        <div className="row">
                            <h5>For Backlinks Request</h5>
                        </div>
                        <div className="row">


                            <div className="col-md-4">
                                <label>
                                    Download Excel Format:
                                     <br />
                                    <button type="button" onClick={() => { window.location.href = "http://localhost:3000/mail/file.xls"; }}>Download</button>
                                </label>
                                {/* https://blog.99smartphones.in/mail/file.xls */}
                            </div>
                            <div className="col-md-4">
                                <label>
                                    Upload Excel For Backlinks:
                <input type="file" onChange={handleFileUpload} accept="application/vnd.ms-excel"></input>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
