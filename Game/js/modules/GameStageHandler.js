import StageDialogHandler from "./StageDialogHandler";

import WeldingShop from "./WeldingShop";
import PressShop from "./PressShop";
import PaintShop from "./PaintShop";
import Assembly from "./Assembly";

export default class GameStageHandler {
    constructor() {
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

        this.dialogButton = $(".stageButton");
        this.dialogStageInfoBox = $(".stageInfoBox");
        this.dialogStageInfoTextBox = $(".stageInfoTextBox");
    }

    //TODO do it more smart, load last saved game
    resetGame() {
        this.activeStage = this.GameStages.START;
        this.setNextActiveStage(this.activeStage);
        this.activeStage = this.GameStages.PRESSSHOP;
    }

    nextStage(gameInstance) {
        return this.enteringStage(this.activeStage, gameInstance);
    }

    leavingStage(gameInstance) {
        this.setNextActiveStage(this.activeStage);

        this.dialogStageInfoTextBox.text("You are back in game fella!!");
        this.dialogStageInfoBox.removeClass("hidden");
        this.dialogButton.unbind();
        this.dialogButton.click(() => {
            this.dialogStageInfoBox.addClass("hidden");
            gameInstance.resumeGame();
        });
    }

    setNextActiveStage(currentActiveStage) {
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
                this.activeStage = this.GameStages.COMPLETED;

                //TODO completed handling?
                break;
            default:
                break;
        }
        return this.activeStage;
    }

    enteringStage(gameStage, gameInstance) {
        switch (gameStage) {
            case this.GameStages.PRESSSHOP:
                this.dialogStageInfoTextBox.text("Now you are going to the Press Shop phase!");
                this.dialogStageInfoBox.removeClass("hidden");
                this.dialogButton.unbind();
                this.dialogButton.click(() => {
                    this.dialogStageInfoBox.addClass("hidden");
                    // new PressShop(gameInstance).start();
                    gameInstance.savePointLeaving();
                });
                break;

            case this.GameStages.WELDINGSHOP:
                this.dialogStageInfoTextBox.text("Now you are going to the Welding Shop phase!");
                this.dialogStageInfoBox.removeClass("hidden");
                this.dialogButton.unbind();
                this.dialogButton.click(() => {
                    this.dialogStageInfoBox.addClass("hidden");
                    // new WeldingShop(gameInstance).start();
                    gameInstance.savePointLeaving();
                });
                break;

            case this.GameStages.PAINTSHOP:
                this.dialogStageInfoTextBox.text("Now you are going to the Paint Shop phase!");
                this.dialogStageInfoBox.removeClass("hidden");
                this.dialogButton.unbind();
                this.dialogButton.click(() => {
                    this.dialogStageInfoBox.addClass("hidden");
                    new PaintShop(gameInstance).start();
                });
                break;

            case this.GameStages.ASSEMBLY:
                // new Assembly(gameInstance).start(); //uncomment after creating
                this.dialogStageInfoTextBox.text("Now you are going to the Assembly phase!");
                this.dialogStageInfoBox.removeClass("hidden");
                this.dialogButton.unbind();
                this.dialogButton.click(() => {
                    this.dialogStageInfoBox.addClass("hidden");
                    new Assembly(gameInstance).start(); //uncomment after creating
                });
                break;

            case this.GameStages.POLYGON_TESTING:
                //TODO completed handling?
                break;

            default:
                break;
        }
    }
}