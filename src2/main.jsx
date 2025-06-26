import React from 'react';
import ReactDOM from 'react-dom/client'; // A TypeScript file
import './index.css'; // Javascript natively don't support importing .css file in .js(No visible changes can be encountered).
// The above line 'import './index.css'' is compiled by Vite bundler to bundle .css file(The Bundler under the hood creates 
// a seperate css file and links it with link tag in html).
import App from './App.jsx';

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);