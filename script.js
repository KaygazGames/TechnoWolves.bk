const firebaseConfig = {
  apiKey: "AIzaSyC3SOmLJPFxHCGgUqWM62otduW9Ag25eJw",
  authDomain: "technowolvesbk.firebaseapp.com",
  projectId: "technowolvesbk",
  storageBucket: "technowolvesbk.firebasestorage.app",
  messagingSenderId: "431745091745",
  appId: "1:431745091745:web:f213a36cc15f6a9d3908e0",
  measurementId: "G-SZCFGDEEJM"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Haberleri Firestore'dan Çekme (Sadece Okuma)
db.collection("news").get().then((querySnapshot) => {
    let newsContainer = document.getElementById("news-list");
    newsContainer.innerHTML = ""; // Önceki haberleri temizle

    querySnapshot.forEach((doc) => {
        let data = doc.data();
        let newsItem = `
            <div class="news-item">
                <h3>${data.title}</h3>
                <p>${data.content}</p>
            </div>
        `;
        newsContainer.innerHTML += newsItem;
    });
});

// Karanlık Mod Butonu
document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
