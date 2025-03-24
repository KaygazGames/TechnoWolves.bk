import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = { /* Firebase API bilgilerini buraya gir */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Giriş Başarılı!");
            checkAuth();
        })
        .catch((error) => alert("Giriş Hatası: " + error.message));
}

function logout() {
    signOut(auth).then(() => {
        alert("Çıkış Yapıldı!");
        location.reload();
    });
}

async function addNews() {
    const title = document.getElementById("news-title").value;
    const content = document.getElementById("news-content").value;

    await addDoc(collection(db, "news"), { title, content });
    alert("Haber Eklendi!");
    loadAdminNews();
}

async function loadAdminNews() {
    const newsContainer = document.getElementById("admin-news-list");
    newsContainer.innerHTML = "<p>Yükleniyor...</p>";

    const querySnapshot = await getDocs(collection(db, "news"));
    newsContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const newsData = doc.data();
        let newsItem = `<div class="admin-news-item">
            <h3>${newsData.title}</h3>
            <p>${newsData.content}</p>
            <button onclick="deleteNews('${doc.id}')">🗑 Sil</button>
        </div>`;
        newsContainer.innerHTML += newsItem;
    });
}

async function deleteNews(id) {
    await deleteDoc(doc(db, "news", id));
    alert("Haber Silindi!");
    loadAdminNews();
}

function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.getElementById("login-section").style.display = "none";
            document.getElementById("admin-section").style.display = "block";
            loadAdminNews();
        }
    });
}

checkAuth();
