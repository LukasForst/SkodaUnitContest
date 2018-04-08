export default class Player {

    constructor() {

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

    update() {
        // rotation
        this.rotation = Math.min((this.speed / 10) * 90, 90);

        // apply rotation and top
        this.el.css({
            'transform': 'rotate(' + this.rotation + 'deg)',
            top: this.top
        });
    }

    jump() {
        this.speed = this.jumpSize;
    }

}