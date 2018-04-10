export default class PressShop {


    constructor(gameInstance){
        this.gameInstance = gameInstance;


        // Hid the Skoddy scene
        $(".main_game").addClass('hidden');

        // Show welding machine
        $(".press_shop").removeClass('hidden');

    }

    start(){
        console.log("Entering press shop scene");

        $('.door-line').on('click', function (e) {
            $('.stage1__plech').addClass('hidden');
            $('.door-line').removeClass('hidden');
            $('.door-cut').removeClass('hidden');
            $('#performPress').css("display","inline-block");
        });

        $('#performPress').on('click', function (e) {
            $('.door-cut').addClass('pressed');
        });
        let _this = this;
        $('.door-cut').on('click', function (e) {
            console.log(this);
            _this.showSkoddyScene();
        }).bind(this);
        // here goes change to next stage

    }


    showSkoddyScene(){
        $(".press_shop").addClass('hidden');
        $(".main_game").removeClass('hidden');
        $('.stage-0').addClass('hidden');

        // document.getElementsByClassName('pipe').addClass('hidden');
        $('.pipe').addClass('hidden');

        this.gameInstance.savePointLeaving();
    }
}

