import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = { /* Firebase API bilgilerini buraya gir */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getNews() {
    const newsContainer = document.getElementById("news-list");
    newsContainer.innerHTML = "<p>Yükleniyor...</p>";

    const querySnapshot = await getDocs(collection(db, "news"));
    newsContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const newsData = doc.data();
        let newsItem = `<div class="news-item"><h3>${newsData.title}</h3><p>${newsData.content}</p></div>`;
        newsContainer.innerHTML += newsItem;
    });
}

getNews();
