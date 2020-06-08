import React from 'react';
import Navbar from './containers/navbar/navbar';
import Sidebar from './containers/sidebar/sidebar';
import AddProducts from './containers/pages/add-products/addProducts';
import  AddProductsBlog from './containers/pages/addProdBlog/AddProdBlog';
import {  Route , Switch} from "react-router-dom";

function App() {
  return (
 
    <div className="App">
 <Navbar></Navbar>
	<Sidebar>
  <Switch>

      <Route path="/add-products" component={AddProducts} />
      <Route path="/add-products-blog" component={AddProductsBlog} />
    </Switch>


  </Sidebar>
  <link rel="stylesheet" href="icofont/icofont.min.css"></link>
 <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
 <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </div>

  );
}

export default App;
