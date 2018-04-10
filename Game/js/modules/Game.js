import Player from "./Player";
import Pipes from "./Pipes";
import GameStageHandler from "./GameStageHandler"

const
    gameScene = $('.game__scene'),
    gameSceneH = gameScene.height(),

    // "enum"
    Mode = Object.freeze({
        WAIT: 0,
        RUN: 1,
        RETRY: 2,
        DEAD: 3
    });


export default class Game {

    constructor() {
        this.player = new Player();
        this.pipes = new Pipes(gameScene);
        this.mode = Mode.WAIT;
        this.onePipeScoreAddition = 10;
        this.gameStages = new GameStageHandler();
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
                //     this.runGame();
                // });
                this.runGame();
                break;
            default:
                return;
        }
    }

    runGame() {
        // set defaults
        this.gameStages.resetGame();
        this.player.speed = 0;
        this.player.top = 180;
        this.player.rotation = 0;
        this.player.el.css({'transform': 'none'});
        this.player.update();
        this.currentScore = 0;

        // clear out all the pipes if there are any
        $(".pipe").remove();
        this.pipes.array = [];

        // run the game
        this.gameLoopInterval = setInterval(this.gameLoop.bind(this), 1000 / 60);
        this.pipeLoopInterval = setInterval(this.pipes.updatePipes.bind(this.pipes), 5000);

        // change mode
        this.mode = Mode.RUN;
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

        // we can't go any further without a pipe
        if (this.pipes.array[0] == null)
            return;

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
            this.updateScore();
        }
    }

    updateScore() {
        console.log("Updating score");
        this.currentScore += this.onePipeScoreAddition;
        console.log("New score " + this.currentScore);
        $("#scoreStats").html('<h1>Your current score: ' + this.currentScore + '</h1>');
        this.gameStages.nextStage();
    }

    endGame() {

        // stop animation
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


        // stop game loop
        clearInterval(this.gameLoopInterval);
        this.gameLoopInterval = null;

        // stop pipe loop
        clearInterval(this.pipeLoopInterval);
        this.pipeLoopInterval = null;

        // change mode
        this.mode = Mode.DEAD;

        // todo: show alert
        console.log('Game Over');
    }
}

