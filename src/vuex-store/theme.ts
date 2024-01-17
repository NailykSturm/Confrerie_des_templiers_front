import { ref } from "vue";

import daisyui_themes from "../assets/daisyui_themes.ts";

const list_themes = daisyui_themes;
const theme = ref(list_themes.dark[0]);

const changeTheme = (newTheme: string) => {
  if (daisyui_themes.dark.includes(newTheme) || daisyui_themes.light.includes(newTheme)) theme.value = newTheme;
};

export { theme, list_themes, changeTheme };
