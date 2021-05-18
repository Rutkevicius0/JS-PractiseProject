import Api from "./Api.js";

export default class Joke {
  constructor(parentEl, jokeObj) {
    this.postObj = jokeObj;
    this.parentEl = parentEl;
    this.generateJoke();
  }
  static generateJoke() {
    const jokeContainer = document.querySelector(".joke");
    Api.getJokes().then((data) => {
      console.log("data", data);
      jokeContainer.innerHTML = `
        <img src="${data.icon_url}" class="m-3" alt="...">
      <div class="media-body m-3">
        <h5 class="mt-0">Random of Chuck Noris</h5>
        <p>${data.value}</p>
      </div>`;
    });
  }
}
