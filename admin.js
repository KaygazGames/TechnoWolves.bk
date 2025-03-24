import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

// 📌 Firebase Konfigürasyonu
const firebaseConfig = {
  apiKey: "AIzaSyC3SOmLJPFxHCGgUqWM62otduW9Ag25eJw",
  authDomain: "technowolvesbk.firebaseapp.com",
  projectId: "technowolvesbk",
  storageBucket: "technowolvesbk.appspot.com",  // ❗ Burada yanlış yazılmıştı, düzelttim
  messagingSenderId: "431745091745",
  appId: "1:431745091745:web:f213a36cc15f6a9d3908e0",
  measurementId: "G-SZCFGDEEJM"
};

// Firebase Başlatma
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 📌 Sadece şu e-posta admin olabilir:
const adminEmail = "bilmem@bilmemne.bilmemne.tere";

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (userCredential.user.email === adminEmail) {
                alert("Giriş Başarılı!");
                checkAuth();
            } else {
                alert("Yetkisiz Giriş! Admin değilsiniz.");
                logout();
            }
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
    const imageFile = document.getElementById("news-image").files[0];

    let imageURL = "";

    if (imageFile) {
        const imageRef = ref(storage, `news_images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageURL = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "news"), { title, content, imageURL });
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
            ${newsData.imageURL ? `<img src="${newsData.imageURL}" alt="Haber Fotoğrafı">` : ""}
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
        if (user && user.email === adminEmail) {
            document.getElementById("login-section").style.display = "none";
            document.getElementById("admin-section").style.display = "block";
            loadAdminNews();
        } else {
            document.getElementById("login-section").style.display = "block";
            document.getElementById("admin-section").style.display = "none";
        }
    });
}

checkAuth();
