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


const cardContainer = document.querySelector(".card-container");

// All Elelments

const userData = JSON.parse(localStorage.getItem("userData"));

const uid = localStorage.getItem("uid");

import { addDoc, collection, db, doc, getDoc, getDocs } from "./firebase.js";

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

    blogBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        e.target.classList.add("opacity-50", "pointer-events-none");

        if (contentBox.value === "" || titleBox.value === "") {
            errorFunc("All fields are mandatory.", "red");
            e.target.classList.remove("opacity-50", "pointer-events-none");
        } else {

            let timeZone = new Date();


            try {

                const docRef = await addDoc(collection(db, "Blogs"), {
                    title: titleBox.value,
                    description: contentBox.value,
                    timeZone,
                    uid
                });

                contentBox.value = "";
                titleBox.value = "";

                errorFunc("Blog uploaded successfully.", "green");

                e.target.classList.remove("opacity-50", "pointer-events-none");

                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            } catch (e) {
                errorFunc("Error adding document plz try again later.", "red");
                e.target.classList.remove("opacity-50", "pointer-events-none");
                return;
            }

        }

    })

    // For upload Blog fields checking

} else {

    navRight.classList.remove("hidden");
    navHidden.classList.add("hidden");

}

window.addEventListener("load", () => makingCards());


const makingCards = async () => {
    
    let blogData = [];

    const querySnapshot = await getDocs(collection(db, "Blogs"));

    querySnapshot.forEach((doc) => {
        blogData.push(doc.data());
    });

    blogData.forEach(async (v) => {

        const docRef = doc(db, "users", v.uid);
        const docSnap = await getDoc(docRef);
        let data;

        if (docSnap.exists()) {
            data = docSnap.data().fullName;
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }


        const div = document.createElement("div");
        div.className += "lg:col-span-6 col-span-12 border-2 border-[#242535] py-3 px-2.5 rounded-md flex flex-col gap-7";

        div.innerHTML = `
              <div class="card-header flex justify-between items-center">
                <div
                  class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                >
                  <span
                    class="font-semibold text-gray-600 dark:text-gray-300 text-lg"
                    id="userPic"
                    >${data.charAt(0)}</span
                  >
                </div>
              </div>
              <div class="flex flex-col gap-5">
                <h2
                  class="card-heading lg:text-3xl text-2xl font-bold lg:tracking-wider lg:leading-9 sm:leading-7 text-balance"
                >
                ${v.title}
                </h2>
                <p
                  class="card-content lg:text-lg lg:leading-8 sm:leading-6 sm:text-base text-sm"
                >
                  ${v.description}
                </p>
              </div>`;

        cardContainer.appendChild(div);
    })

}