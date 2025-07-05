import Form from "./Form";

const Auth = ({type}) => {
    const styleObj = {
        width:"100%", height:"100%",
        margin:"0px", padding:"0px",
        overflow:"hidden",
        backgroundColor:"rgb(46, 45, 45)"
    };
    return <div style={styleObj}><Form isImage={type == "register"} width={74} height={68} /></div>
};
export default Auth;