import React from'react';

const ListView = (props) => {
    const specList = props.data.categorySpecificInfoV1.specificationList;
    const find_fields = (specList, parent_field, field) => {
      let found_field = "";
      for (let i = 0; i < specList.length; i++) {
        if (specList[i].key === parent_field) {
          for (let j = 0; j < specList[i].values.length; j++) {
            if (specList[i].values[j].key === field) {
              found_field = specList[i].values[j].value.join(" , ");
              break;
            }
          }
        }
      }
  
      return found_field;
    };
  
    return (
      <div>
        <div className="blog-list-header" id={props.data.productBaseInfoV1.title}>
          <h2>
            <label>{props.index}</label>
            <strong>{props.data.productBaseInfoV1.title}</strong>
          </h2>
        </div>
        <div className="property-div">
          <div style={{ margin: "auto" }}>
            <img
              className="img-fluid main-img"
              src={props.data.productBaseInfoV1.imageUrls["400x400"]}
              alt="true"
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",margin:"10px" }}>
            <div className="property-div">
              <img
                className="img-fluid property-img"
                src="/images/002-smartphone.png"
                alt="true"
              />
              <div>
                <p>SCREEN SIZE</p>
                <p>
                  <strong>
                    {" "}
                    {find_fields(
                      specList,
                      "Display Features",
                      "Display Size"
                    )}{" "}
                    <br />
                    {find_fields(specList, "Display Features", "Resolution")}
                  </strong>
                </p>
              </div>
            </div>
            <div className="property-div">
              <img
                className="img-fluid property-img"
                src="/images/003-photo-camera.png"
                alt="true"
              />
              <div>
                <p>CAMERA</p>
                <p>
                  <strong>
                    {find_fields(specList, "Camera Features", "Primary Camera")}{" "}
                    <br />
                    {find_fields(
                      specList,
                      "Camera Features",
                      "Secondary Camera"
                    )}{" "}
                  </strong>
                </p>
              </div>
            </div>
            <div className="property-div">
              <img
                className="img-fluid property-img"
                src="/images/007-ram.png"
                alt="true"
              />
              <div>
                <p>RAM</p>
                <p>
                  <strong>
                    {find_fields(specList, "Memory & Storage Features", "RAM")}
                  </strong>
                </p>
              </div>
            </div>
            <div className="property-div">
              <img
                className="img-fluid property-img"
                src="/images/009-battery.png"
                alt="true"
              />
              <div>
                <p>BATTERY</p>
                <p>
                  <strong>
                    {find_fields(
                      specList,
                      "Battery & Power Features",
                      "Battery Capacity"
                    )}
                  </strong>
                </p>
              </div>
            </div>
            <div className="property-div">
              <img
                className="img-fluid property-img"
                src="/images/cellphone.png"
                alt="true"
              />
              <div>
                <p>SOC</p>
                <p>
                  <strong>{props.data.custom_fields.processor}</strong>
                </p>
              </div>
            </div>
            {/* <div className="full-details">
              <Link
                href="/products/[pid]"
                as={"/products/" + props.data.custom_fields.link}
              >
                <span>Full Details</span>
              </Link>
            </div> */}
          </div>
        </div>
        <div style={{display:"flex"}}>
          <div className="col-6">
          <br/>
            <h5>
              Price:{" "}
              {"Rs. " + props.data.productBaseInfoV1.flipkartSpecialPrice.amount}
            </h5>
          </div>
     <br/>
        </div>
        <div className="desc-div">
          <p>{props.data.productBaseInfoV1.productDescription}</p>
        </div>
        <div className="spec-div">
          <h4>
            <strong>SPECIFICATION</strong>
          </h4>
          <div>
            <div>
              <ul>
                {props.data.categorySpecificInfoV1.detailedSpecs.map((val, i) => {
                  return <li key={i}>{val} </li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ListView;
  