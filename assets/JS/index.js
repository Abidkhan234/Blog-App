import { doc } from "./firebase.js";

// All Elelments
const navRight = document.querySelector(".nav-right");

const navHidden = document.querySelector(".nav-hidden");

const userPic = document.getElementById("userPic");

const userName = document.querySelector(".userName");

const openBtn = document.querySelector(".open-btn");

const signOutBtn = document.getElementById("signOutBtn");

// All Elelments


const userData = JSON.parse(localStorage.getItem("userData"));

if (userData) {

    navRight.classList.add("hidden");
    navHidden.classList.remove("hidden");

    let nameLetters = "";

    for (let index = 0; index < userData.fullName.length; index++) {

        if (index == 0) {
            nameLetters += userData.fullName.charAt(index);
        } else if (userData.fullName.charAt(index).includes(" ")) {
            nameLetters += userData.fullName.charAt(index + 1);
        }

    }

    if (nameLetters.length > 3) {
        nameLetters.length = nameLetters.length - 1;
    }

    userPic.innerText = nameLetters;

    userName.innerText = userData.fullName;

    openBtn.addEventListener("click", () => {
        let div = document.querySelector(".hiddenDiv");

        if (div.classList.contains("invisible")) {
            div.classList.remove("invisible", "opacity-0");
        } else {
            div.classList.add("invisible", "opacity-0");
        }

    })

    signOutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.reload();
    })


} else {

    navRight.classList.remove("hidden");
    navHidden.classList.add("hidden");

}

