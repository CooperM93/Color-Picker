import chroma from "chroma-js";
import sizes from "./sizes";

export default {
    ColorBox: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "20%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%"
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: "5%"
        },

    },
    lightText: {
        color: props => 
            chroma(props.background).luminance() >= 0.65 ? "black" : "white"
    },
    darkText: {
        color: props => 
            chroma(props.background).luminance() <= 0.09 ? "white" : "black"
    },
    colorName: {
        width: '60%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        position: 'absolute',
        bottom: '8px',
        color: props => 
            chroma(props.background).luminance() <= 0.09 ? "white" : "black"
    },
    colorNum: {
        position: 'absolute',
        bottom: '8px',
        right: '85px',
        whiteSpace: 'nowrap',
        color: props => 
            chroma(props.background).luminance() <= 0.09 ? "white" : "black"
    },
    seeMore: {
        color: props => 
            chroma(props.background).luminance() >= 0.65 ? "black" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase",
        zIndex: 4,
        "&:hover": {
            background: "rgba(255, 255, 255, 0.5)",
            transition: "0.5s"
        }
    },
    copyButton: {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        opacity: "0",
        color: props => 
            chroma(props.background).luminance() >= 0.65 ? "black" : "white",
        "&:hover": {
            background: "rgba(255, 255, 255, 0.5)"
        }
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "100%",
        height: '100%',
        left: "0px",
        bottom: "0px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
    },
    copyOverlay: {
        opacity: "0",
        width: "100%",
        height: "100%",
        zIndex: "0",
        transition: "transform 0.6s ease-in-out"
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMessage: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        opacity: "0",
        display: "flex",
        transform: "scale(0.001)",
        color: "white"
    },
    copyShow: {
        opacity: "1",
        transform: "scaleX(1)",
        zIndex: "25",
        transition: "0.3s ease-in",
        transitionDelay: "0.3s",
        "& h1": {
            fontWeight: "400",
            background: "rgba(255, 255, 255, 0.3)",
            width: "100%",
            textAlign: "center",
            padding: "1rem",
            textTransform: "uppercase",
            [sizes.down("xs")]: {
                fontSize: "4rem"
            }
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100",
        }
    }
}