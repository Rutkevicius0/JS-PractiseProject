"use strict"; // here we go again

console.log("async");

function getOnePost() {
  let x;
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((err) => console.warn(err));

  fetch("https://jsonplaceholder.typicode.com/posts/2")
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      x = data;
    })
    .catch((err) => console.warn(err));

  console.log("x", x);
}
// getOnePost();

// const getOnePostA = async () => {
async function getOnePostA() {
  const response = await fetch("/js/badJson.json");

  //   console.log("response", response);
  if (!response.ok) {
    throw new Error("Kazkas negerai su adresu");
  }

  const data = await response.json();
  //   console.log("async, ", data);

  const response1 = await fetch("https://jsonplaceholder.typicode.com/posts/2");
  const data1 = await response1.json();

  //   console.log("async, ", data, data1);

  return data;
}

// const getD = getOnePostA(); // grazina Promise
// console.log("getD", getD);

getOnePostA()
  .then((data) => console.log("data", data))
  .catch((err) => console.warn(err.message));
