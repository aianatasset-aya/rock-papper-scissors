const choices = ["камень", "ножницы", "бумага"];

let playerScore = 0;
let computerScore = 0;
let currentRound = 0;

const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const roundLabel = document.getElementById("round-label");
const roundProgress = document.getElementById("round-progress");

const playerDisplay = document.getElementById("player-display");
const computerDisplay = document.getElementById("computer-display");
const playerChoiceLabel = document.getElementById("player-choice");
const computerChoiceLabel = document.getElementById("computer-choice");

const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameOver = document.getElementById("game-over");
const finalTitle = document.getElementById("final-title");
const finalMessage = document.getElementById("final-message");
const restartButton = document.getElementById("restart-btn");

const symbols = {
    камень: "●",
    ножницы: "✂",
    бумага: "▤"
};

function playRound(playerChoice) {
    if (currentRound >= 3) return;

    const randomIndex = Math.floor(Math.random() * 3);
    const computerChoice = choices[randomIndex];

    currentRound++;

    playerDisplay.textContent = symbols[playerChoice];
    computerDisplay.textContent = symbols[computerChoice];

    playerChoiceLabel.textContent = capitalize(playerChoice);
    computerChoiceLabel.textContent = capitalize(computerChoice);

    playerDisplay.classList.remove("reveal");
    computerDisplay.classList.remove("reveal");

    // Restart the animation for each round.
    void playerDisplay.offsetWidth;
    void computerDisplay.offsetWidth;

    playerDisplay.classList.add("reveal");
    computerDisplay.classList.add("reveal");

    if (playerChoice === computerChoice) {
        resultTitle.textContent = "Ничья!";
        resultMessage.textContent =
            "Вы выбрали одинаково. Никто не получает очко.";
    } else if (
        (playerChoice === "камень" && computerChoice === "ножницы") ||
        (playerChoice === "ножницы" && computerChoice === "бумага") ||
        (playerChoice === "бумага" && computerChoice === "камень")
    ) {
        playerScore++;

        resultTitle.textContent = "Этот раунд твой!";
        resultMessage.textContent =
            capitalize(playerChoice) + " побеждает: " +
            computerChoice + ". Ты получаешь 1 очко.";
    } else {
        computerScore++;

        resultTitle.textContent = "Раунд за компьютером";
        resultMessage.textContent =
            capitalize(computerChoice) + " побеждает: " +
            playerChoice + ". Компьютер получает 1 очко.";
    }

    updateInterface();

    if (currentRound === 3) {
        finishGame();
    }
}

function updateInterface() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;

    roundLabel.textContent =
        "РАУНД " + currentRound + " ИЗ 3";

    roundProgress.style.width =
        (currentRound / 3 * 100) + "%";
}

function finishGame() {
    choiceButtons.forEach(button => {
        button.disabled = true;
    });

    gameOver.hidden = false;

    if (playerScore > computerScore) {
        finalTitle.textContent = "Ты победил!";
        finalMessage.textContent =
            "Отличная игра! Итоговый счёт: " +
            playerScore + " : " + computerScore + ".";
    } else if (computerScore > playerScore) {
        finalTitle.textContent = "Победил компьютер!";
        finalMessage.textContent =
            "В этот раз компьютер оказался сильнее. Счёт: " +
            playerScore + " : " + computerScore + ".";
    } else {
        finalTitle.textContent = "Полная ничья!";
        finalMessage.textContent =
            "Вы достойные соперники. Счёт: " +
            playerScore + " : " + computerScore + ".";
    }

    gameOver.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

choiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        playRound(button.dataset.choice);
    });
});

restartButton.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    currentRound = 0;

    playerDisplay.textContent = "?";
    computerDisplay.textContent = "?";

    playerChoiceLabel.textContent = "Ты";
    computerChoiceLabel.textContent = "Компьютер";

    resultTitle.textContent = "Твой ход!";
    resultMessage.textContent =
        "Выбери один из трёх вариантов ниже.";

    gameOver.hidden = true;

    choiceButtons.forEach(button => {
        button.disabled = false;
    });

    updateInterface();
});

updateInterface();
