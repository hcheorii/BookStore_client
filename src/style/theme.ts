export type ThemeName = "light" | "dark"; //테마 이름의 타입
type ColorKey = "primary" | "background" | "secondary" | "third"; //색깔에 대한 타입

interface Theme {
    name: ThemeName;
    color: {
        [key in ColorKey]: string;
    };
}

export const light: Theme = {
    name: "light",
    color: {
        primary: "brown",
        background: "lightgrey",
        secondary: "blue",
        third: "green",
    },
};

export const dark: Theme = {
    name: "dark",
    color: {
        primary: "coral",
        background: "midnightblue",
        secondary: "darkblue",
        third: "darkgreen",
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
