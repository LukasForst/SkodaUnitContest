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
    }

    //TODO do it more smart, load last saved game
    resetGame() {
        this.activeStage = this.GameStages.START;
        this.setNextActiveStage(this.activeStage);
    }

    nextStage(gameInstance) {
        return this.enteringStage(this.activeStage, gameInstance);
    }

    leavingStage() {
        return this.setNextActiveStage(this.activeStage);
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

                //TODO completed handling?
                this.activeStage = this.GameStages.COMPLETED;
                break;
            default:
                break;
        }
        return this.activeStage;
    }

    enteringStage(gameStage, gameInstance) {
        console.log("Changing game stage to: " + gameStage);
        switch (gameStage) {
            case this.GameStages.PRESSSHOP:
                new PressShop(gameInstance).start();
                break;
            case this.GameStages.WELDINGSHOP:
                new WeldingShop(gameInstance).start();
                break;
            case this.GameStages.PAINTSHOP:
                new PaintShop(gameInstance).start();
                break;
            case this.GameStages.ASSEMBLY:
                new Assembly(gameInstance).start();
                break;
            case this.GameStages.POLYGON_TESTING:
                //TODO completed handling?
                break;
            default:
                break;
        }
    }
}