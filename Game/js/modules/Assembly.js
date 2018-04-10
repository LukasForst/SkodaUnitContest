export default class Assembly {


    constructor(gameInstance){
        this.gameInstance = gameInstance;


        // Hid the Skoddy scene
        $(".main_game").addClass('hidden');

        // Show welding machine
        $(".assembly").removeClass('hidden');

    }

    start(){
        console.log("Entering assembly scene");


        //TODO all functionality


        console.log("Leaving assembly scene");
        this.showSkoddyScene(); // go back to main scene
    }

    showSkoddyScene(){
        $(".assembly").addClass('hidden');
        $(".main_game").removeClass('hidden');

        this.gameInstance.savePointLeaving();
    }
}

