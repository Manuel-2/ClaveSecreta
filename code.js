class Queue {
    constructor(length) {
        this.length = length;
        this.elements = [];
    }

    add(element) {
        if (this.elements.length < this.length) {
            this.elements.push(element);
            return;
        }
        this.elements.shift();
        this.elements.push(element);
    }
}

const video = document.querySelector(".main__video");
const revealButton = document.querySelector(".secret_button");
const text = document.querySelector(".main__clue");
text.addEventListener("transitionend", (e) => {
    removeThings();
    video.classList.add("main__video--reveal");
})


revealButton.addEventListener("click", revealTheTruth);

function revealTheTruth() {
    if (secretUnlocked) {
        secretUnlocked = false;
        text.classList.add("main__clue--disapear");
        revealButton.classList.add("secret_button--disapear");
        setTimeout(function () {
            video.play();
            video.addEventListener("ended", () => {
                video.classList.remove("main__video--reveal");
            });
        }, 1000)
    }
}

function hideVideo() {

}

function removeThings() {
    text.classList.add("gone");
    revealButton.classList.add("gone");
}

const SECRET_WORD = "secreta";
let inputsQueue = new Queue(SECRET_WORD.length);
let secretUnlocked = false;
let reading = true;

document.addEventListener("keydown", (event) => {
    if (!reading)
        return;

    const key = event.key;
    inputsQueue.add(key);
    checkForCode();
});

function checkForCode() {
    const currentCode = [...inputsQueue.elements].join("");
    if (currentCode.toLowerCase() == SECRET_WORD.toLowerCase()) {
        showButtonToRevealTheTruth();
    }
}

function showButtonToRevealTheTruth() {
    secretUnlocked = true;
    revealButton.classList.add("secret_button--show");
    reading = false;
}

