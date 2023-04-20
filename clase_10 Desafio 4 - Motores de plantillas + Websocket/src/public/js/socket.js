let socket = io();
const btnDelete = document.getElementById("deleteP");
const btnAdd = document.getElementById("addP");
const connectionStatus = document.getElementById("connect");
const div = document.getElementById("products-container");

btnDelete.addEventListener("click", (event) => {
  event.preventDefault();
  const inputText = document.getElementById("deleteField").value;
  socket.emit("delete", inputText);
});

btnAdd.addEventListener("click", (event) => {
  event.preventDefault();
  let product = {};
  const data = document.getElementById("formulario");
  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].tagName === "INPUT") {
      product[data.children[i].id] = data.children[i].value;
    }
  }
  socket.emit("addProduct", product);
});

socket.on("connect", () => {
  connectionStatus.innerHTML = "Online";
  connectionStatus.style.color = "green";
  socket.emit("products", "");
});

socket.on("disconnect", () => {
  connectionStatus.innerHTML = "Offline";
  connectionStatus.style.color = "red";
});

socket.on("productsDiv", (message) => {
  div.innerHTML = message;
});

socket.on("error", (error) => {
  console.log(error);
});
