import Player from "./Player";
import Pipes from "./Pipes";
import Savingpoints from "./Savingpoints";

const
    gameScene = $('.game__scene'),
    gameSceneH = gameScene.height(),

    // "enum"
    Mode = Object.freeze({
        WAIT: 0,
        RUN: 1,
        RETRY: 2,
        DEAD: 3,
        SAVING: 4
    }),

    CurrentGameStage = Object.freeze({
       PRESSSHOP: 0,
       WELDINGSHOP: 1,
       PAINTSHOP: 2,
       ASSEMBLY: 3,
       POLYGON_TESTING: 4,
    });

export default class Game {


    constructor() {
        this.player = new Player();

        this.pipes = new Pipes(gameScene);
        this.onePipeScoreAddition = 10;

        this.savingPoints = new Savingpoints(gameScene);
        this.nextLevel = CurrentGameStage.PRESSSHOP;

        this.mode = Mode.WAIT;
        this.start();
    }

    start() {

        // react on any key
        document.body.addEventListener('keydown', () => this.activityHandler());

        // handle touch start
        // todo: zkontrolovat na mobilu
        // if ("ontouchstart" in window)
        //     $(document).on("touchstart", this.activityHandler());
    }

    activityHandler() {
        switch (this.mode) {
            case Mode.WAIT:
                this.runGame();
                break;
            case Mode.RUN:
                this.player.jump();
                break;
            case Mode.RETRY:
                // hid the player and then run from default position
                this.player.el.fadeOut(() => {
                    this.runGame();
                });

                break;
            case Mode.DEAD:
                // hid the player and then run from default position
                // this.player.el.fadeOut(() => {
                // });
                console.log("Starting the game");
                this.runGame();
                //     this.runGame();
                break;
            case Mode.SAVING:
                //TODO something
                console.log("Saving");
                this.mode = Mode.RUN; //temporary, feel free to change
                break;
            default:
                return;
        }
    }

    runGame() {

        // set defaults
        this.player.speed = 0;
        this.player.top = 180;
        this.player.rotation = 0;
        this.player.el.css({'transform': 'none'});
        this.player.update();
        this.currentScroe = 0;

        // clear out all the pipes if there are any
        $(".pipe").remove();
        this.pipes.array = [];

        // clear out all the saving points if there are any
        $(".savingpoint").remove();
        this.savingPoints.array = [];

        // run the game
        this.startLoopToCreateElements();

        // change mode
        this.mode = Mode.RUN;
    }

    startLoopToCreateElements(){
        this.gameLoopInterval = setInterval(this.gameLoop.bind(this), 1000 / 60);
        this.pipeLoopInterval = setInterval(this.pipes.updatePipes.bind(this.pipes), 5000);
        this.savingPointsLoopInterval = setInterval(this.savingPoints.updateSavingPoints.bind(this.savingPoints), 2000);
    }

    gameLoop() {
        // update player's speed and top position
        this.player.speed += this.player.gravity;
        this.player.top += this.player.speed;
        this.player.update();

        // did we hit the ground?
        if (this.player.top + this.player.height >= gameSceneH) {
            this.endGame();
            return;
        }

        // did we hit the ceiling?
        if (this.player.top <= 0)
            this.player.top = 0;

        // Let's check the closest pipe, if there is any
        if (this.pipes.array[0] != null) {

            let nextPipe = this.pipes.array[0],
                nextPipeUpper = nextPipe.children(".pipe_upper");

            let pipeTop = nextPipeUpper.height();
            let pipeLeft = nextPipeUpper.offset().left - 2;
            let pipeRight = pipeLeft + this.pipes.pipeWidth;
            let pipeBottom = pipeTop + this.pipes.pipeHeight;

            // inside pipe
            if (this.player.right > pipeLeft) {
                if (this.player.top > pipeTop && this.player.top + this.player.height < pipeBottom) {
                    // we passed
                } else {
                    // we touched the pipe
                    this.endGame();
                    return;
                }
            }

            // have we passed the pipe?
            if (this.player.left > pipeRight) {
                // yes, remove it
                this.pipes.array.splice(0, 1);
            }

            // have we passed the pipe?
            if (this.player.left > pipeRight) {
                // yes, remove it
                this.pipes.array.splice(0, 1);
                this.updateScore();
            }
        }


        // Let's check the closest saving point, if there is any
        if(this.savingPoints.array[0] != null){
            let nextSavingPoint = this.savingPoints.array[0];
            let pointLeft = nextSavingPoint.offset().left - 2;


            // We hit the saving point
            if(this.player.right > pointLeft){

                this.savingPoints.array.splice(0, 1); //We do not already need to check this saving point
                this.savePointReached();
            }
        }
    }

    updateScore(){
        console.log("Updating score");
        this.currentScroe += this.onePipeScoreAddition;
        console.log("New score " + this.currentScroe);
        $("#scoreStats").html('<h1>Your current score: ' + this.currentScroe +'</h1>');
    }

    savePointReached(){
        console.log("saving point reached");
        $(".animated").addClass('stopped');  // Stop moving of currently existing elements
        this.stopInvervals();   // Stop creating of new elements

        switch (this.nextLevel){
            case CurrentGameStage.PRESSSHOP:
                window.location.replace("./stages/stage1.html");
                this.nextLevel = CurrentGameStage.WELDINGSHOP;
                //TODO start Javascript file handling PRESSHOP
                break;

            case CurrentGameStage.WELDINGSHOP:
                window.location.replace("./stages/stage2.html");
                this.nextLevel = CurrentGameStage.PAINTSHOP;
                //TODO start Javascript file handling WELDINGSHOP
                break;

            case CurrentGameStage.PAINTSHOP:
                window.location.replace("./stages/stage3.html");
                this.nextLevel = CurrentGameStage.ASSEMBLY;
                //TODO start Javascript file handling PAINTSHOP
                break;

            case CurrentGameStage.ASSEMBLY:
                window.location.replace("./stages/stage4.html");
                //TODO
                this.nextLevel = CurrentGameStage.POLYGON_TESTING;
                //TODO start Javascript file handling ASSEMBLY
                break;

            case CurrentGameStage.POLYGON_TESTING:
                window.location.replace("./stages/stage5.html");
                //TODO start Javascript file handling PolygonTesting
                //TODO end game, we have a kiddo winner!
                break;
        }

        // Go back to properly working Skoddy
        this.savePointLeaving();
    }

    savePointLeaving(){
        // Let already created elements move again
        $(".stopped").removeClass('stopped');

        // We need to keep the flow of the game (creating new elements :D )
        this.startLoopToCreateElements();
    }

    endGame() {

        // Stop creating of new elements
        this.stopInvervals();

        // stop animation of currently existing elements
        $(".animated").addClass('stopped');

        // drop Skoddy to the floor
        let spaceToGround = Math.max(0, gameSceneH - (this.player.top + this.player.height));

        if (spaceToGround == 0) {
            // we hit the ground
            // need to correct few px
            this.player.top = gameSceneH - this.player.height;
            this.player.update();
        }

        // rotate Skoddy
        this.player.el.css({'transform': 'translateY(' + spaceToGround + 'px) rotate(90deg)'});


        // change mode
        this.mode = Mode.DEAD;

        // todo: show alert
        console.log('Game Over');
    }

    stopInvervals(){
        // stop game loop
        clearInterval(this.gameLoopInterval);
        this.gameLoopInterval = null;

        // stop pipe loop
        clearInterval(this.pipeLoopInterval);
        this.pipeLoopInterval = null;

        // stop savingPoints loop
        clearInterval(this.savingPointsLoopInterval);
        this.savingPointsLoopInterval = null;
    }
}


