export default class StageDialogHandler{
    constructor(){
        this.button = $(".stageButton");
        this.stageInfoBox = $(".stageInfoBox");
        this.stageInfoTextBox = $(".stageInfoTextBox");
    }

    showText(textToShow, nextStage){
        this.stageInfoTextBox.text(textToShow);
        this.button.click(() => {
            this.stageInfoBox.addClass("hidden");
            nextStage.start();
        });
        this.stageInfoBox.removeClass("hidden");
    }
}