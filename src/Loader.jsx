import {useRef, useEffect} from "react";
const Loader = ({count}) => {
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
        var rphase = [], rotation = [], color = [];
        for(let i = 0; i < count; i++) {
            var r = Math.random();
            rphase.push(Math.floor(r * 2 * Math.PI));
            rotation.push(i * Math.PI / count);
            color.push(`hsl(${Math.floor(r * 360)}, 90%, 50%)`);
        }
        var t = 0;
        let frameId;
        const fillCircle = (x, y, c) => {
            ctx.beginPath();
            ctx.shadowColor = c, ctx.shadowBlur = 8; 
            ctx.arc(x, y, 12, 0, 2 * Math.PI);
            ctx.fillStyle = c;
            ctx.fill();
            ctx.shadowColor = "transparent", ctx.shadowBlur = 0;
        };
        const animate = () => {
            for(let i = 0; i < count; i++) {
                var x = 200 * Math.cos(t + rphase[i]) * Math.cos(rotation[i]) - 100 * Math.sin(t + rphase[i]) * Math.sin(rotation[i]);
                var y = 200 * Math.cos(t + rphase[i]) * Math.sin(rotation[i]) + 100 * Math.sin(t + rphase[i]) * Math.cos(rotation[i]);
                fillCircle(x, y, color[i % color.length]);
            }
            
            ctx.fillStyle = "rgba(0,0,0,0.08)";
            ctx.fillRect(-width / 2, -height / 2, width, height);
            frameId = window.requestAnimationFrame(animate);
            t += 0.05;
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