// load same nav to all pages
export function loadNav() {
  fetch("../html/nav.html")
    .then((resp) => resp.text())
    .then((nav) => document.body.insertAdjacentHTML("afterbegin", nav))
    .catch((err) => console.warn(err));
}
