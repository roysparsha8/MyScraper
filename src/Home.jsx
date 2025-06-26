import "./Home.css";
import { useRef, useEffect, useState } from "react";
import Typed from "typed.js";
import LinkBox from "./LinkBox.jsx";

const Home = () => {
    const ref1 = useRef(null), ref2 = useRef(null), ref3 = useRef(null), ref4 = useRef(null);
    const [count, setCount] = useState(1);
    const [links, setLinks] = useState([]);
    function sendQuery(e) {
        e.preventDefault(); // Note : error handler of fetch which is second argument of then, just handles network
        // error and nothing else. To handle bad http request or something like that, we need to manually use catch throw
        fetch(`http://localhost:5001/pagelinks?url=${encodeURIComponent(ref1.current.value)}&search=${encodeURIComponent(ref2.current.value)}&count=${encodeURIComponent(ref4.current.innerText)}`)
        .then(resp => {
            if(!resp.ok)
                throw new Error("Response was not okay");
            return resp.json(); // This returns a valid javascript object;
        },
        error => console.log(error))
        .then(data => {
            if(data != null) {
                setLinks(links => data.scrapLinks);
                console.log("Parsed data is: ", links);
            }
        });
    }
    useEffect(() => {
            var typed = new Typed(ref3.current, { 
                strings:["Hey there, What to scrap today"],
                typeSpeed:10, // 10ms for each character
                backSpeed:0,
                showCursor:true,
                cursorChar:'▌',
                loop:false
            });
            const handleEscape = (ev) => {
                if(ev.key === "Escape") 
                    setLinks(links => []);
            }
            window.addEventListener("keydown", handleEscape);
            return () => {
                typed.destroy();
                window.removeEventListener("keydown", handleEscape); 
            };
        }, []
    );
    return (
        <>
            <LinkBox links={links}></LinkBox>
            <div className="blur-wrapper">
                <div className="typer-wrap"><span className="typertext" ref={ref3}></span></div>
                <div className="target">
                    <div className="item1"><textarea placeholder="Enter target url...." ref={ref1}></textarea></div>
                    <div className="item4"><p className="ui-custom-text" ref={ref4}>{count}</p></div>
                    <div className="item2"><button className="ui-custom-button" style={{"--color":"red"}} onClick={sendQuery}> Trigger </button></div>
                    <div className="item3"><textarea placeholder="Enter what you want to find...." ref={ref2}></textarea></div>
                    <div className="item5"><button className="ui-custom-button" style={{"--color":"blue"}} onClick={() => { setCount(count => Math.min(count + 1, 6)); }}> ⮝ </button></div>
                    <div className="item6"><button className="ui-custom-button" style={{"--color":"blue"}} onClick={() => { setCount(count => Math.max(count - 1, 0)); }}> ⮟ </button></div>
                </div>
            </div>
        </>
    );
};
export default Home;