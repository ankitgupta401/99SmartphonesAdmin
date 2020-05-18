import React from 'react'
import Card from '../../card/card';
import Typography from '@material-ui/core/Typography';
import Carousal from '../../carousal/carousal';
const addProducts = () => {
 
  return (
    <div>
      <Card>
      <Typography gutterBottom variant="h5" component="h2">
            Add Products
            <br />
          </Typography>

          <Typography variant="body2" component="p">
            <div className= "d-flex justify-content-center"> 
            <div >
          <Carousal></Carousal>
            </div>
            </div>
        </Typography>
      </Card>
    </div>
  )
}

export default addProducts;
