export default class Savingpoints {

    constructor(gameScene) {

        this.array = [];
        this.pointHeight = 180;
        this.pointWidth = 120;

        this.gameScene = gameScene;
        this.gameSceneH = gameScene.height();

        this.counter = 1;
    }

    updateSavingPoints() {

        // remove pipes
        $(".savingpoint").filter(function () {
            return $(this).position().left <= -100;
        }).remove();

        // add a new pipe (top height + bottom height + pipeheight == gameSceneH) and put it in our tracker

        if (this.counter < 4) {
            let padding = 80,
                constraint = this.gameSceneH - this.pointHeight - (padding * 2), // double padding (for top and bottom)
                topHeight = Math.floor((Math.random() * constraint) + padding), // add lower padding
                bottomHeight = (this.gameSceneH - this.pointHeight) - topHeight,
                newPoint =
                    $('<div class="savingpoint animated stage-'  + this.counter++ + '"></div>');

            this.gameScene.append(newPoint);
            this.array.push(newPoint);
        }

    }
}