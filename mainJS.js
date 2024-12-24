const board = document.getElementById("board");
const resetButton = document.getElementById("reset");
const status = document.getElementById("status");
const timerElement = document.getElementById('timer'); // Элемент для таймера
const clicksElement = document.getElementById('clicks'); // Элемент для счётчика кликов

const images = [
    'png1.png' , 'png1.png',
    'png2.png' , 'png2.png',
    'png3.png' , 'png3.png',
    'png4.png' , 'png4.png',
    'png5.png' , 'png5.png',
    'png6.png' , 'png6.png',
    'png7.png' , 'png7.png',
    'png8.png' , 'png8.png',
    'png9.png' , 'png9.png',
    'png10.png' , 'png10.png'
];

let flippedCards = [];
let matchedPairs = 0;
let clickCount = 0; // Инициализация счетчика кликов
let timeElapsed = 0; // Инициализация времени
let timerInterval; // Переменная для таймера

// Обновление таймера
function updateTimer() {
    timerElement.textContent = `Время: ${timeElapsed} сек.`;
}

// Обновление счётчика кликов
function updateClickCount() {
    clicksElement.textContent = `Клики: ${clickCount}`;
}

// Shuffle images
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create the game board
function createBoard() {
    board.innerHTML = "";
    shuffle(images);
    images.forEach((image) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = image;

        card.appendChild(img);
        board.appendChild(card);

        card.addEventListener("click", () => flipCard(card, image));
    });
}

// Flip card
function flipCard(card, image) {
    if (card.classList.contains("flipped") || flippedCards.length === 2) return;

    card.classList.add("flipped");
    flippedCards.push({ card, image });

    clickCount++; // Увеличиваем счетчик кликов
    updateClickCount(); // Обновляем счетчик кликов

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for a match
function checkMatch() {
    const [first, second] = flippedCards;

    if (first.image === second.image) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === images.length / 2) {
            status.textContent = "You win!";
            clearInterval(timerInterval); // Останавливаем таймер после победы
        }
    } else {
        setTimeout(() => {
            first.card.classList.remove("flipped");
            second.card.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

// Reset the game
resetButton.addEventListener("click", () => {
    matchedPairs = 0;
    flippedCards = [];
    clickCount = 0; // Сброс счётчика кликов
    timeElapsed = 0; // Сброс времени
    clearInterval(timerInterval); // Останавливаем таймер
    status.textContent = "";
    createBoard();
    startTimer(); // Перезапуск таймера
});

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++; // Увеличиваем время на 1 каждую секунду
        updateTimer(); // Обновляем отображение времени
    }, 1000);
}

// Initialize the game
createBoard();
startTimer(); // Запуск таймера при старте игры
