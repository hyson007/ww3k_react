import "./App.css";
import Main from "./components/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteBook from "./components/NoteBook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
        <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notebook" element={<NoteBook />} />
      </Routes>
    </Router>
    <ToastContainer />
    </>

  );
}

export default App;

// import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // minified version is also included
// // import 'react-toastify/dist/ReactToastify.min.css';

// class App extends Component {
//   notify = () => toast("Wow so easy !");

//   render(){
//     return (
//       <div>
//       <button onClick={this.notify}>Notify !</button>
//         <ToastContainer />
//       </div>
//     );
//   }
// }

// export default App;