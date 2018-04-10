export default class WeldingShop {


    constructor(gameInstance){
        this.gameInstance = gameInstance;


        // Hid the Skoddy scene
        $(".main_game").addClass('hidden');

        // Show welding machine
        $(".welding_machine").removeClass('hidden');

        this.kolo1Added = false;
        this.kolo2Added = false;
        this.doorAdded = false
    }

    start(){
        console.log("Entering welding machine scene");
        //TODO all functionality

        this.setElementsClickable();


        //TODO
        // console.log("Leaving welding machine scene");
        // this.showSkoddyScene(); // go back to main scene
    }


    setElementsClickable(){

        $("#stage2kolo1").click((ev) => {
            if(this.kolo1Added) return;
            else if(this.kolo2Added && this.doorAdded){
                $(".stage2__auto").removeClass('with-right-wheel-and-door');
                $(".stage2__auto").addClass('complete');
                this.showSkoddyScene();
            }
            else if(!this.kolo2Added && !this.doorAdded){
                $(".stage2__auto").removeClass('disassembled');
                $(".stage2__auto").addClass('with-left-wheel');
            }
            else if(this.kolo2Added && !this.doorAdded){
                $(".stage2__auto").removeClass('with-right-wheel');
                $(".stage2__auto").addClass('with-wheels');
            }
            else if(!this.kolo2Added && this.doorAdded){
                $(".stage2__auto").removeClass('with-door');
                $(".stage2__auto").addClass('with-left-wheel-and-door');
            }
            this.kolo1Added = true;
            $("#stage2kolo1").addClass("hidden");
        });

        $("#stage2kolo2").click((ev) => {
            if(this.kolo2Added) return;
            else if(this.kolo1Added && this.doorAdded){
                $(".stage2__auto").removeClass('with-left-wheel-and-door');
                $(".stage2__auto").addClass('complete');
                this.showSkoddyScene();
            }
            else if(!this.kolo1Added && !this.doorAdded){
                $(".stage2__auto").removeClass('with-left-wheel');
                $(".stage2__auto").addClass('with-right-wheel-and-door');
            }
            else if(this.kolo1Added && !this.doorAdded){
                $(".stage2__auto").removeClass('with-left-wheel');
                $(".stage2__auto").addClass('with-wheels');
            }
            else if(!this.kolo1Added && this.doorAdded){
                $(".stage2__auto").removeClass('with-door');
                $(".stage2__auto").addClass('with-right-wheel-and-door');
            }
            this.kolo2Added = true;
            $("#stage2kolo2").addClass("hidden");
        });

        $("#stage2dvere").click((ev) => {
            if(this.doorAdded) return;
            else if(this.kolo1Added && this.kolo2Added ){
                $(".stage2__auto").removeClass('with-wheels');
                $(".stage2__auto").addClass('complete');
                this.showSkoddyScene();
            }
            else if(!this.kolo1Added && !this.kolo2Added ){
                $(".stage2__auto").removeClass('disassembled');
                $(".stage2__auto").addClass('with-door');
            }
            else if(this.kolo1Added && !this.kolo2Added ){
                $(".stage2__auto").removeClass('with-left-wheel');
                $(".stage2__auto").addClass('with-left-wheel-and-door');
            }
            else if(!this.kolo1Added && this.kolo2Added ){
                $(".stage2__auto").removeClass('with-right-wheel');
                $(".stage2__auto").addClass('with-right-wheel-and-door');
            }
            this.doorAdded = true;
            $("#stage2dvere").addClass("hidden");
        });
    }

    showSkoddyScene(){
        //TODO LUKY FOR YOU

        $(".welding_machine").addClass('hidden');
        $(".main_game").removeClass('hidden');


        this.gameInstance.savePointLeaving();
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

}




/* Usage
-----------------
<body>


Na tuhle pozici se smí přesouvat jiné divy
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<br>


Tenhle div mění svou pozici
<img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69">

</body>
</html>


 */