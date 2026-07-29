import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { CN } from "../../utils/helper";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle:React.FC<ThemeToggleProps> = ({
  className,
}) => {
   const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={CN(
        "flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
        className,
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}

export default ThemeToggle;
