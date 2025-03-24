import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// 📌 Firebase Konfigürasyonu
const firebaseConfig = {
  apiKey: "AIzaSyC3SOmLJPFxHCGgUqWM62otduW9Ag25eJw",
  authDomain: "technowolvesbk.firebaseapp.com",
  projectId: "technowolvesbk",
  storageBucket: "technowolvesbk.appspot.com",
  messagingSenderId: "431745091745",
  appId: "1:431745091745:web:f213a36cc15f6a9d3908e0",
  measurementId: "G-SZCFGDEEJM"
};

// Firebase Başlatma
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📌 Haberleri Firebase'den Al ve Ekrana Yaz
async function loadNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "<p>Haberler yükleniyor...</p>";

    try {
        const querySnapshot = await getDocs(collection(db, "news"));
        newsContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const newsData = doc.data();
            let newsItem = `<div class="news-item">
                <h3>${newsData.title}</h3>
                <p>${newsData.content}</p>
            </div>`;
            newsContainer.innerHTML += newsItem;
        });

    } catch (error) {
        console.error("Haberleri yüklerken hata oluştu:", error);
        newsContainer.innerHTML = "<p>Haberler yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>";
    }
}

// Sayfa açıldığında haberleri yükle
window.onload = loadNews;
