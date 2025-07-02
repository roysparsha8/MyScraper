import "./Form.css";
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { TextInput, Password, Submit, FileInput } from './FormInputs';
import { useNavigate } from "react-router-dom";

const Form = ({isImage, width, height}) => {
    const [sep, setSep] = useState(50);
    const [landscape, setLandscape] = useState(true);
    const ref1 = useRef(null), ref2 = useRef(null), ref3 = useRef(null), ref4 = useRef(null);
    const navigate = useNavigate();
    var styleObj = {
        "--width":`${width}%`, "--height":`${height}%`,
        "--item1-width":`${landscape ? (isImage ? sep : 100) : 100}%`, "--item1-height":`${landscape ? 100 : (isImage ? sep : 100)}%`,
        "--item2-width":`${landscape ? 100 - (isImage ? sep : 100) : 100}%`, "--item2-height":`${landscape ? 100 : 100 - (isImage ? sep : 100)}%`,
        "--direction":`${landscape ? "row" : "column-reverse"}`
    };
    function handleMouseMove(e) {
        var rect = ref2.current.getBoundingClientRect();
        Object.assign(ref4.current.style, {
            display:"block",
            left:landscape ? `${e.clientX - rect.left}px` : "0px",
            top:landscape ? "0px" : `${e.clientY - rect.top}px`
        });
    }
    function handleMouseDown(e) {
        if(e.button === 0) {
            var rect = ref3.current.getBoundingClientRect();
            var x = e.clientX - rect.left, y = e.clientY - rect.top;
            if(landscape && x <= rect.width + 2 && x >= rect.width - 2 && y >= 0 && y <= rect.height) {
                window.addEventListener("mouseup", handleMouseUp);
                window.addEventListener("mousemove", handleMouseMove);
            }
            if(!landscape && y <= 2 && y >= -2 && x >= 0 && x <= rect.width) {
                window.addEventListener("mouseup", handleMouseUp);
                window.addEventListener("mousemove", handleMouseMove);
            }
        }
    }
    function handleMouseUp(e) {
        var rect = ref2.current.getBoundingClientRect();
        Object.assign(ref4.current.style, {display:"none"});
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mousemove", handleMouseMove);
        setSep(sep => Math.max(landscape ? (e.clientX - rect.left) * 100 / rect.width : (rect.bottom - e.clientY) * 100 / rect.height, 0));
    }
    function fileToBase64Encode(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const userData = new FormData(ref2.current);
        var obj = Object.fromEntries(userData.entries());
        if(isImage) {
            var fileInput = document.querySelector("input[name=\"fileInput\"]").files[0];
            try {
                obj.fileInput = await fileToBase64Encode(fileInput);
            }
            catch(err) {
                console.log(err);
                return;
            }
        }
        try {
            const res = await fetch("http://localhost:3000/submit", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(obj)
            });
            if(!res.ok)
                throw Error("Network error occured");
            const data = await res.json();
            if(data.err == 2)
                throw Error("Error in processing form response to json web token");
            else if(data.err == 1) {
                window.alert("Get registered first"); // Registration page cannot send error = 1 and login page can
                navigate("/register");
            }
            else
                document.cookie = `scraptoken=${data.token}; path=/`;
        }
        catch(err) {
            console.log(err);
        }
    }
    useLayoutEffect(() => {
        if(ref2.current) {
            const rect = ref2.current.getBoundingClientRect();
            setLandscape(landscape => rect.width >= rect.height);
        }
    }, []);
    useEffect(() => {
        var resizer = new ResizeObserver(([entry]) => {
            const rect = entry.contentRect;
            setLandscape(landscape => rect.width >= rect.height);
        });
        resizer.observe(ref2.current);
        if(isImage) 
            window.addEventListener("mousedown", handleMouseDown);
        return () => {
            resizer.disconnect();
            if(isImage)
                window.removeEventListener("mousedown", handleMouseDown);
        }
    }, []);
    return (
        <form className="form-style" ref={ref2} style={styleObj} onSubmit={handleSubmit}>
            <div ref={ref4} style={{display:"none",position:"absolute",width:landscape?"1px":"100%",height:landscape?"100%":"1px",backgroundColor:"gray",zIndex:999,pointerEvents:"none"}}></div>
            <div className="item1" ref={ref3}>
                <TextInput fname="Name" width={80} height={8} top="auto" left="auto" />
                <TextInput fname="Email" width={80} height={8} top="auto" left="auto" />
                <Password fname="Password" width={80} height={8} top="auto" left="auto" />
                <Submit ref={ref1} width={80} height={8} top="auto" left="auto"> Submit </Submit>
            </div>
            { isImage ? (
                <div className="item2">
                    <FileInput fname="FileInput" width={100} height={100} top="auto" left="auto">Drag and drop file here or Click to browse</FileInput>
                </div>
            ) : null}
        </form>
    );
};
export default Form;