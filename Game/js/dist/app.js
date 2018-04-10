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

},{"./modules/Game":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Assembly = function () {
    function Assembly(gameInstance) {
        _classCallCheck(this, Assembly);

        this.gameInstance = gameInstance;

        // Hid the Skoddy scene
        $(".main_game").addClass('hidden');

        // Show welding machine
        $(".assembly").removeClass('hidden');
    }

    _createClass(Assembly, [{
        key: "start",
        value: function start() {
            console.log("Entering assembly scene");

            //TODO all functionality


            console.log("Leaving assembly scene");
            this.showSkoddyScene(); // go back to main scene
        }
    }, {
        key: "showSkoddyScene",
        value: function showSkoddyScene() {
            $(".assembly").addClass('hidden');
            $(".main_game").removeClass('hidden');

            this.gameInstance.savePointLeaving();
        }
    }]);

    return Assembly;
}();

exports.default = Assembly;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require("./Player");

var _Player2 = _interopRequireDefault(_Player);

var _Pipes = require("./Pipes");

var _Pipes2 = _interopRequireDefault(_Pipes);

var _GameStageHandler = require("./GameStageHandler");

var _GameStageHandler2 = _interopRequireDefault(_GameStageHandler);

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
    POLYGON_TESTING: 4,
    DEAD: 3
});

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.player = new _Player2.default();

        this.pipes = new _Pipes2.default(gameScene);
        this.onePipeScoreAddition = 10;
        this.currentScore = -10;

        this.gameStages = new _GameStageHandler2.default();

        this.savingPoints = new _Savingpoints2.default(gameScene);
        this.nextLevel = CurrentGameStage.PRESSSHOP;

        this.mode = Mode.WAIT;
        this.start();
    }

    _createClass(Game, [{
        key: "start",
        value: function start() {

            // react on any key
            this.addClickableJump();

            // handle touch start
            // todo: zkontrolovat na mobilu
            // if ("ontouchstart" in window)
            //     $(document).on("touchstart", this.activityHandler());
        }
    }, {
        key: "addClickableJump",
        value: function addClickableJump() {
            var _this = this;

            document.body.addEventListener('keydown', function () {
                return _this.activityHandler();
            });
        }
    }, {
        key: "removeClickableJump",
        value: function removeClickableJump() {
            var _this2 = this;

            document.body.removeEventListener("keydown", function () {
                return _this2.activityHandler();
            });
        }
    }, {
        key: "activityHandler",
        value: function activityHandler() {
            var _this3 = this;

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
                        _this3.runGame();
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
            this.gameStages.resetGame();
            this.player.speed = 0;
            this.player.top = 180;
            this.player.rotation = 0;
            this.player.el.css({ 'transform': 'none' });
            this.player.update();
            this.currentScore = -10;
            this.updateScore();

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
            this.currentScore += this.onePipeScoreAddition;
            console.log("New score " + this.currentScore);
            $("#scoreStats").html('<h1>Your current score: ' + this.currentScore + '</h1>');
        }
    }, {
        key: "savePointReached",
        value: function savePointReached() {
            console.log("saving point reached");
            $(".animated").addClass('stopped'); // Stop moving of currently existing elements
            this.removeClickableJump(); //Stop skoddy from jumping
            this.stopInvervals(); // Stop creating of new elements
            this.gameStages.nextStage(this); //this will call next stage
        }
    }, {
        key: "savePointLeaving",
        value: function savePointLeaving() {
            console.log("Leaving saving point.");
            // Let already created elements move again
            $(".stopped").removeClass('stopped');

            this.addClickableJump(); //make skoddy jump again

            // We need to keep the flow of the game (creating new elements :D )
            this.gameStages.leavingStage();
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

},{"./GameStageHandler":4,"./Pipes":6,"./Player":7,"./Savingpoints":9}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WeldingShop = require("./WeldingShop");

var _WeldingShop2 = _interopRequireDefault(_WeldingShop);

var _PressShop = require("./PressShop");

var _PressShop2 = _interopRequireDefault(_PressShop);

var _PaintShop = require("./PaintShop");

var _PaintShop2 = _interopRequireDefault(_PaintShop);

var _Assembly = require("./Assembly");

var _Assembly2 = _interopRequireDefault(_Assembly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameStageHandler = function () {
    function GameStageHandler() {
        _classCallCheck(this, GameStageHandler);

        this.GameStages = Object.freeze({
            START: -1,
            PRESSSHOP: 0,
            WELDINGSHOP: 1,
            PAINTSHOP: 2,
            ASSEMBLY: 3,
            POLYGON_TESTING: 4,
            COMPLETED: 5
        });

        this.activeStage = this.GameStages.PRESSSHOP;
        this.lastSavedStage = this.GameStages.PRESSSHOP;
    }

    //TODO do it more smart, load last saved game


    _createClass(GameStageHandler, [{
        key: "resetGame",
        value: function resetGame() {
            this.activeStage = this.GameStages.START;
            this.setNextActiveStage(this.activeStage);
        }
    }, {
        key: "nextStage",
        value: function nextStage(gameInstance) {
            return this.enteringStage(this.activeStage, gameInstance);
        }
    }, {
        key: "leavingStage",
        value: function leavingStage() {
            return this.setNextActiveStage(this.activeStage);
        }
    }, {
        key: "setNextActiveStage",
        value: function setNextActiveStage(currentActiveStage) {
            switch (currentActiveStage) {
                case this.GameStages.START:
                    $("#pressShopStage").attr('class', 'gameStage gameStageActive');
                    $("#weldingShopStage").attr('class', 'gameStage gameStageToExplore');
                    $("#paintShopStage").attr('class', 'gameStage gameStageToExplore');
                    $("#assemblyStage").attr('class', 'gameStage gameStageToExplore');
                    $("#polygonStage").attr('class', 'gameStage gameStageToExplore');

                    this.activeStage = this.GameStages.PRESSSHOP;
                    break;
                case this.GameStages.PRESSSHOP:
                    $("#pressShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#weldingShopStage").attr('class', 'gameStage gameStageActive');
                    $("#paintShopStage").attr('class', 'gameStage gameStageToExplore');
                    $("#assemblyStage").attr('class', 'gameStage gameStageToExplore');
                    $("#polygonStage").attr('class', 'gameStage gameStageToExplore');

                    this.activeStage = this.GameStages.WELDINGSHOP;
                    break;
                case this.GameStages.WELDINGSHOP:
                    $("#pressShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#weldingShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#paintShopStage").attr('class', 'gameStage gameStageActive');
                    $("#assemblyStage").attr('class', 'gameStage gameStageToExplore');
                    $("#polygonStage").attr('class', 'gameStage gameStageToExplore');

                    this.activeStage = this.GameStages.PAINTSHOP;
                    break;
                case this.GameStages.PAINTSHOP:
                    $("#pressShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#weldingShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#paintShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#assemblyStage").attr('class', 'gameStage gameStageActive');
                    $("#polygonStage").attr('class', 'gameStage gameStageToExplore');

                    this.activeStage = this.GameStages.ASSEMBLY;
                    break;
                case this.GameStages.ASSEMBLY:
                    $("#pressShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#weldingShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#paintShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#assemblyStage").attr('class', 'gameStage gameStageCompleted');
                    $("#polygonStage").attr('class', 'gameStage gameStageActive');

                    this.activeStage = this.GameStages.POLYGON_TESTING;
                    break;
                case this.GameStages.POLYGON_TESTING:
                    $("#pressShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#weldingShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#paintShopStage").attr('class', 'gameStage gameStageCompleted');
                    $("#assemblyStage").attr('class', 'gameStage gameStageCompleted');
                    $("#polygonStage").attr('class', 'gameStage gameStageCompleted');

                    //TODO completed handling?
                    this.activeStage = this.GameStages.COMPLETED;
                    break;
                default:
                    break;
            }
            return this.activeStage;
        }
    }, {
        key: "enteringStage",
        value: function enteringStage(gameStage, gameInstance) {
            console.log("Changing game stage to: " + gameStage);
            switch (gameStage) {
                case this.GameStages.PRESSSHOP:
                    new _PressShop2.default(gameInstance).start();
                    break;
                case this.GameStages.WELDINGSHOP:
                    new _WeldingShop2.default(gameInstance).start();
                    break;
                case this.GameStages.PAINTSHOP:
                    new _PaintShop2.default(gameInstance).start();
                    break;
                case this.GameStages.ASSEMBLY:
                    new _Assembly2.default(gameInstance).start();
                    break;
                case this.GameStages.POLYGON_TESTING:
                    //TODO completed handling?
                    break;
                default:
                    break;
            }
        }
    }]);

    return GameStageHandler;
}();

exports.default = GameStageHandler;

},{"./Assembly":2,"./PaintShop":5,"./PressShop":8,"./WeldingShop":10}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaintShop = function () {
    function PaintShop(gameInstance) {
        _classCallCheck(this, PaintShop);

        this.gameInstance = gameInstance;

        // Hid the Skoddy scene
        $(".main_game").addClass('hidden');

        // Show welding machine
        $(".paint_shop").removeClass('hidden');
    }

    _createClass(PaintShop, [{
        key: "start",
        value: function start() {
            console.log("Entering paint shop scene");

            //TODO all functionality


            console.log("Leaving paint shop scene");
            this.showSkoddyScene(); // go back to main scene
        }
    }, {
        key: "showSkoddyScene",
        value: function showSkoddyScene() {
            $(".paint_shop").addClass('hidden');
            $(".main_game").removeClass('hidden');

            this.gameInstance.savePointLeaving();
        }
    }]);

    return PaintShop;
}();

exports.default = PaintShop;

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PressShop = function () {
    function PressShop(gameInstance) {
        _classCallCheck(this, PressShop);

        this.gameInstance = gameInstance;

        // Hid the Skoddy scene
        $(".main_game").addClass('hidden');

        // Show welding machine
        $(".press_shop").removeClass('hidden');
    }

    _createClass(PressShop, [{
        key: "start",
        value: function start() {
            console.log("Entering press shop scene");

            //TODO all functionality (Mato, pro tebe)


            console.log("Leaving press shop scene");
            this.showSkoddyScene(); // go back to main scene
        }
    }, {
        key: "showSkoddyScene",
        value: function showSkoddyScene() {
            $(".press_shop").addClass('hidden');
            $(".main_game").removeClass('hidden');

            this.gameInstance.savePointLeaving();
        }
    }]);

    return PressShop;
}();

exports.default = PressShop;

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeldingShop = function () {
    function WeldingShop(gameInstance) {
        _classCallCheck(this, WeldingShop);

        this.gameInstance = gameInstance;

        // Hid the Skoddy scene
        $(".main_game").addClass('hidden');

        // Show welding machine
        $(".welding_machine").removeClass('hidden');
    }

    _createClass(WeldingShop, [{
        key: "start",
        value: function start() {
            console.log("Entering welding machine scene");
            //TODO all functionality


            console.log("Leaving welding machine scene");
            this.showSkoddyScene(); // go back to main scene
        }
    }, {
        key: "showSkoddyScene",
        value: function showSkoddyScene() {
            $(".welding_machine").addClass('hidden');
            $(".main_game").removeClass('hidden');

            this.gameInstance.savePointLeaving();
        }
    }, {
        key: "allowDrop",
        value: function allowDrop(ev) {
            ev.preventDefault();
        }
    }, {
        key: "drag",
        value: function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }
    }, {
        key: "drop",
        value: function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
        }
    }]);

    return WeldingShop;
}();

/* Usage
-----------------
<body>


Na tuhle pozici se smí přesouvat jiné divy
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<br>


Tenhle div mění svou pozici
<img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69">

</body>
</html>


 */


exports.default = WeldingShop;

},{}]},{},[1]);
