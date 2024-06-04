import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
//다크모드 라이트모드 변환하는 버튼 return
function ThemeSwitcher() {
    const { themeName, toggleTheme } = useContext(ThemeContext);
    return <button onClick={toggleTheme}>{themeName}</button>;
}

export default ThemeSwitcher;
