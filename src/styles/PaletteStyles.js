import sizes from './sizes';

export default {
    Palette: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    PaletteColors: {
        height: "90%",
        width: "100vw",
        overflow: "hidden"
    },
    PaletteFooter: {
        backgroundColor: "white",
        height: "5vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        fontWeight: "bold"
    },
    emoji: {
        fontSize: "1.5rem",
        margin: "0 1rem"
    },
    backBox: {
        backgroundColor: "rgb(100, 100, 100)",
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
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
            height: "10%"
        },
    },
    backButton: {
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
        color: "white",
        opacity: "1",
        "&:hover": {
            background: "rgba(255, 255, 255, 0.5)"
        }
    },
    SingleColorBox: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s"
        }
    }
}
