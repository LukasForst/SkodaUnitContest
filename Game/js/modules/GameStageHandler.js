export default class GameStageHandler{
    constructor(){
        this.GameStages = Object.freeze({
            PRESSSHOP: 0,
            WELDINGSHOP: 1,
            PAINTSHOP: 2,
            ASSEMBLY: 3,
            POLYGON_TESTING: 4,
            COMPLETED: 5
        });

        this.currentStage = this.GameStages.PRESSSHOP;
        this.lastSavedStage = this.GameStages.PRESSSHOP;
    }

    //TODO do it more smart, load last saved game
    resetGame(){
        $("#pressShopStage").attr('class', 'gameStage gameStageActive');
        $("#weldingShopStage").attr('class', 'gameStage gameStageToExplore');
        $("#paintShopStage").attr('class', 'gameStage gameStageToExplore');
        $("#assemblyStage").attr('class', 'gameStage gameStageToExplore');
        $("#polygonStage").attr('class', 'gameStage gameStageToExplore');
        this.currentStage = this.GameStages.PRESSSHOP;
    }

    nextStage(){
        this.currentStage = this.gameStageCompleted(this.currentStage);
        return this.currentStage;
    }

    gameStageCompleted(gameStage) {
        switch (gameStage) {
            case this.GameStages.PRESSSHOP:
                $("#pressShopStage").removeClass("gameStageActive");
                $("#pressShopStage").addClass("gameStageCompleted");

                $("#weldingShopStage").removeClass("gameStageToExplore");
                $("#weldingShopStage").addClass("gameStageActive");
                return this.GameStages.WELDINGSHOP;
            case this.GameStages.ASSEMBLY:
                $("#assemblyStage").removeClass("gameStageActive");
                $("#assemblyStage").addClass("gameStageCompleted");

                $("#polygonStage").removeClass("gameStageToExplore");
                $("#polygonStage").addClass("gameStageActive");
                return this.GameStages.POLYGON_TESTING;
            case this.GameStages.PAINTSHOP:

                $("#paintShopStage").removeClass("gameStageActive");
                $("#paintShopStage").addClass("gameStageCompleted");

                $("#assemblyStage").removeClass("gameStageToExplore");
                $("#assemblyStage").addClass("gameStageActive");
                return this.GameStages.ASSEMBLY;
            case this.GameStages.POLYGON_TESTING:
                $("#polygonStage").removeClass("gameStageActive");
                $("#polygonStage").addClass("gameStageCompleted");

                return this.GameStages.COMPLETED;
            case this.GameStages.WELDINGSHOP:
                $("#weldingShopStage").removeClass("gameStageActive");
                $("#weldingShopStage").addClass("gameStageCompleted");

                $("#paintShopStage").removeClass("gameStageToExplore");
                $("#paintShopStage").addClass("gameStageActive");
                return this.GameStages.PAINTSHOP;
            default:
                break;
        }
    }
}