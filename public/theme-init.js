(function () {
    try {
        var t = localStorage.getItem("portfolio-theme");
        if (!t) {
            t = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        }
        document.documentElement.setAttribute("data-theme", t);
    } catch (e) {
        document.documentElement.setAttribute("data-theme", "dark");
    }
})();
