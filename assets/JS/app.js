// For password preview-btn
const previewBtn = document.querySelector(".preview-btn");

previewBtn?.addEventListener("click", () => {

    let i = previewBtn.querySelector("i");
    let password = previewBtn.previousElementSibling;

    if (password.type === "password") {
        i.classList.replace("fa-eye-slash", "fa-eye");
        password.type = "text";
    } else {
        i.classList.replace("fa-eye", "fa-eye-slash");
        password.type = "password";
    }

});
// For password preview-btn


// All Elements

const emailBox = document.getElementById("email");

const passwordBox = document.getElementById("password");

const fullNameBox = document.getElementById("fullname");

const loginBtn = document.getElementById("login-btn");

const signUpBtn = document.getElementById("signUp-btn");

const googleBtn = document.getElementById("google-btn");

const forgetPasswordBtn = document.getElementById("forget-password-btn");

// All Elements


import { auth, createUserWithEmailAndPassword, db, doc, getDoc, provider, sendEmailVerification, sendPasswordResetEmail, setDoc, signInWithEmailAndPassword, signInWithPopup } from "./firebase.js";

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
;

const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;

const uid = localStorage.getItem("uid");


// Error Function

const errorFunc = (message, color) => {

    if (message.includes("auth/email-already-in-use")) {
        message = "Email already in use."
    } else if (message.includes("(auth/invalid-credential).")) {
        message = "Invalid email or password."
    }

    Toastify({

        text: message,

        style: {
            background: color,
        },

        position: "center",

        duration: 3000,


    }).showToast();
}


// Error Function


// For Login Form


loginBtn?.addEventListener("click", (e) => {

    e.preventDefault();

    e.target.classList.add("opacity-50", "pointer-events-none");

    if (uid) {

        if (passwordBox.value === "" && emailBox.value === "") {
            errorFunc("All field is mandatory.", "red");
            e.target.classList.remove("opacity-50", "pointer-events-none");
        } else if (!emailRegex.test(emailBox.value)) {
            errorFunc("Invalid email format.", "red");
            e.target.classList.remove("opacity-50", "pointer-events-none");
        } else {

            signInWithEmailAndPassword(auth, emailBox.value, passwordBox.value)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...

                    if (user.emailVerified) {

                        try {
                            const docRef = doc(db, "users", user.uid);
                            const docSnap = await getDoc(docRef);

                            let data;

                            if (docSnap.exists()) {
                                data = docSnap.data();

                                localStorage.setItem("userData", JSON.stringify(data));

                                localStorage.setItem("uid", user.uid);

                            } else {
                                console.log("Not ok");
                            }
                        } catch (error) {
                            console.log(error);
                        }

                        emailBox.value = "";
                        passwordBox.value = "";

                        errorFunc("Logged in successful.", "green");

                        setTimeout(() => {
                            window.location.href = "../index.html";
                        }, 1000);

                    } else {
                        errorFunc("Verify email first.", "red");
                        e.target.classList.remove("opacity-50", "pointer-events-none");
                    }

                })
                .catch((error) => {

                    const errorCode = error.code;
                    const errorMessage = error.message;

                    errorFunc(errorMessage, "red");
                    e.target.classList.remove("opacity-50", "pointer-events-none");

                });

        }

    } else {
        errorFunc("Create account first.", "red");
        setTimeout(() => {
            window.location.href = "./signUpPage.html";
        }, 1000);
    }

})

// For Login Form


// For Sign Up Form

signUpBtn?.addEventListener("click", (e) => {

    e.target.classList.add("opacity-50", "pointer-events-none");

    e.preventDefault();

    if (fullNameBox.value === "" || passwordBox.value === "" || emailBox.value === "") {
        errorFunc("All field is mandatory.", "red");

        e.target.classList.remove("opacity-50", "pointer-events-none");
    } else if (!emailRegex.test(emailBox.value)) {
        errorFunc("Invalid email format.", "red");

        e.target.classList.remove("opacity-50", "pointer-events-none");
    } else if (!passwordRegex.test(passwordBox.value)) {
        errorFunc("Password must be atleast 6 character long.", "red");

        e.target.classList.remove("opacity-50", "pointer-events-none");
    } else {

        createUserWithEmailAndPassword(auth, emailBox.value, passwordBox.value)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...

                try {

                    await setDoc(doc(db, "users", user.uid), {
                        email: emailBox.value,
                        fullName: fullNameBox.value,
                    });

                    e.target.classList.remove("opacity-50", "pointer-events-none");

                    sendEmailVerification(user)
                        .then(() => {
                            errorFunc("Email verification send.", "green");
                        });

                    let data = {
                        email: emailBox.value,
                        fullName: fullNameBox.value
                    };

                    localStorage.setItem("uid", uid)

                } catch (error) {
                    console.log(error);
                }

                setTimeout(() => {
                    window.location.href = "../screen/loginPage.html";
                }, 1500);

                emailBox.value = "";
                passwordBox.value = "";
                fullNameBox.value = "";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                e.target.classList.remove("opacity-50", "pointer-events-none");
                errorFunc(errorMessage, "red");
            });
    }

})

// For Sign Up Form


// For Forget password form

forgetPasswordBtn?.addEventListener("click", async (e) => {

    e.target.classList.add("opacity-50", "pointer-events-none");

    e.preventDefault();

    if (emailBox.value === "") {
        errorFunc("All field is mandatory.", "red");

        e.target.classList.remove("opacity-50", "pointer-events-none");
    } else if (!emailRegex.test(emailBox.value)) {
        errorFunc("Invalid email format.", "red");

        e.target.classList.remove("opacity-50", "pointer-events-none");
    } else {

        sendPasswordResetEmail(auth, emailBox.value)
            .then(() => {
                errorFunc("Password reset request send.", "green");
                window.location.href = "./loginPage.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                errorFunc(errorMessage, "red")
            });

    }

})

// For Forget password form


// For Google Sign in 

googleBtn?.addEventListener("click", () => googleSignInBtn());

const googleSignInBtn = () => {

    localStorage.removeItem("userData");

    signInWithPopup(auth, provider)
        .then((result) => {

            const user = result.user;

            localStorage.setItem("uid", user.uid);

            errorFunc("Logged In Successfully.", "green");

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1000);

        }).catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;

            errorFunc(errorMessage, "red");

        });

}


// For Google Sign in 