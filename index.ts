import "./style.css";

const game = {
    timer: "",
    time: "00:00",
    difficulty: 0,
    status: "level",
    cards: [],
    cardOne: {},
    cardTwo: {},
    choice: 3,
};

const cardSuits = ["Diamonds", "Hearts", "Clubs", "Spades"];
const cardRanks = ["6", "7", "8", "9", "10", "Q", "K", "J", "A"];

function startStopwatch() {
    let seconds: number = 0;
    let stopwatchInterval: NodeJS.Timer;
    const timeElement = document.querySelector(".numbers")!;

    const updateDisplay = function () {
        const minutes: number = parseInt(seconds / 60, 10);
        const remainingSeconds = seconds % 60;

        const minutesDisplay = minutes < 10 ? "0" + minutes : minutes;
        const secondsDisplay =
            remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

        const stopwatchText = minutesDisplay + ":" + secondsDisplay;
        //   setTime(stopwatchText);
        timeElement.textContent = stopwatchText;
        game.time = stopwatchText;
    };

    const start = function () {
        stopwatchInterval = setInterval(function () {
            seconds++;
            updateDisplay();
        }, 1000);
    };

    const stop = function () {
        clearInterval(stopwatchInterval);
    };

    const reset = function () {
        stop();
        seconds = 0;
        updateDisplay();
    };

    return {
        start: start,
        stop: stop,
        reset: reset,
    };
}

function getRandomCard(cardsNum: number) {
    return Math.floor(Math.random() * cardsNum);
}

function shuffle(array: number []) {
    let currentIndex: number = array.length,
        randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function renderApp() {
    const appEl = document.getElementById("app")!;

    if (game.status === "level") {
        const gameHtml = `
        <form id="form" action="">
        <div class="container">
        <div class="box">
            <div class="box-text">
                <div>Выбери</div>
                <div>сложность</div>
            </div>
            <div class="box-levels">
                <button type="button" class="level level1">1</button>
                <button type="button" class="level level2">2</button>
                <button type="button" class="level level3">3</button>
            </div>
            <div>
                <button type="submit" class="box-button" disabled>Старт</button>
            </div>
        </div>
        </div>
        </form>`;

        appEl.innerHTML = gameHtml;

        const levelOne = document.querySelector(".level1")!;
        const levelTwo = document.querySelector(".level2")!;
        const levelThree = document.querySelector(".level3")!;
        const start = document.querySelector(".box-button")!;

        levelOne.addEventListener("click", () => {
            game.difficulty = 1;
            start.disabled = false;
            console.log(game);
        });

        levelTwo.addEventListener("click", () => {
            game.difficulty = 2;
            start.disabled = false;
            console.log(game);
        });

        levelThree.addEventListener("click", () => {
            game.difficulty = 3;
            start.disabled = false;
            console.log(game);
        });

        const elementForm = document.getElementById("form")!;

        elementForm.addEventListener("submit", (event) => {
            event.preventDefault();
            game.status = "game";
            if (game.status === "game") {
                const gameHtml = `  <div>
                <div class="head center">
                    <div class="timer">
                        <div class="timer-up">
                            <div class="min">min</div>
                            <div class="sec">sec</div>
                        </div>
                        <div class="numbers">${game.time}</div>
                    </div>
                    <button class="button-start-over">Начать заново</button>
                </div>
                <div class="cards center">
                </div>
            </div>
            
            <form id="formTwo" class="finish-model" action="">
                <div class="container">
                <div class="box box-finish">
                <img src="./static/celebration.png">
                <div class="box-text">
                    <div>Вы  выиграли!</div>
                    <div class="wasted-time">Затраченное время:</div>
                </div>
                <div class="finish-numbers">
                    ${game.time}
                 </div>
                <div>
                    <button class="button-start-over">Начать заново</button>
                </div>
            </div>
            </div>
            </form>

            <form id="formThree" class="finish-model" action="">
                <div class="container">
                <div class="box box-finish">
                <img src="./static/dead.png">
                <div class="box-text">
                    <div>Вы  проиграли!</div>
                    <div class="wasted-time">Затраченное время:</div>
                </div>
                <div class="finish-numbers">
                    ${game.time}
                 </div>
                <div>
                    <button class="button-start-over">Начать заново</button>
                </div>
            </div>
            </div>
            </form>
            `;
                appEl.innerHTML = gameHtml;
                const timer = startStopwatch();
                game.timer = timer;
                game.timer.start();
                const buttonStartOver =
                    document.querySelector(".button-start-over")!;
                buttonStartOver.addEventListener("click", () => {
                    game.timer = "";
                    game.time = "00:00";
                    game.difficulty = 0;
                    game.status = "level";
                    game.cards = [];
                    game.cardOne = {};
                    game.cardTwo = {};
                    game.choice = 3;

                    renderApp();
                });
            }
            for (let i = 1; i <= game.difficulty * 3; i++) {
                let suit: string = cardSuits[getRandomCard(cardSuits.length)];
                let rank: string = cardRanks[getRandomCard(cardRanks.length)];
                game.cards.push({ suit, rank });
                game.cards.push({ suit, rank });

                // game.cards.push([cardSuits[getRandomCard(cardSuits.length)], cardRanks[getRandomCard(cardRanks.length)]]);
            }
            shuffle(game.cards);
            const cardsEl = document.querySelector(".cards")!;
            game.cards.map((item) => {
                const newImg = document.createElement("img");
                newImg.classList.add("card");
                // newImg.src = `<%=require('./img/${item.suit} ${item.rank}.png')%>`;
                newImg.src = `static/${item.suit} ${item.rank}.png`;
                newImg.alt = `Card ${item.suit} ${item.rank}`;
                newImg.addEventListener("click", () => {
                    console.log(item.suit + item.rank);
                    // newImg.src = `./img/${item.suit} ${item.rank}.png`
                    switch (game.choice) {
                        case 0:
                            newImg.src = `./static/${item.suit} ${item.rank}.png`;
                            game.choice = 1;
                            game.cardOne = item;
                            break;

                        case 1:
                            newImg.src = `./static/${item.suit} ${item.rank}.png`;
                            game.choice = 2;
                            game.cardTwo = item;
                            if (
                                game.cardOne.suit === game.cardTwo.suit &&
                                game.cardOne.rank === game.cardTwo.rank
                            ) {
                                setTimeout(() => {
                                    game.timer.stop();
                                    const victory =
                                        document.getElementById("formTwo")!;
                                    victory.classList.add("finish-model-open");
                                    victory.querySelector(
                                        ".finish-numbers",
                                    ).textContent = game.time;
                                }, 500);
                            } else {
                                setTimeout(() => {
                                    game.timer.stop();
                                    const lose =
                                        document.getElementById("formThree")!;
                                    lose.classList.add("finish-model-open");
                                    lose.querySelector(
                                        ".finish-numbers",
                                    ).textContent = game.time;
                                }, 500);
                            }
                            break;
                    }
                });
                cardsEl.append(newImg);
            });
            const cards = Array.from(document.querySelectorAll(".card"));
            setTimeout(() => {
                cards.map((item) => {
                    item.src = `./static/closed-card.svg`;
                    game.choice = 0;
                });
            }, 5000);
        });
    }
}

renderApp();
