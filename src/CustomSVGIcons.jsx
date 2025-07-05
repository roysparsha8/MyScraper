export const Eye = ({ opened, aspectRatio }) => {
    var x = 100 * (1 / (1 + (1 / aspectRatio))), y = 100 * (1 / (aspectRatio + 1));
    return (
        <svg viewBox={`0 0 ${x} ${y}`} width="100%" height="100%" preserveAspectRatio="none" style={{display:"block", backgroundColor:"transparent"}}>
            <ellipse cx={x / 2} cy={y / 2} rx={x / 2} ry={y / 4} stroke="none" fill="white" />
            <circle cx={x / 2} cy={y / 2} r={y / 4} stroke="none" fill="gray" />
            <circle cx={x / 2} cy={y / 2} r={y / 8} stroke="none" fill="black" />
            { !opened ? <line x1="0" y1={y} x2={x} y2="0" stroke="green" strokeWidth="3" /> : null }
        </svg>
    );
};