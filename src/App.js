import React from 'react';
import Navbar from './containers/navbar/navbar';
import Sidebar from './containers/sidebar/sidebar';
import AddProducts from './containers/pages/add-products/addProducts';
import AddNews from './containers/pages/add-news/AddNews';
import {  Route , Switch} from "react-router-dom";
import { AddBlog } from './containers/pages/add-blog/AddBlog';
import { Backlinks } from './containers/pages/request-backlinks/Backlinks';

function App() {
  return (
 
    <div className="App">
 <Navbar></Navbar>
	<Sidebar>
  <Switch>

      <Route path="/add-products" component={AddProducts} />
      <Route path="/add-news" component={AddNews} />
      <Route path="/add-blog" component={AddBlog} />
      <Route path="/Mail" component={Backlinks} />
    </Switch>


  </Sidebar>
  <link rel="stylesheet" href="icofont/icofont.min.css"></link>
 <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
 <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
 <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
    </div>

  );
}

export default App;
