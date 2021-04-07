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
const baseUrl = require("../../../cred.json").baseUrl;
export const Backlinks = () => {
   
    const [loading, setLoading] = React.useState(false);
    const handleFileUpload = (e) => {
       if(!e.target.files[0]){
           return;
       }
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
          
            if (res.data.code === 0) {
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


const handleFileUploadBroken =(e) => {
    if(!e.target.files[0]){
        return;
    }
     let formData = new FormData();
     formData.append('file', e.target.files[0]);
     console.log(formData.has('file'));
     setLoading(true);
     axios({
         method: 'post',
         url: 'send_email_for_broken_links',
         data: formData,
         headers: { 'Content-Type': 'multipart/form-data' }
     }).then(res => {
         setLoading(false);
       
         if (res.data.code === 0) {
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
                    <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <h5>For Backlinks Request</h5>
                        </div>
                        <div className="row">


                            <div className="col-md-4">
                                <label>
                                    Download Excel Format:
                                     <br />
                                    <button type="button" onClick={() => { window.location.href = baseUrl+"/mail/file_back_link.xls"; }}>Download</button>
                                </label>
                                {/*baseUrl+ /mail/file.xls */}
                                {/* http://localhost:3000/mail/file.xls */}
                            </div>
                            <div className="col-md-4">
                                <label>
                                    Upload Excel:
                <input type="file" onClick={e => (e.target.value = null)} onChange={handleFileUpload} accept="application/vnd.ms-excel"></input>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="row">
                            <h5>For Broken Links Request</h5>
                        </div>
                        <div className="row">


                            <div className="col-md-4">
                                <label>
                                    Download Excel Format:
                                     <br />
                                    <button type="button" onClick={() => { window.location.href = baseUrl+"/mail/file_broken_link.xls"; }}>Download</button>
                                </label>
                                {/*baseUrl+ /mail/file.xls */}
                                {/* http://localhost:3000/mail/file.xls */}
                            </div>
                            <div className="col-md-4">
                                <label>
                                    Upload Excel:
                <input type="file" onClick={e => (e.target.value = null)} onChange={handleFileUploadBroken} accept="application/vnd.ms-excel"></input>
                                </label>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </Card>
        </div>
    )
}
