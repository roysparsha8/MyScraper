import "./FormInputs.css";
import { Eye } from "./CustomSVGICONS";
import { useState, useEffect, useRef } from 'react';

function getCSSVarObject(height, width, top, left) {
    return {
        "--font-size":`${height * 0.8}`,
        "--width":width == "auto" ? "auto" : `${width}%`,
        "--height": height == "auto" ? "auto" : `${height}%`,
        "--top": top == "auto" ? "auto" : `${top}%`,
        "--left": left == "auto" ? "auto" : `${left}`
    };
}

export const TextInput = ({fname, width, height, top, left}) => {
    var inputId = fname + "Id";
    return (
        <div className="text-input-group" style={getCSSVarObject(height, width, top, left)}>
            <input name={fname} id={inputId} type="text" placeholder=" "/>
            <label htmlFor={inputId}>{fname[0].toUpperCase() + fname.slice(1).toLowerCase()}</label>
        </div>
    );
};

export const Password = ({fname, width, height, top, left}) => {
    const inputId = fname + "Id";
    const [type, setType] = useState("password");
    const handleType = (e) => {
        e.preventDefault();
        setType(type => type == "password" ? "text" : "password");
    };
    return (
        <div className="password-input-group" style={getCSSVarObject(height, width, top, left)}>
            <input name={fname} id={inputId} type={type} placeholder=" " />
            <label htmlFor={inputId}>{fname[0].toUpperCase() + fname.slice(1).toLowerCase()}</label>
            <button onClick={handleType}><Eye opened={type === "password"} aspectRatio={1} /></button>
        </div>
    );
};

export const Submit = ({ref, width, height, top, left, children}) => {
    return (
        <button ref={ref} type="submit" className="submit-button" style={getCSSVarObject(height, width, top, left)}>{children}</button>
    );
};

export const FileInput = ({fname, width, height, top, left, children}) => {
    const [file, setFile] = useState(null);
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files; // Files passed through drop event is transferred through dataTransfer object
        if(droppedFiles.length > 0 && droppedFiles[0].type.startsWith("image/")) 
            setFile(file => droppedFiles[0]);
    };
    const handleDragOver = e => e.preventDefault(); // This function allows file dropping by preventing default 
    // behavior of dragover event.
    const handleClick = (e) => {
        e.preventDefault();
        document.querySelector(`input[name="${fname}"]`).click();
    }
    useEffect(() => {
        if(file) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.querySelector(`input[name="${fname}"]`).files = dataTransfer.files;
        }
    }, [file, fname]);
    return (
        <div className="drag-drop-click-file" onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleClick} style={getCSSVarObject(height, width, top, left)}>
            <p>{children}</p>
            <img src={file ? URL.createObjectURL(file) : null} alt="none" style={file ? {display:"block",width:"100%",height:"100%"} : {display:"none"}} />
            <input name={fname} type="file" style={{display:"none"}} />
        </div>
    );
};