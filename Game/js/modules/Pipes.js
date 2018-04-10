export default class Pipes {

    constructor(gameScene) {

        this.array = [];
        this.pipeHeight = 180;
        this.pipeWidth = 52;

        this.gameScene = gameScene;
        this.gameSceneH = gameScene.height();
    }

    updatePipes() {

        // remove pipes
        $(".pipe").filter(function () {
            return $(this).position().left <= -100;
        }).remove();

        // add a new pipe (top height + bottom height + pipeheight == gameSceneH) and put it in our tracker
        let padding = 80,
            constraint = this.gameSceneH - this.pipeHeight - (padding * 2), // double padding (for top and bottom)
            topHeight = Math.floor((Math.random() * constraint) + padding), // add lower padding
            bottomHeight = (this.gameSceneH - this.pipeHeight) - topHeight,
            newPipe =
                $('<div class="pipe animated">'  +
                '<div class="pipe_upper" style="height: ' + topHeight + 'px;"></div>' +
                '<div class="pipe_lower" style="height: ' + bottomHeight + 'px;"></div>' +
                '</div>');

        this.gameScene.append(newPipe);
        this.array.push(newPipe);
    }
}