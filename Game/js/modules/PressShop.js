export default class PressShop {


    constructor(gameInstance){
        this.gameInstance = gameInstance;

        //Stop skoddy from jumping
        gameInstance.removeClickableJump();

        // Hid the Skoddy scene
        $(".main_game").addClass('hidden');

        // Show welding machine
        $(".press_shop").removeClass('hidden');

    }

    start(){
        console.log("Entering press shop scene");


        //TODO all functionality (Mato, pro tebe)


        console.log("Leaving press shop scene");
        this.showSkoddyScene(); // go back to main scene
    }

    showSkoddyScene(){
        this.gameInstance.addClickableJump();
        $(".press_shop").addClass('hidden');
        $(".main_game").removeClass('hidden');

        this.gameInstance.savePointLeaving();
    }
}

