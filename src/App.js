import React from 'react';
import Navbar from './containers/navbar/navbar';
import Sidebar from './containers/sidebar/sidebar';
import AddProducts from './containers/pages/add-products/addProducts';

function App() {
  return (
    <div className="App">
 <Navbar></Navbar>
	<Sidebar>
<AddProducts>

</AddProducts>

  </Sidebar>
  
 <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
 <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </div>
  );
}

export default App;
