import "./FormInputs.css";
import { Eye } from "./CustomSVGIcons";
import { useState, useEffect, useRef } from 'react';

export const TextInput = ({fname}) => {
    var inputId = fname + "Id";
    return (
        <div className="text-input-group">
            <input name={fname} id={inputId} type="text" placeholder=" " required={true}/>
            <label htmlFor={inputId}>{fname[0].toUpperCase() + fname.slice(1).toLowerCase()}</label>
        </div>
    );
};

export const Password = ({fname}) => {
    const inputId = fname + "Id";
    const [type, setType] = useState("password");
    const handleType = (e) => {
        e.preventDefault();
        setType(type === "password" ? "text" : "password");
    };
    return (
        <div className="password-input-group">
            <input name={fname} id={inputId} type={type} placeholder=" " required={true}/>
            <label htmlFor={inputId}>{fname[0].toUpperCase() + fname.slice(1).toLowerCase()}</label>
            <button onClick={handleType}><Eye opened={type === "password"} aspectRatio={1} /></button>
        </div>
    );
};

export const Submit = ({ref, children}) => {
    return (
        <button ref={ref} type="submit" className="submit-button">{children}</button>
    );
};

export const FileInput = ({fname, children}) => {
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
        <div className="drag-drop-click-file" onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleClick}>
            <p>{children}</p>
            <img src={file ? URL.createObjectURL(file) : null} alt="none" style={file ? {display:"block",width:"100%",height:"100%"} : {display:"none"}} />
            <input name={fname} type="file" style={{display:"none"}} required={true}/>
        </div>
    );
};