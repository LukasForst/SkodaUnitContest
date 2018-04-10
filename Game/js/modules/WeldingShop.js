export default class WeldingShop {


    constructor(gameInstance){
        this.gameInstance = gameInstance;
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