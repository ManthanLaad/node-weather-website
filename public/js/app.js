const form = document.querySelector("form");
const search = document.querySelector("input");
const title = document.querySelector("#title");
const message = document.querySelector("#message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  title.textContent = `On our way to ${location} 🚀`;
  message.textContent = ``;
  fetch(`/weather?address=${encodeURIComponent(location)}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        title.innerText = "Error";
        message.innerText = data.error;
        return;
      } else {
        title.innerText = data.location;
        message.innerText = data.forecast;
      }
    });
  });
});
