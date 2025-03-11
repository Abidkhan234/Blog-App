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

const loader = document.querySelector(".loader");

// All Elelments

const userData = JSON.parse(localStorage.getItem("userData"));

const uid = localStorage.getItem("uid");

import { addDoc, collection, db, doc, getDoc, getDocs, query, where } from "./firebase.js";

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

    window.location.href = "../index.html";

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

if (userData) {
  window.addEventListener("load", () => {

    loader.classList.remove("opacity-0", "invisible");

    makingUserCards();
  });
}

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

const dropdownFunc = (event) => {
  const dropdownMenu = event.currentTarget.nextElementSibling;
  if (dropdownMenu.classList.contains("invisible")) {
    dropdownMenu.classList.remove("invisible", "opacity-0");
  } else {
    dropdownMenu.classList.add("invisible", "opacity-0");
  }
};

const makingUserCards = async () => {

  const q = query(collection(db, "Blogs"), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);
  let yourBlogData = [];

  querySnapshot.forEach((doc) => {
    yourBlogData.push(doc.data());
  });


  yourBlogData.sort((a, b) => {
    return new Date(b.timeZone.seconds * 1000 + b.timeZone.nanoseconds / 1e6) - new Date(a.timeZone.seconds * 1000 + a.timeZone.nanoseconds / 1e6);
  });

  let allBtns;

  yourBlogData.forEach(async (v, index) => {

    const docRef = doc(db, "users", v.uid);
    const docSnap = await getDoc(docRef);
    let data;

    if (docSnap.exists()) {
      data = docSnap.data().fullName;
    } else {
      console.log("No such document!");
      return;
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
                    
                    <div class="relative">
        <button class="drop-down-btn cursor-pointer p-2">
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path
              d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
            />
          </svg>
        </button>

        <div
          class="drop-down-menu absolute bottom-[-75px] right-[50%] p-1 bg-white flex flex-col items-center rounded-md opacity-0 invisible transition-opacity duration-300 w-[150px]"
        >
          <ul class="flex flex-col gap-2.5 w-full text-center">
            <li>
              <button
                id="edit-blog"
                class="w-full block text-lg font-medium text-blue-700 hover:bg-gray-200 cursor-pointer"
              >
                Edit
              </button>
            </li>
            <li>
              <button
                id="delete-blog"
                class="w-full block text-lg font-medium text-red-600 hover:bg-gray-200 cursor-pointer"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
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

  const dropdownBtns = document.querySelectorAll(".drop-down-btn");
  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", dropdownFunc);
  });



  loader.classList.add("opacity-0", "invisible");

}