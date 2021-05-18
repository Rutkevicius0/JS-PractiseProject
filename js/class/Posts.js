export default class Post {
  constructor(parentEl, postObj) {
    this.postObj = postObj;
    this.parentEl = parentEl;
    this.generatePost();
  }
  generatePost() {
    // generuojam viena el
    const { id, title, body } = this.postObj;
    const cardEl = document.createElement("article");
    cardEl.className = "card";
    cardEl.innerHTML = `
        <img src="https://picsum.photos/seed/${id}/300/200" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">
                    ${body}
            </p>
            <a href="./singlePost.html?postId=${id}" class="btn btn-primary">read more</a>
            <button id="delete" class="btn btn-danger">Delete</button>
        </div>
      `;
    this.parentEl.append(cardEl);
  }
}
