"use strict"; // here we go again
console.log("app.js");

import Api from "./class/Api.js";
import Post from "./class/Posts.js";
import Joke from "./class/Joke.js";
import { loadNav } from "./functions.js";

loadNav();

// nuorodos
const postsContainer = document.querySelector(".post-container");
const singlePostsPage = document.querySelector(".single-posts-page");
const jokeContainer = document.querySelector(".joke");

if (jokeContainer) {
  Joke.generateJoke();
  // Api.getJokes().then((data) => {
  //   console.log("data", data);
  //   jokeContainer.innerHTML = `
  //   <img src="${data.icon_url}" class="m-3" alt="...">
  // <div class="media-body m-3">
  //   <h5 class="mt-0">Random of Chuck Noris</h5>
  //   <p>${data.value}</p>
  // </div>`;
  // });
}

if (postsContainer) {
  console.log("Posts page");

  Api.getPosts(10, function (postsArr) {
    postsContainer.innerHTML = null;
    console.log(postsArr);
    postsArr.forEach((postObj) => new Post(postsContainer, postObj));
  });
}

if (singlePostsPage !== null) {
  console.log("sigle post page");

  // nuorodos
  const cardEl = document.querySelector(".card");
  const imgEl = cardEl.querySelector("img");
  const titleEl = cardEl.querySelector(".card-title");
  const pEl = cardEl.querySelector(".card-text");
  const deleteBtn = document.querySelector("#delete");

  // gaunam GET paramerta is URL nuorodos
  /// "singlePost.html?postId=4"
  const urlParams = new URLSearchParams(window.location.search);
  const postIdFromGet = urlParams.get("postId");
  console.log(postIdFromGet);

  // gauti post kurio id yra postIdFromGet
  // padaryti fetch i "https://jsonplaceholder.typicode.com/posts/id"
  // fetch("https://jsonplaceholder.typicode.com/posts/" + postIdFromGet)
  //   .then((resp) => resp.json())
  //   .then((userObj) => {
  //     console.log(userObj);
  //     titleEl.textContent = userObj.title;
  //     pEl.textContent = userObj.body;
  //     imgEl.src = `https://picsum.photos/seed/${userObj.id}/1000/500`;
  //   })
  //   .catch((err) => console.error(err));
  const comSec = document.querySelector(".comments-section");
  Api.getSinglePost(postIdFromGet, (userObj) => {
    titleEl.textContent = userObj.title;
    pEl.textContent = userObj.body;
    imgEl.src = `https://picsum.photos/seed/${userObj.id}/1000/500`;
  });

  Api.getComments(postIdFromGet, (arr) => {
    console.log(arr);
    if (arr.length !== 0) {
      arr.forEach((com) => {
        let komentaras = document.createElement("div");
        komentaras.className = "list-group mb-2";
        komentaras.innerHTML = ` <a href="#" class="list-group-item list-group-item-action active">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${com.email}</h5>
          <small>${new Date()}</small>
        </div>
        <small>${com.body}</small>
      </a>`;
        comSec.appendChild(komentaras);
      });
    }
  });
  // gavus uzpildyti title ir body ir img info siame puslapyje
}

const addPostPage = document.querySelector(".add-posts-page");
if (addPostPage) {
  // console.log("add post page");
  const titleInputEl = document.querySelector("#title");
  const textInputEl = document.querySelector("#body");

  // postBtn.addEventListener("click", (event) => {
  //event.preventDefault();
  //   const x = {
  //     title: titleInputEl.value,
  //     body: textInputEl.value,
  //     userId: 1,
  //   };
  //   console.log(x);
  // });

  const formEl = document.querySelector("#add-post-form");

  const formPartEl = document.querySelector(".form-part");
  const formSuccessEl = document.querySelector(".form-success");

  const restartFormBtn = document.querySelector(".another-post-btn");

  function switchEl() {
    formPartEl.classList.toggle("d-none");
    formSuccessEl.classList.toggle("d-none");
  }

  restartFormBtn.addEventListener("click", switchEl);

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const postToCreateData = {
      title: titleInputEl.value,
      body: textInputEl.value,
      userId: 1,
    };
    Api.sendPost(postToCreateData, switchEl);
    titleInputEl.value = "";
    textInputEl.value = "";
  });
}
