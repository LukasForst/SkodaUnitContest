export default class PaintShop {


    constructor(gameInstance){
        this.gameInstance = gameInstance;


        // Hid the Skoddy scene
        $(".main_game").addClass('hidden');

        // Show welding machine
        $(".paint_shop").removeClass('hidden');

    }

    start(){
        console.log("Entering paint shop scene");


        setTimeout(() => this.showSkoddyScene(), 5000);

    }

    showSkoddyScene(){
        console.log("Leaving paint shop scene");
        $(".paint_shop").addClass('hidden');
        $(".main_game").removeClass('hidden');

        this.gameInstance.savePointLeaving();
    }
}

