
// For password preview-btn
const previewBtn = document.querySelector(".preview-btn");

previewBtn.addEventListener("click", () => {

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

// All Elements


import { doc } from "./firebase.js";

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
;

const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;

const uid = localStorage.getItem("uid");

// Error Function

const errorFunc = (message, color) => {
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

    if (uid) {

        if (passwordBox.value === "" && emailBox.value === "") {
            errorFunc("All field is mandatory.", "red");
        } else if (!emailRegex.test(emailBox.value)) {
            errorFunc("Invalid email format.", "red");
        }

    } else {
        errorFunc("Create account first.", "red");
        setTimeout(() => {
            window.location.href = "/signUpPage.html";
        }, 1000);
    }

})

// For Login Form


// For Sign Up Form

signUpBtn?.addEventListener("click", (e) => {

    e.preventDefault();

    if (fullNameBox.value === "" || passwordBox.value === "" || emailBox.value === "") {
        errorFunc("All field is mandatory.", "red");
    } else if (!emailRegex.test(emailBox.value)) {
        errorFunc("Invalid email format.", "red");
    } else if (!passwordRegex.test(passwordBox.value)) {
        errorFunc("Password must be atleast 6 character long.", "red");
    } else {
        errorFunc("Account created successfully.", "green");
        setTimeout(() => {
            window.location.href = "../screen/loginPage.html";
        }, 1000);
    }



})

// For Sign Up Form