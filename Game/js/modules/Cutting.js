class Cutting{
    door_cut;
    pressButton;
    door_line;
    metal_sheet;
    constructor() {
        this.metal_sheet = document.querySelector('.stage1_plech');
        this.door_line = document.querySelector('.door-line');
        this.pressButton = document.querySelector('#performPress');

        this.door_line.addEventListener('click', function (e) {
            this.metal_sheet.classList.add('hidden');
            createComponentTab();
        })
    }

    createComponentTab() {
        this.pressButton.classList.remove('hidden');
        this.pressButton.addEventListener('click', function (ev) {
            this.door_cut.classList.remove('hidden')
        })

    }

}