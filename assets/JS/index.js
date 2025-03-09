import { doc } from "./firebase.js";

// All Elelments

const navRight = document.querySelector(".nav-right");

const navHidden = document.querySelector(".nav-hidden");


const userPic = document.getElementById("userPic");

const userName = document.querySelector(".userName");


const contentBox = document.getElementById("contentBox");

const titleBox = document.getElementById("titleBox");


const openBtn = document.querySelector(".open-btn");

const signOutBtn = document.getElementById("signOutBtn");

const uploadBlogBtn = document.getElementById("addBlogBtn");

const uploadBlogCloseBtn = document.getElementById("closeBtn");

const blogBtn = document.getElementById("uploadBlogBtn");


const uploadBlogModal = document.querySelector(".uploadBlogModal");

const modalBG = document.querySelector(".modalBG");

// All Elelments

const userData = JSON.parse(localStorage.getItem("userData"));

const uid = localStorage.getItem("uid");

if (userData) {

    navRight.classList.add("hidden");
    navHidden.classList.remove("hidden");

    userPic.innerText = userData.fullName.charAt(0).toUpperCase();

    userName.innerText = userData.fullName;

    // For Modal popup

    openBtn.addEventListener("click", () => {
        let div = document.querySelector(".hiddenDiv");

        if (div.classList.contains("invisible")) {
            div.classList.remove("invisible", "opacity-0");
        } else {
            div.classList.add("invisible", "opacity-0");
        }

    })

    signOutBtn.addEventListener("click", () => {

        navRight.classList.remove("hidden");
        navHidden.classList.add("hidden");

        localStorage.removeItem("userData");

        window.location.reload();

    })

    uploadBlogBtn.addEventListener("click", () => {
        uploadBlogModal.classList.remove("invisible", "opacity-0");
        modalBG.classList.remove("opacity-0", "invisible")
    })

    uploadBlogCloseBtn.addEventListener("click", () => {
        uploadBlogModal.classList.add("invisible", "opacity-0");

        modalBG.classList.add("opacity-0", "invisible")
    })

    // For Modal popup

    // For upload Blog fields checking

    const errorFunc = (message, color) => {

        Toastify({

            text: message,

            style: {
                background: color,
            },

            position: "center",

            duration: 1500,


        }).showToast();
    }

    blogBtn.addEventListener("click", (e) => {

        e.preventDefault();

        if (contentBox.value === "" || titleBox.value === "") {
            errorFunc("All fields are mandatory.", "red");
        } else {

            let timeZone = new Date();

            let blogData = [{
                title: titleBox.value,
                description: contentBox.value,
                timeZone,
                uid
            }];










            errorFunc("Blog uploaded successfully.", "green");

            contentBox.value = "";
            titleBox.value = "";

            setTimeout(() => {
                uploadBlogModal.classList.add("invisible", "opacity-0");

                modalBG.classList.add("opacity-0", "invisible")
            }, 1000);

        }


    })


    // For upload Blog fields checking

} else {

    navRight.classList.remove("hidden");
    navHidden.classList.add("hidden");

}

