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
        this.setElementsClickable();
    }

    // <div class="stage4__auto"></div>
    //
    //         <div id="stage4volant" class="stage4__auto-volant"></div>

    setElementsClickable() {

        $("#stage4volant").click((ev) => {

            $(".stage4__auto").addClass('complete');
            // $(".stage4__auto").removeClass('stage4__auto');

            $("#stage4volant").addClass("hidden");
            setTimeout(() => this.showSkoddyScene(), 2000);
        });

    }

    showSkoddyScene(){
        console.log("Leaving assembly scene");
        $(".assembly").addClass('hidden');
        $(".main_game").removeClass('hidden');

        this.gameInstance.savePointLeaving();
    }

}

