import sizes from './sizes';

export default {
    NavBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh"
    },
    logo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "20px",
        backgroundColor: "#eceff1",
        fontFamily: "Roboto",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& a": {
            textDecoration: "none",
            color: "black"
        },
        [sizes.down("xs")]: {
            display: 'none'
        }
    },
    slider: {
        width: "275px",
        margin: "0 10px",
        display: "inline-block",
        "& .rc-slider-track": {
            display: "none",
            backgroundColor: "transparent"
        },
        "& .rc-slider-rail": {
            backgroundColor: "black",
            height: "5px"
        },
        "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover": {
            backgroundColor: "white",
            outline: "none",
            border: "2px solid black",
            boxShadow: "none",
            height: "15px",
            width: "15px",
            marginTop: "-5px"
        },
        [sizes.down("sm")]: {
            width: '175px'
        },
        [sizes.down("xs")]: {
            width: '100px'
        }
    },
    selectContainer: { 
        marginLeft: "auto",
        marginRight: "1rem"
    }
};
