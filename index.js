let game = {
    time: 0,
    difficulty: 0,
    status: "level",
    cards: [],
    cardOne: {},
    cardTwo: {},
    choice: 3,
    // userCards: [],
};

const cardSuits = ["Diamonds", "Hearts", "Clubs", "Spades"];
const cardRanks = ['6', '7', '8', '9', '10', 'Q', 'K', 'J', 'A'];


function getRandomCard(cardsNum) {
    return Math.floor(Math.random() * cardsNum);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

// function getLevel(el, cardsNum) {

//     el.addEventListener('click', () => {

//         let levelone = document.querySelector(".level1");
//         let leveltwo = document.querySelector(".level2");
//         let levelthree = document.querySelector(".level3");
//         let start = document.querySelector(".box-button");

//         levelone.classList.remove('chosen');
//         leveltwo.classList.remove('chosen');
//         levelthree.classList.remove('chosen');
//         game.cards = [];

//         el.classList.add('chosen');

//         for (let i = 1; i <= cardsNum; i++) {
//             game.cards.push([cardSuits[getRandomCard(cardSuits.length)], cardRanks[getRandomCard(cardRanks.length)]]);
//         }

//         if (el === levelone) {
//             game.difficulty = 1;
//         }
//         if (el === leveltwo) {
//             game.difficulty = 2;
//         }
//         if (el === levelthree) {
//             game.difficulty = 3;
//         }

//         start.addEventListener('click', () => {
//             game.status = "game";
//             console.log(game.status);
//             renderApp();
//             console.log("game object", game);
//         });
//     });
// }

function renderApp() {

    const appEl = document.getElementById("app");

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

        const levelOne = document.querySelector(".level1");
        const levelTwo = document.querySelector(".level2");
        const levelThree = document.querySelector(".level3");
        const start = document.querySelector(".box-button");

        levelOne.addEventListener('click', () => {
            game.difficulty = 1;
            start.disabled = false;
            console.log(game);
        });

        levelTwo.addEventListener('click', () => {
            game.difficulty = 2;
            start.disabled = false;
            console.log(game);
        });

        levelThree.addEventListener('click', () => {
            game.difficulty = 3;
            start.disabled = false;
            console.log(game);
        });

        const elementForm = document.getElementById('form');

        elementForm.addEventListener('submit', (event) => {
            event.preventDefault();
            game.status = "game";
            console.log("worked");
            console.log(event);
            if (game.status === "game") {
                const gameHtml = `  <div>
                <div class="head center">
                    <div class="timer">
                        <div class="timer-up">
                            <div class="min">min</div>
                            <div class="sec">sec</div>
                        </div>
                        <div class="numbers">00.00</div>
                    </div>
                    <button class="button-start-over">Начать заново</button>
                </div>
                <div class="cards center">
                </div>
            </div>`;
                appEl.innerHTML = gameHtml;
            }
            for (let i = 1; i <= (game.difficulty * 3); i++) {
                let suit = cardSuits[getRandomCard(cardSuits.length)];
                let rank = cardRanks[getRandomCard(cardRanks.length)];
                game.cards.push({suit,rank});
                game.cards.push({suit,rank});
                
                // game.cards.push([cardSuits[getRandomCard(cardSuits.length)], cardRanks[getRandomCard(cardRanks.length)]]);
            }
            console.log(game.cards);
            shuffle(game.cards);
            const cardsEl = document.querySelector(".cards");
            game.cards.map((item) => {
                const newImg = document.createElement("img");
                newImg.classList.add("card");
                newImg.src = `./img/${item.suit} ${item.rank}.png`;
                newImg.alt = `Card ${item.suit} ${item.rank}`;
                newImg.addEventListener('click', () => {
                    console.log(item.suit + item.rank);
                    // newImg.src = `./img/${item.suit} ${item.rank}.png`
                    switch(game.choice) {
                        case 0:  
                          newImg.src = `./img/${item.suit} ${item.rank}.png`
                          game.choice = 1;
                          game.cardOne = item;
                          break;
                      
                        case 1:  
                          newImg.src = `./img/${item.suit} ${item.rank}.png`
                          game.choice = 2;
                          game.cardTwo = item;
                          if(game.cardOne.suit === game.cardTwo.suit && game.cardOne.rank === game.cardTwo.rank) {
                            setTimeout(() => {
                                alert('Victory');
                            }, 500)
                          } else {
                            setTimeout(() => {
                                alert('you lost');
                            }, 500)
                          }
                          break;
                      }
                })
                cardsEl.append(newImg);
            })
            const cards = Array.from(document.querySelectorAll(".card"));
            setTimeout(() => {
                cards.map((item) => {
                    item.src = `./img/closed-card.svg`;
										game.choice = 0;                
									})
            }, 5000)
        })

    }

}

renderApp();