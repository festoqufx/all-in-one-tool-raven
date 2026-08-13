import { THEME_STORAGE_KEY } from "@/lib/theme";

const themeBootScript = `(function(){try{var stored=localStorage.getItem("${THEME_STORAGE_KEY}");var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var isDark=stored==="dark"||((stored!=="light")&&prefersDark);document.documentElement.classList.toggle("dark",isDark);document.documentElement.style.colorScheme=isDark?"dark":"light";}catch(e){}})();`;

export function ThemeScript() {
  return (
    <script
      id="theme-boot"
      dangerouslySetInnerHTML={{ __html: themeBootScript }}
    />
  );
}
