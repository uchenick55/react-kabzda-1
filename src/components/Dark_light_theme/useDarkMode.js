import { useEffect, useState } from "react";

// пользовательский хук
export const useDarkMode = () => {
  // 1) задаем локальный хук themeLocal с его функцией обновления setThemeLocal
  // изначально задана светлая тема
  const [themeLocal, setThemeLocal] = useState("light");

  // функция вызывается после вызова переключателя themeToggler извне
  const setMode = (mode) => {
    // заносим значение темы в локальное хранилище
    window.localStorage.setItem("theme", mode);
    // и задаем значение theme в локальный хук themeLocal
    setThemeLocal(mode);
  };
  const themeToggler = () => {
    // 3) это функция переключатель между темами, вызывается как колбек извне
    // мы вызываем setMode с противоположным значением theme
    themeLocal === "light" ? setMode("dark") : setMode("light");
    //
  };
  useEffect(() => {
    // 2) после рендера компоненты
    const themeFromLocalStorage = window.localStorage.getItem("theme");
    // получить значение theme из локального хранилища
    themeFromLocalStorage && setThemeLocal(themeFromLocalStorage);
    // если "theme" в локальном хранилище существует, то
    //мы его заносим в хук themeLocal через setThemeLocal
  }, []);
  return [themeLocal, themeToggler]; // возвращаем themeLocal - тему из локального хранилища
  // а так же themeToggler - сереключатель на другую тему
};
