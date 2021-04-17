const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageinput = document.getElementById("messageinp")
const messagecontainer = document.querySelector(".container")
var audio = new audio("sound.mp3");

const append = (message, position) => {
    const messageElememnt = document.createElement("div");
    messageElememnt.innerText = message;
    messageElememnt.classList.add("message");
    messageElememnt.classList.add(position);
    messagecontainer.append(messageElememnt);
    if (position == "left") {
        audio.play();
    }
}

const name = prompt("enter your name to join");
socket.emit("new-user-joined", name);

socket.on("user-joined", name => {
    append("${name} joined the chat", "right")
})

socket.on("recieve", data => {
    append("${data.name}: ${data.message}", "left")
})

socket.on("left", name => {
    append("${name} left the chat", "right")
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageinput.nodeValue;
    append("you:$(message)", "right");
    socket.emit("send", message);
    messageinput.value = ""
})