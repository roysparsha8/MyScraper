import {useRef, useEffect} from "react";
const Loader = () => {
    const styleObj = {
        display:"block",
        border:"none",
        width:"100%", height:"100%",
        margin:"0px", padding:"0px",
        boxSizing:"border-box",
        overflow:"hidden",
        backgroundColor:"transparent"
    };
    const ref = useRef(), dpr = window.devicePixelRatio || 1;
    useEffect(() => {
        var width = ref.current.width = ref.current.offsetWidth * dpr, height = ref.current.height = ref.current.offsetHeight * dpr;
        var ctx = ref.current.getContext("2d");
        ctx.fillStyle = "black"; ctx.fillRect(0, 0, width, height);
        ctx.scale(dpr, dpr);
        ctx.translate(width / 2, height / 2);
        var rphase = [0, Math.floor(Math.random() * Math.PI * 2), Math.floor(Math.random() * Math.PI * 2), Math.floor(Math.random() * Math.PI * 2)];
        var t = 0, color = ["rgb(64, 135, 241)", "rgb(81, 241, 75)", "rgb(226, 105, 241)", "rgb(241, 221, 105)"], rotation = [0, Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4];
        let frameId;
        const fillCircle = (x, y, c) => {
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = c;
            ctx.fill();
        };
        const animate = () => {
            for(let i = 0; i < 4; i++) {
                var x = 5 * Math.cos(t + rphase[i]) * Math.cos(rotation[i]) - 4 * Math.sin(t + rphase[i]) * Math.sin(rotation[i]);
                var y = 5 * Math.cos(t + rphase[i]) * Math.sin(rotation[i]) + 4 * Math.sin(t + rphase[i]) * Math.cos(rotation[i]);
                fillCircle(x, y, color[i]);
            }
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(-width / 2, -height / 2, width, height);
            frameId = window.requestAnimationFrame(animate);
        };
        animate();
        return () => {
            if(frameId)
                window.cancelAnimationFrame(frameId);
        }
    }, []);
    return <canvas ref={ref} style={styleObj}></canvas>;
};
export default Loader;