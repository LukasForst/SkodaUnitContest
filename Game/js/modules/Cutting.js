class Cutting{
    metal_sheet;
    component_tab;
    pressButton;

    constructor() {
        this.metal_sheet = document.querySelector('.metal_sheet');
        this.component_tab = document.querySelector('.component_tab');
        this.pressButton = document.querySelector('.pressButton');

        metal_sheet.addEventListener('click', function (e) {
            metal_sheet.classList.add('hidden');
            createComponentTab();
        })
    }

    createComponentTab() {
        this.pressButton.classList.remove('hidden');
        this.pressButton.classList.remove('hidden');
        var img = component_tab.createElement('div');
        var btn = component_tab.createElement('button');

        img.classList.add('door');
        btn.innerHTML = 'Lisovat';
        btn.addEventListener('click', function (ev) {
            if(!img.classList.contains('pressed')){
                img.classList.add('pressed');
            }
        })
    }

}