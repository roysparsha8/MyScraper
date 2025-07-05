import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import Auth from "./Authentication";
import Home from "./Home";
import Loader from "./Loader"
import { Navigate } from "react-router-dom";

const ProtectRoute = () => {
    const [content, setContent] = useState(<Loader count={20}/>);
    function parseToken(cookie) {
        var fieldValPairs = cookie.split("; ");
        var token = "";
        for(const fieldVal of fieldValPairs) {
            if(fieldVal.startsWith("scraptoken")) {
                token = fieldVal.split("=")[1];
                break;
            }
        }
        return token;
    }
    useEffect(() => {
        fetch(`http://localhost:3000/authenticate?token=${parseToken(document.cookie)}`)
        .then(res => res.json())
        .then(data => {
            if(data.err == 0)
                setContent(content => <Home/>);
            else
                setContent(content => <Navigate to="/login" replace={true}/>);
        })
        .catch(err => console.log("Err: ", err));
    }, []);
    return content;
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Auth type="login"/>}/>
                <Route path="/register" element={<Auth type="register"/>}/>
                <Route path="/" element={<ProtectRoute/>} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;