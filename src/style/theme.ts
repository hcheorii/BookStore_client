export type ThemeName = "light" | "dark"; //테마 이름의 타입
export type ColorKey =
    | "primary"
    | "background"
    | "secondary"
    | "third"
    | "border"
    | "text"; //색깔에 대한 타입
export type HeadingSize = "large" | "medium" | "small";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonScheme = "primary" | "normal";
export type LayoutWidth = "large" | "medium" | "small";

interface Theme {
    name: ThemeName;
    color: {
        [key in ColorKey]: string;
    };
    heading: {
        [key in HeadingSize]: {
            fontSize: string;
        };
    };
    button: {
        [key in ButtonSize]: {
            fontSize: string;
            padding: string;
        };
    };
    buttonScheme: {
        [key in ButtonScheme]: {
            color: string;
            backgroundColor: string;
        };
    };
    borderRadius: {
        default: string;
    };
    layout: {
        width: {
            [key in LayoutWidth]: string;
        };
    };
}

export const light: Theme = {
    name: "light",
    color: {
        primary: "#ff5800",
        background: "lightgrey",
        secondary: "#5F5F5F",
        third: "green",
        border: "grey",
        text: "black",
    },
    heading: {
        large: {
            fontSize: "2rem",
        },
        medium: {
            fontSize: "1.5rem",
        },
        small: {
            fontSize: "1rem",
        },
    },
    button: {
        large: {
            fontSize: "1.5rem",
            padding: "1rem 2rem",
        },
        medium: {
            fontSize: "1rem",
            padding: "0.5rem 1rem",
        },
        small: {
            fontSize: "0.75rem",
            padding: "0.25 rem 0.5rem",
        },
    },
    buttonScheme: {
        primary: {
            color: "white",
            backgroundColor: "midnightblue",
        },
        normal: {
            color: "black",
            backgroundColor: "lightgray",
        },
    },
    borderRadius: {
        default: "4px",
    },
    layout: {
        width: {
            large: "1020px",
            medium: "760px",
            small: "360px",
        },
    },
};

export const dark: Theme = {
    ...light, //위에 heading은 dark건 light건 필요하기 떄문에 복붙보다는 이 연산자 사용
    name: "dark",
    color: {
        primary: "coral",
        background: "midnightblue",
        secondary: "darkblue",
        third: "darkgreen",
        border: "grey",
        text: "black",
    },
};

export const getTheme = (themeName: ThemeName): Theme => {
    switch (themeName) {
        case "light":
            return light;
        case "dark":
            return dark;
    }
};
