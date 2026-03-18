import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Signup Function
export async function signup(email, password, role) {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        // Add user to Firestore
        await setDoc(doc(db, "users", userCred.user.uid), {
            email,
            role,
            subscription: "free"
        });

        alert("✅ Account created successfully!");
        window.location.href = "login.html"; // redirect to login
    } catch (err) {
        console.error(err);
        alert("❌ Signup failed: " + err.message);
    }
}

// Login Function
export async function login(email, password) {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Login successful!");

        // redirect based on role
        const docRef = doc(db, "users", userCred.user.uid);
        const docSnap = await (await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js")).getDoc(docRef);

        const role = docSnap.data().role;
        if (role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "employee.html";
        }
    } catch (err) {
        console.error(err);
        alert("❌ Login failed: " + err.message);
    }
}