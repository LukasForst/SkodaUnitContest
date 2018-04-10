import Game from './modules/Game';
import Cutting from './modules/Cutting'

document.addEventListener("DOMContentLoaded", () => {

    // Start game if there is game__scene

    if($('.game__scene').length) {
        new Game();
    }

    if($('.stage1__plech').length){
        new Cutting();
        console.log('tu')
    }
    // Stage 3: changing colors

    const   auto = $('.stage3__auto'),
            redBtn = $('.stage3__colors-1'),
            blueBtn = $('.stage3__colors-2');

    redBtn.on('click', () => {
        auto.removeClass('default');
        auto.removeClass('blue');
        auto.addClass('red');
    });

    blueBtn.on('click', () => {
        auto.removeClass('default');
        auto.removeClass('red');
        auto.addClass('blue');
    })

});