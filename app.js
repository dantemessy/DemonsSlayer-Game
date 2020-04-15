'use strict'


// count the time player take to solve the game 
let counter = 0 ;
let finishFlag = true ;

// selectors
let media = document.querySelector('.mp3Media');
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');
let firstCard, secondCard ;

// finished flag 
let flag = 0 ;


// loading Screen >>
let loading = document.querySelector('.loading');


function loaded() {
    setTimeout(()=>{
        loading.classList.add('fadeOut');
        play.click() ;
        
    }, 3000);
    
    setTimeout(()=>{
        loading.classList.add('show');
    }, 5700);

};


document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flip))

function flip() {

    //start counter
    if(!counter){
        startCounter();
    }


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

            flag ++;
            if(flag > 5) {
                finishFlag = false ;
                flipContainer() ;
            }
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
    counter = 0 ;
    flag = 0 ;
    document.querySelector('.container').classList.remove('flip');
}




// on load settings for the audio
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



// timer function ;

function startCounter(){
    if(finishFlag){
        setTimeout(()=>{
            let min = Math.floor(counter/10/60) ;
            let sec = Math.floor(counter/10%60) ;
            if(min < 10){
				min = "0" + min;
			} 
			if(sec < 10){
				sec = "0" + sec;
			}
            counter ++ ;

            document.querySelector('.counter').innerHTML = `${min}:${sec}` ;
            startCounter();
        } , 100)
    }
}
    




