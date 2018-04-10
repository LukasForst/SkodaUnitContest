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


        //TODO all functionality


        console.log("Leaving paint shop scene");
        this.showSkoddyScene(); // go back to main scene
    }

    showSkoddyScene(){
        $(".paint_shop").addClass('hidden');
        $(".main_game").removeClass('hidden');

        this.gameInstance.savePointLeaving();
    }
}

