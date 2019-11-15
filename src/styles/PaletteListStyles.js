import sizes from "./sizes";
import bg from "./bg.svg";

export default {
    "@global": {
        '.item-enter': {
            opacity: 0
        },
        '.item-enter-active': {
            opacity: 1,
            transition: 'opacity 500ms ease-in'
        },
        '.item-exit': {
            opacity: 1
        },
        '.item-exit-active': {
            opacity: 0,
            transition: 'opacity 500ms ease-in'
        }
    },
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        /* background by SVGBackgrounds.com */
        backgroundColor: '#212121',
        backgroundImage: `url(${bg})`,
        overflow: 'scroll',
        "& h1": {
            fontSize: '2rem'
        }
    },
    container: {
        width: "75%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("xs")]: {
            width: '60%'
        },
        paddingBottom: '2.5rem'
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        margin: '10px 0',
        "& a": {
            textDecoration: "none",
            color: "white",
            border: "white 4",
            marginRight: "5px"
        }
    },
    title: {
        marginTop: "10px",
        color: "white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(4, 22.5%)",
        gridGap: "2.5rem",
        [sizes.down("lg")]: {
            gridTemplateColumns: "repeat(3, 30%)",
        },
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 45%)",
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 90%)",
        }
    },
    button: {
        color: 'white',
        borderColor: 'white'
    }
}
