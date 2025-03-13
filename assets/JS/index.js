// All Elelments

const navRight = document.querySelector(".nav-right");

const navHidden = document.querySelector(".nav-hidden");

// For login
const userPic2 = document.getElementById("userPic2");
const userName = document.querySelector(".userName-1");
// For login

// For Google
const userPic = document.getElementById("userPic");

const userName2 = document.querySelector(".userName-2");
// For Google



const contentBox = document.getElementById("contentBox");

const titleBox = document.getElementById("titleBox");


const openBtn = document.querySelectorAll(".open-btn");

const signOutBtn = document.getElementById("signOutBtn");

const uploadBlogBtn = document.getElementById("addBlogBtn");

const uploadBlogCloseBtn = document.getElementById("closeBtn");

const blogBtn = document.getElementById("uploadBlogBtn");


const uploadBlogModal = document.querySelector(".uploadBlogModal");

const modalBG = document.querySelector(".modalBG");


const cardContainer = document.querySelector(".card-container");

const loader = document.querySelector(".loader");

// All Elelments

const userData = JSON.parse(localStorage.getItem("userData"));

const uid = localStorage.getItem("uid");

import { addDoc, auth, collection, db, doc, getDoc, getDocs, onAuthStateChanged, signOut } from "./firebase.js";

const navUserData = () => {
    navRight.classList.add("hidden");
    navHidden.classList.replace("hidden", "flex");

    // For Modal popup
    openBtn.forEach((v) => {
        v.addEventListener("click", () => {
            let div = document.querySelector(".hiddenDiv");

            if (div.classList.contains("invisible")) {
                div.classList.remove("invisible", "opacity-0");
            } else {
                div.classList.add("invisible", "opacity-0");
            }

        })
    })


    signOutBtn.addEventListener("click", () => {

        localStorage.removeItem("userData");

        signOut(auth).then(() => {
            navRight.classList.remove("hidden");
            navHidden.classList.add("hidden");
        }).catch((error) => {
            console.log(error.message);
        });

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
}

if (userData) {
    userPic2.innerText = userData.fullName.charAt(0);

    userName.innerText = userData.fullName;

    navUserData();
} else {

    document.querySelector(".open-btn-1").classList.replace("hidden", "inline-flex");

    document.querySelector(".open-btn-2").classList.replace("inline-flex", "hidden");

    userName.classList.add("hidden");

    userName2.classList.remove("hidden");

    onAuthStateChanged(auth, (user) => {

        if (user) {

            const uid = user.uid;

            userPic.src = user.photoURL;

            userName2.innerText = user.displayName;

            navUserData();

        } else {

            navRight.classList.remove("hidden");
            navHidden.classList.add("hidden");

        }
    });
}


window.addEventListener("load", () => {

    loader.classList.remove("opacity-0", "invisible");

    makingCards();

});

const timeZoneFunc = (timestamp) => {

    const now = new Date();
    const postDate = new Date((timestamp.seconds * 1000) + (timestamp.nanoseconds / 1e6));
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 10) return "Recently posted";
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} months ago`;

    // Format as [Mon-MM-YYYY | HH:mm AM/PM]
    const monthAbbreviation = postDate.toLocaleString('en-US', { month: 'short' }); // Example: "Mar"
    const monthNumber = String(postDate.getMonth() + 1).padStart(2, '0'); // Two-digit month
    const year = postDate.getFullYear();
    const hours = postDate.getHours() % 12 || 12; // Convert 24h to 12h format
    const minutes = String(postDate.getMinutes()).padStart(2, '0'); // Ensure two-digit minutes
    const ampm = postDate.getHours() >= 12 ? "PM" : "AM";

    return `[${monthAbbreviation}-${monthNumber}-${year} | ${hours}:${minutes} ${ampm}]`;
}

const makingCards = async () => {

    let blogData = [];

    const querySnapshot = await getDocs(collection(db, "Blogs"));

    querySnapshot.forEach((doc) => {
        blogData.push(doc.data());
    });

    // Sort blogData by timeZone in descending order
    blogData.sort((a, b) => {
        return new Date(b.timeZone.seconds * 1000 + b.timeZone.nanoseconds / 1e6) - new Date(a.timeZone.seconds * 1000 + a.timeZone.nanoseconds / 1e6);
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

                <div class="text-sm font-medium">
                <span>${timeZoneFunc(v.timeZone)}</span>
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

    loader.classList.add("opacity-0", "invisible");
}