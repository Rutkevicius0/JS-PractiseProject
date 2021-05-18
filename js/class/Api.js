export default class Api {
  static postUrl = "https://jsonplaceholder.typicode.com/";

  static getPosts(howMany, successCallback) {
    fetch(Api.postUrl + "posts")
      .then((resp) => resp.json())
      .then((data) => successCallback(data.slice(0, howMany)))
      .catch((err) => console.warn(err));
  }

  static getSinglePost(id, successCallback) {
    fetch(Api.postUrl + "posts/" + id)
      .then((resp) => resp.json())
      .then((data) => successCallback(data))
      .catch((err) => console.warn(err));
  }
  static sendPost(objToSend, successCallback) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(objToSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((data) => successCallback(data))
      .catch((err) => console.log(err));
  }
  static getComments(id, successCallback) {
    fetch("https://jsonplaceholder.typicode.com/posts/" + id + "/comments")
      .then((resp) => resp.json())
      .then((data) => successCallback(data))
      .catch((err) => console.log(err));
  }
  static async deletePost(postId) {
    const resp = fetch(`${Api.postUrl}posts/${postId}`, {
      method: "DELETE",
    });
    const data = await resp.json();
    console.log("delete", data);
  }
  static async getJokes() {
    const resp = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await resp.json();
    return data;
  }
}

// tutuliniame puslapyje parsiusti ir atvaizduoti random CHuck noris juokeli is

//https://api.chucknorris.io/

// naudojant asyc await
