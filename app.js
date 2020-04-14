'use strict'


document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flip))

let firstCard, secondCard ;
let counter = 0 ;
function flip() {

    // click the same card do nothing 
    if (firstCard === this) return;
    //  wait till cards flip back
    if (firstCard && secondCard) return;

    this.classList.add('flip')

    if (!firstCard) {
        firstCard = this;
        return;

    } else {
        secondCard = this;
        //check both of them 
        if (firstCard.dataset.card === secondCard.dataset.card) {
            firstCard.removeEventListener('click', flip);
            secondCard.removeEventListener('click', flip);
            [firstCard, secondCard] = [undefined, undefined];

            counter = 6;
            console.log('counter' , counter);
            if(counter > 5) flipContainer() ;
            return;
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                [firstCard, secondCard] = [undefined, undefined]
            }, 1200)
        }
    }
}


function flipContainer(){
    setTimeout(() => {
        let container = document.querySelector('.container') ;
        console.log('f f' , container);
        container.classList.toggle('flip');
    }, 1500);
}


let shuffle = () => {
    document.querySelectorAll('.card').forEach(card => {
        let n = Math.floor(Math.random() * 12);
        card.style.order = n;
    }
    );
}
shuffle()

let playAgain = ()=> {

    document.querySelectorAll('.card').forEach( card => {
        card.classList.remove('flip');
        card.addEventListener('click' , flip);
    });
    shuffle()
    document.querySelector('.container').classList.remove('flip');
}


let media = document.querySelector('.mp3Media');
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');
media.volume = 0.1 ;

function runMusic(){
    media.play() ;
    play.style.display = 'none' ;
    pause.style.display = 'unset' ;
}
function pauseMusic(){
    media.pause() ;
    pause.style.display = 'none';
    play.style.display = 'unset';
}

