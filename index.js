let game = {
    time: 0,
    difficulty: 0,
    status: "level",
    cards: [],
    userCards: [],
};

const cardSuits = ["Diamonds", "Hearts", "Clubs", "Spades"];
const cardRanks = ['6', '7', '8', '9', '10', 'Q', 'K', 'J', 'A'];

function getRandomCard(cardsNum) {
    return Math.floor(Math.random() * cardsNum);
}

function getLevel(el, cardsNum) {

    el.addEventListener('click', () => {

        let levelone = document.querySelector(".level1");
        let leveltwo = document.querySelector(".level2");
        let levelthree = document.querySelector(".level3");
        let start = document.querySelector(".box-button");

        levelone.classList.remove('chosen');
        leveltwo.classList.remove('chosen');
        levelthree.classList.remove('chosen');
        game.cards = [];

        el.classList.add('chosen');

        for (let i = 1; i <= cardsNum; i++) {
            game.cards.push([cardSuits[getRandomCard(cardSuits.length)], cardRanks[getRandomCard(cardRanks.length)]]);
        }

        if (el === levelone) {
            game.difficulty = 1;
        }
        if (el === leveltwo) {
            game.difficulty = 2;
        }
        if (el === levelthree) {
            game.difficulty = 3;
        }

        start.addEventListener('click', () => {
            game.status = "game";
            console.log(game.status);
            renderApp();
            console.log("game object", game);
        });
    });
}

function renderApp() {

    const appEl = document.getElementById("app");

    if (game.status === "level") {

        const gameHtml = `
        <div class="container">
        <div class="box">
            <div class="box-text">
                <div>Выбери</div>
                <div>сложность</div>
            </div>
            <div class="box-levels">
                <div class="level level1">1</div>
                <div class="level level2">2</div>
                <div class="level level3">3</div>
            </div>
            <form action="">
                <button class="box-button">Старт</button>
            </form>
        </div>
        </div>`;

        let levelone = document.querySelector(".level1");
        let leveltwo = document.querySelector(".level2");
        let levelthree = document.querySelector(".level3");
        let start = document.querySelector(".box-button");

        getLevel(levelone, 6);
        getLevel(leveltwo, 12);
        getLevel(levelthree, 18);

        appEl.innerHTML = gameHtml;

    }

    if (game.status === "game") {
        const gameHtml = `<div>Игра началась!</div>`;
        appEl.innerHTML = gameHtml;
    }
}

renderApp();