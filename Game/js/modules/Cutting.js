export default class Cutting {
    // door_cut;
    // pressButton;
    // door_line;
    // metal_sheet;

    constructor() {

        this.door_cut = $('.door-cut');
        // this.pressButton;
        // this.door_line;
        // this.metal_sheet;

        this.metal_sheet = $('.stage1__plech');
        this.door_line = $('.door-line');
        this.pressButton = $('#performPress');

        this.init();
    }

    init() {
        this.door_line.on('click', function (e) {
            // $('.stage1__plech').addClass('hidden')
            this.metal_sheet.addClass('hidden');
            this.createComponentTab();
        })
    }

    createComponentTab() {
        this.pressButton.removeClass('hidden');
        this.pressButton.on('click', function (ev) {
            this.door_cut.removeClass('hidden')
        })

    }

}