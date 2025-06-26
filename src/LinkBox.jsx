import './LinkBox.css';
import { useEffect } from 'react';
/*Inside {} of any div of return, we cannot use statements like if, for and so on. We can just use expressions
like ternary, and other operations like map, filter, arrays of divs and all these*/
const LinkBox = (props) => {
    let content = null;
    if(props.links.length) {
        var links = props.links;
        content = links.map((item, index) => (
            <a href={item.url} className="ui-custom-link" key={index} target="_blank" rel="noopener noreferrer"> 
                <img className="ui-custom-link-image" src={item.icoSrc} alt="NA"/>
                <div className="ui-custom-link-name">{item.ptitle}</div>
            </a>
        ));
    }
    useEffect(() => {
        if(props.links.length) {
            document.querySelector(".blur-wrapper").style.setProperty("--var", "5px");
            document.querySelectorAll("button").forEach(btn => btn.disabled = true);
        }
        else {
            document.querySelector(".blur-wrapper").style.setProperty("--var", "0px");
            document.querySelectorAll("button").forEach(btn => btn.disabled = false);
        }
    }, [props.links])
    return <div className={(props.links.length)?'link-box-style':'no-display-class'}>{content}</div>;
};
export default LinkBox;