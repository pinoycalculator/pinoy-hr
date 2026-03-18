import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Signup Function
export async function signup(email, password, role) {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        // Add user to Firestore
        await setDoc(doc(db, "users", userCred.user.uid), {
            email,
            role,
            subscription: "free" // default free
        });

        // Create a subscription doc (default pending)
        await setDoc(doc(db, "subscriptions", userCred.user.uid), {
            userId: userCred.user.uid,
            plan: "premium",
            status: "pending",
            proofImage: ""
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
        const uid = userCred.user.uid;

        // Get role
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        const role = docSnap.data().role;

        if (role === "admin") {
            // Admins bypass subscription check
            window.location.href = "admin.html";
            return;
        }

        // Check subscription status for employees
        const subRef = doc(db, "subscriptions", uid);
        const subSnap = await getDoc(subRef);

        if (!subSnap.exists() || subSnap.data().status !== "active") {
            alert("⚠️ Your subscription is not active. Please subscribe first!");
            window.location.href = "subscription.html";
            return;
        }

        // Paid employee → dashboard
        window.location.href = "employee.html";

    } catch (err) {
        console.error(err);
        alert("❌ Login failed: " + err.message);
    }
}
