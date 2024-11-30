// Tema değiştirme işlevi
function toggleTheme() {
    const body = document.body;
    const themeButton = document.querySelector(".toggle-theme-btn");

    body.classList.toggle("dark-theme");

    // Tema durumunu kaydet
    const isDarkMode = body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Buton metnini güncelle
    themeButton.textContent = isDarkMode ? "Light" : "Dark";
}

// Sayfa yüklendiğinde tema durumunu kontrol et
document.addEventListener("DOMContentLoaded", () => {
    const currentTheme = localStorage.getItem("theme");
    const themeButton = document.querySelector(".toggle-theme-btn");

    // Kaydedilen temayı uygula
    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeButton.textContent = "Light";
    }
});
