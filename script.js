import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// 🔥 Firebase Yapılandırması (Kendi Firebase Proje Bilgilerini Gir)
const firebaseConfig = {
  apiKey: "AIzaSyC3SOmLJPFxHCGgUqWM62otduW9Ag25eJw",
  authDomain: "technowolvesbk.firebaseapp.com",
  projectId: "technowolvesbk",
  storageBucket: "technowolvesbk.firebasestorage.app",
  messagingSenderId: "431745091745",
  appId: "1:431745091745:web:f213a36cc15f6a9d3908e0",
  measurementId: "G-SZCFGDEEJM"
};

// Firebase Başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore'dan Haberleri Getir
async function getNews() {
    const newsContainer = document.getElementById("news-list");
    newsContainer.innerHTML = "<p>Yükleniyor...</p>";

    const querySnapshot = await getDocs(collection(db, "news"));
    newsContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const newsData = doc.data();
        let newsItem = `
            <div class="news-item">
                <h3>${newsData.title}</h3>
                <p>${newsData.content}</p>
            </div>
        `;
        newsContainer.innerHTML += newsItem;
    });
}

// Karanlık Mod
document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Sayfa yüklendiğinde önceki mod ayarını uygula
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// Sayfa yüklenince haberleri çek
getNews();
