export default class Cutting {
    // door_cut;
    // pressButton;
    // door_line;
    // metal_sheet;

    constructor() {

        this.door_cut = $('.door-cut');
        this.door_line = $('.door-line');
        this.pressButton = $('#performPress');

        this.init();
    }

    init() {
        this.door_line.on('click', function (e) {
            $('.stage1__plech').addClass('hidden');
            $('.door-line').removeClass('hidden');
            $('.door-cut').removeClass('hidden');
            $('#performPress').css("display","inline-block");
        });

        $('#performPress').on('click', function (e) {
            $('.door-cut').addClass('pressed');
            console.log('waiting');
            window.setTimeout( function () {
                // here goes change to next stage
            }, 2000 );
        });
    }


}