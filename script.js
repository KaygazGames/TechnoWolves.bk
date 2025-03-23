// Firebase Firestore REST API Kullanımı
const FIREBASE_PROJECT_ID = "technowolvesbk"; // Firestore'daki Proje ID'nizi buraya girin
const FIRESTORE_COLLECTION = "news"; // Firestore'daki koleksiyon adı

async function getNews() {
    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${FIRESTORE_COLLECTION}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        let newsContainer = document.getElementById("news-list");
        newsContainer.innerHTML = ""; // Önceki haberleri temizle

        if (data.documents) {
            data.documents.forEach(doc => {
                let newsData = doc.fields;
                let newsItem = `
                    <div class="news-item">
                        <h3>${newsData.title.stringValue}</h3>
                        <p>${newsData.content.stringValue}</p>
                    </div>
                `;
                newsContainer.innerHTML += newsItem;
            });
        } else {
            newsContainer.innerHTML = "<p>Henüz haber yok.</p>";
        }
    } catch (error) {
        console.error("Haberleri çekerken hata oluştu:", error);
        document.getElementById("news-list").innerHTML = "<p>Haberler yüklenemedi.</p>";
    }
}

// Karanlık Mod
document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Sayfa yüklendiğinde haberleri getir
getNews();
