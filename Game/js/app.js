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
    });

    let stage0 = $('.stage-0'),
        stage1 = $('.stage-1'),
        stage2 = $('.stage-2'),
        stage3 = $('.stage-3'),

        img0 = $('#pressShopStage'),
        img1 = $('#weldingShopStage'),
        img2 = $('#paintShopStage'),
        img3 = $('#assemblyStage');

    if (img0.hasClass('gameStageCompleted')) {
        stage0.addClass('hidden');
    }

    if (img1.hasClass('gameStageCompleted')) {
        stage1.css({'display': 'none'});
    }

    if (img2.hasClass('gameStageCompleted')) {
        stage2.css({'display': 'none'});
    }

    if (img3.hasClass('gameStageCompleted')) {
        stage3.css({'display': 'none'});
    }



});