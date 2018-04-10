(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _Game = require('./modules/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {

    // Start game if there is game__scene

    if ($('.game__scene').length) {
        new _Game2.default();
    }

    // Stage 3: changing colors

    var auto = $('.stage3__auto'),
        redBtn = $('.stage3__colors-1'),
        blueBtn = $('.stage3__colors-2');

    redBtn.on('click', function () {
        auto.removeClass('default');
        auto.removeClass('blue');
        auto.addClass('red');
    });

    blueBtn.on('click', function () {
        auto.removeClass('default');
        auto.removeClass('red');
        auto.addClass('blue');
    });
});

},{"./modules/Game":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require("./Player");

var _Player2 = _interopRequireDefault(_Player);

var _Pipes = require("./Pipes");

var _Pipes2 = _interopRequireDefault(_Pipes);

var _Savingpoints = require("./Savingpoints");

var _Savingpoints2 = _interopRequireDefault(_Savingpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gameScene = $('.game__scene'),
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
    POLYGON_TESTING: 4
});

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.player = new _Player2.default();

        this.pipes = new _Pipes2.default(gameScene);
        this.onePipeScoreAddition = 10;

        this.savingPoints = new _Savingpoints2.default(gameScene);
        this.nextLevel = CurrentGameStage.PRESSSHOP;

        this.mode = Mode.WAIT;
        this.start();
    }

    _createClass(Game, [{
        key: "start",
        value: function start() {
            var _this = this;

            // react on any key
            document.body.addEventListener('keydown', function () {
                return _this.activityHandler();
            });

            // handle touch start
            // todo: zkontrolovat na mobilu
            // if ("ontouchstart" in window)
            //     $(document).on("touchstart", this.activityHandler());
        }
    }, {
        key: "activityHandler",
        value: function activityHandler() {
            var _this2 = this;

            switch (this.mode) {
                case Mode.WAIT:
                    this.runGame();
                    break;
                case Mode.RUN:
                    this.player.jump();
                    break;
                case Mode.RETRY:
                    // hid the player and then run from default position
                    this.player.el.fadeOut(function () {
                        _this2.runGame();
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
    }, {
        key: "runGame",
        value: function runGame() {

            // set defaults
            this.player.speed = 0;
            this.player.top = 180;
            this.player.rotation = 0;
            this.player.el.css({ 'transform': 'none' });
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
    }, {
        key: "startLoopToCreateElements",
        value: function startLoopToCreateElements() {
            this.gameLoopInterval = setInterval(this.gameLoop.bind(this), 1000 / 60);
            this.pipeLoopInterval = setInterval(this.pipes.updatePipes.bind(this.pipes), 5000);
            this.savingPointsLoopInterval = setInterval(this.savingPoints.updateSavingPoints.bind(this.savingPoints), 2000);
        }
    }, {
        key: "gameLoop",
        value: function gameLoop() {
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
            if (this.player.top <= 0) this.player.top = 0;

            // Let's check the closest pipe, if there is any
            if (this.pipes.array[0] != null) {

                var nextPipe = this.pipes.array[0],
                    nextPipeUpper = nextPipe.children(".pipe_upper");

                var pipeTop = nextPipeUpper.height();
                var pipeLeft = nextPipeUpper.offset().left - 2;
                var pipeRight = pipeLeft + this.pipes.pipeWidth;
                var pipeBottom = pipeTop + this.pipes.pipeHeight;

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
            if (this.savingPoints.array[0] != null) {
                var nextSavingPoint = this.savingPoints.array[0];
                var pointLeft = nextSavingPoint.offset().left - 2;

                // We hit the saving point
                if (this.player.right > pointLeft) {

                    this.savingPoints.array.splice(0, 1); //We do not already need to check this saving point
                    this.savePointReached();
                }
            }
        }
    }, {
        key: "updateScore",
        value: function updateScore() {
            console.log("Updating score");
            this.currentScroe += this.onePipeScoreAddition;
            console.log("New score " + this.currentScroe);
            $("#scoreStats").html('<h1>Your current score: ' + this.currentScroe + '</h1>');
        }
    }, {
        key: "savePointReached",
        value: function savePointReached() {
            console.log("saving point reached");
            $(".animated").addClass('stopped'); // Stop moving of currently existing elements
            this.stopInvervals(); // Stop creating of new elements

            switch (this.nextLevel) {
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
    }, {
        key: "savePointLeaving",
        value: function savePointLeaving() {
            // Let already created elements move again
            $(".stopped").removeClass('stopped');

            // We need to keep the flow of the game (creating new elements :D )
            this.startLoopToCreateElements();
        }
    }, {
        key: "endGame",
        value: function endGame() {

            // Stop creating of new elements
            this.stopInvervals();

            // stop animation of currently existing elements
            $(".animated").addClass('stopped');

            // drop Skoddy to the floor
            var spaceToGround = Math.max(0, gameSceneH - (this.player.top + this.player.height));

            if (spaceToGround == 0) {
                // we hit the ground
                // need to correct few px
                this.player.top = gameSceneH - this.player.height;
                this.player.update();
            }

            // rotate Skoddy
            this.player.el.css({ 'transform': 'translateY(' + spaceToGround + 'px) rotate(90deg)' });

            // change mode
            this.mode = Mode.DEAD;

            // todo: show alert
            console.log('Game Over');
        }
    }, {
        key: "stopInvervals",
        value: function stopInvervals() {
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
    }]);

    return Game;
}();

exports.default = Game;

},{"./Pipes":3,"./Player":4,"./Savingpoints":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pipes = function () {
    function Pipes(gameScene) {
        _classCallCheck(this, Pipes);

        this.array = [];
        this.pipeHeight = 180;
        this.pipeWidth = 52;

        this.gameScene = gameScene;
        this.gameSceneH = gameScene.height();
    }

    _createClass(Pipes, [{
        key: 'updatePipes',
        value: function updatePipes() {

            // remove pipes
            $(".pipe").filter(function () {
                return $(this).position().left <= -100;
            }).remove();

            // add a new pipe (top height + bottom height + pipeheight == gameSceneH) and put it in our tracker
            var padding = 80,
                constraint = this.gameSceneH - this.pipeHeight - padding * 2,
                // double padding (for top and bottom)
            topHeight = Math.floor(Math.random() * constraint + padding),
                // add lower padding
            bottomHeight = this.gameSceneH - this.pipeHeight - topHeight,
                newPipe = $('<div class="pipe animated">' + '<div class="pipe_upper" style="height: ' + topHeight + 'px;"></div>' + '<div class="pipe_lower" style="height: ' + bottomHeight + 'px;"></div>' + '</div>');

            this.gameScene.append(newPipe);
            this.array.push(newPipe);
        }
    }]);

    return Pipes;
}();

exports.default = Pipes;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player() {
        _classCallCheck(this, Player);

        this.el = $('.player');

        this.gravity = 0.25;
        this.rotation = 0;
        this.speed = 0;
        this.jumpSize = -4.6;

        this.width = this.el.width();
        this.height = this.el.height();
        this.top = 180;
        this.left = this.el.position().left;
        this.right = this.left + this.width;
    }

    _createClass(Player, [{
        key: 'update',
        value: function update() {
            // rotation
            this.rotation = Math.min(this.speed / 10 * 90, 90);

            // apply rotation and top
            this.el.css({
                'transform': 'rotate(' + this.rotation + 'deg)',
                top: this.top
            });
        }
    }, {
        key: 'jump',
        value: function jump() {
            this.speed = this.jumpSize;
        }
    }]);

    return Player;
}();

exports.default = Player;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Savingpoints = function () {
    function Savingpoints(gameScene) {
        _classCallCheck(this, Savingpoints);

        this.array = [];
        this.pointHeight = 180;
        this.pointWidth = 20;

        this.gameScene = gameScene;
        this.gameSceneH = gameScene.height();
    }

    _createClass(Savingpoints, [{
        key: "updateSavingPoints",
        value: function updateSavingPoints() {

            // remove pipes
            $(".savingpoint").filter(function () {
                return $(this).position().left <= -100;
            }).remove();

            // add a new pipe (top height + bottom height + pipeheight == gameSceneH) and put it in our tracker
            var padding = 80,
                constraint = this.gameSceneH - this.pointHeight - padding * 2,
                // double padding (for top and bottom)
            topHeight = Math.floor(Math.random() * constraint + padding),
                // add lower padding
            bottomHeight = this.gameSceneH - this.pointHeight - topHeight,
                newPoint = $('<div class="savingpoint animated"></div>');

            this.gameScene.append(newPoint);
            this.array.push(newPoint);
        }
    }]);

    return Savingpoints;
}();

exports.default = Savingpoints;

},{}]},{},[1]);
