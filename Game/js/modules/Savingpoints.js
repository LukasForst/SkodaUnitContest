export default class Savingpoints {

    constructor(gameScene) {

        this.array = [];
        this.pointHeight = 180;
        this.pointWidth = 20;

        this.gameScene = gameScene;
        this.gameSceneH = gameScene.height();
    }

    updateSavingPoints() {

        // remove pipes
        $(".savingpoint").filter(function () {
            return $(this).position().left <= -100;
        }).remove();

        // add a new pipe (top height + bottom height + pipeheight == gameSceneH) and put it in our tracker
        let padding = 80,
            constraint = this.gameSceneH - this.pointHeight - (padding * 2), // double padding (for top and bottom)
            topHeight = Math.floor((Math.random() * constraint) + padding), // add lower padding
            bottomHeight = (this.gameSceneH - this.pointHeight) - topHeight,
            newPoint =
                $('<div class="savingpoint animated"></div>');

        this.gameScene.append(newPoint);
        this.array.push(newPoint);
    }
}