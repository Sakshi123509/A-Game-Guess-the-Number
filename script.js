let chances = document.querySelector(".chances");
let hint = document.querySelector(".hint");
let restartbtn = document.querySelector(".restartGame");
let input = document.querySelector(".userinput")
let startPage = document.querySelector(".start-page");
let game = document.querySelector(".gamecontent");
let number = Math.floor(Math.random() * 100);
let guessbtn = document.querySelector(".guess")

function startgame() {
    startPage.classList.add("hide")//ye chup jayega startpage
    game.classList.remove("hide")//means main gamecontent dikhega 
    console.log("Generated number:", number);
    remaininginput = 10;
    attempts = 0;
    input.disabled = false;
    input.value = "";
    hint.innerText = "";
    guessbtn.disabled = false;
    chances.innerText = "You have 10 chances.";
}

function guess() {
    let userguess = parseInt(input.value);
    if (remaininginput > 0) {
        attempts++;
        remaininginput--;

        if (isNaN(userguess)) {
            hint.innerText = "Please enter a valid number.";
        } else if (userguess < 0) {
            hint.innerText = "Enter a number greater than 0.";
        } else if (userguess > 99) {
            hint.innerText = "Enter a number less than 100.";
        } else if (userguess === number) {
            hint.innerText = `🎉 Congratulations! You guessed it in ${attempts} attempts.`;
            chances.innerText = "";
            guessbtn.disabled = true
            input.disabled = true;
            restartbtn.classList.remove("hide");
        } else if (userguess < number) {
            hint.innerText = "📉 Too low, try again!";
            chances.innerText = `You have ${remaininginput} chances left.`;
        } else {
            hint.innerText = "📈 Too high, try again!";
            chances.innerText = `You have ${remaininginput} chances left.`;
        }
        if (userguess != number && remaininginput == 0) {
            hint.innerText = `❌ Game Over! The number was ${number}.`;
            chances.innerText = "";
            input.disabled = true;
            restartbtn.classList.remove("hide");
        }
        input.value = ""
        clearInterval(timerInterval); // stop current timer
        startTimer(); // restart for next turn

    }
}

function restartGame() {
    startPage.classList.remove("hide");
    game.classList.add("hide");
}
function startTimer() {
    clearInterval(timerInterval);
    let timeLeft = 10;
    timerDisplay = document.createElement("p");
    timerDisplay.className = "timer text-danger fw-bold";
    timerDisplay.innerText = `⏳ Time left: ${timeLeft}s`;
    chances.parentNode.insertBefore(timerDisplay, chances);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `⏳ Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            hint.innerText = `⌛ Time's up! You missed your chance.`;
            chances.innerText = `You have ${remaininginput - 1} chances left.`;
            remaininginput--;
            input.value = "";
            startTimer(); // restart timer for next turn
        }
    }, 1000);
}
