// Tema değiştirme işlevi
function toggleTheme() {
    const body = document.body; // Tüm sayfa gövdesi
    const themeButton = document.querySelector(".toggle-theme-btn"); // Tema değiştirme butonu

    body.classList.toggle("dark-theme"); // 'dark-theme' sınıfını ekle/kaldır

    // Tema durumunu kaydet
    const isDarkMode = body.classList.contains("dark-theme"); // Şu anda koyu tema aktif mi?
    localStorage.setItem("theme", isDarkMode ? "dark" : "light"); // Temayı localStorage'a kaydet

    // Buton metnini güncelle
    themeButton.textContent = isDarkMode ? "Light" : "Dark"; // Butonun metni duruma göre değişir
}

// Sayfa yüklendiğinde tema durumunu kontrol et
document.addEventListener("DOMContentLoaded", () => {
    const currentTheme = localStorage.getItem("theme"); // LocalStorage'dan kayıtlı temayı al
    const themeButton = document.querySelector(".toggle-theme-btn"); // Tema butonunu seç

    // Kaydedilen temayı uygula
    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme"); // Eğer kayıtlı tema 'dark' ise, koyu temayı uygula
        themeButton.textContent = "Light"; // Buton metnini güncelle
    }

    // Sayfa yüklendiğinde mevcut filtreleme durumunu uygula
    filterTodos(); // Arama ve filtreleme işlevini çağır
});

// Arama ve filtreleme işlevi
function filterTodos() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase(); // Arama kutusundaki değeri al (küçük harfe çevir)
    const filterValue = document.getElementById("filter").value; // Filtre seçeneğinin değerini al
    const todoItems = document.querySelectorAll("ul li"); // Listedeki tüm 'li' elemanlarını al

    // Tüm liste elemanlarını döngü ile kontrol et
    todoItems.forEach(todoItem => {
        const taskText = todoItem.querySelector("span").textContent.toLowerCase(); // Görev metnini al
        const isCompleted = todoItem.querySelector('input[type="checkbox"]').checked; // Görevin tamamlanmış olup olmadığını kontrol et

        // Göster/Gizle kontrolü için bir bayrak (flag)
        let shouldDisplay = true;

        // Filtreleme durumunu kontrol et
        if (filterValue === "completed" && !isCompleted) {
            shouldDisplay = false; // Eğer filtre 'completed' ve görev tamamlanmamışsa gösterme
        } else if (filterValue === "pending" && isCompleted) {
            shouldDisplay = false; // Eğer filtre 'pending' ve görev tamamlanmışsa gösterme
        }

        // Arama durumu kontrolü
        if (!taskText.includes(searchInput)) {
            shouldDisplay = false; // Eğer görev metni arama kutusundaki değeri içermiyorsa gösterme
        }

        // Liste elemanını göster veya gizle
        todoItem.style.display = shouldDisplay ? "" : "none"; // Flag durumuna göre görünürlüğü ayarla
    });
}

// Listeyi güncelleyen her işlemden sonra arama ve filtreleme işlevini çağır
function updateTodos() {
    filterTodos(); // Filtreleme işlevini yeniden çalıştır
}
