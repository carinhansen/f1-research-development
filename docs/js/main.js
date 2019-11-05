"use strict";
var Dialog = (function () {
    function Dialog() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');
        document.body.appendChild(this.overlay);
        this.element = document.createElement('div');
        this.element.classList.add('dialog');
        this.element.classList.add('dialog-start');
        document.body.appendChild(this.element);
    }
    Dialog.getInstance = function () {
        if (!this._instance) {
            this._instance = new Dialog();
        }
        return this._instance;
    };
    Dialog.prototype.setHTML = function (html) {
        this.element.innerHTML = html;
    };
    Dialog.prototype.addButton = function () {
        this.button = document.createElement('button');
        this.button.innerText = 'START';
        this.button.onclick = function () { Dialog.getInstance().startGame(); };
        this.element.appendChild(this.button);
    };
    Dialog.prototype.startGame = function () {
        Game.getInstance().startGame();
        this.element.remove();
        this.overlay.remove();
    };
    return Dialog;
}());
var Game = (function () {
    function Game() {
        this._fps = 30;
        this.running = false;
        this._fpsInterval = 1000 / this._fps;
        this._then = Date.now();
        this.gameLoop();
    }
    Game.getInstance = function () {
        if (!this._instance) {
            this._instance = new Game();
        }
        return this._instance;
    };
    Game.prototype.startGame = function () {
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
        var now = Date.now();
        var elapsed = now - this._then;
        if (this.running) {
            if (elapsed > this._fpsInterval) {
                this._then = now - (elapsed % this._fpsInterval);
            }
        }
        else {
            if (!this.dialog) {
                this.dialog = Dialog.getInstance();
                this.dialog.setHTML('<h1>KMar F1 - Pitstop</h1>' +
                    '<p>Jij bent verantwoordelijk voor de pitstop. Probeer de snelste tijd neer te zetten.</p>' +
                    '<p>Beweeg met de pijltjestoetsen en pak spullen vast met de spatiebalk.</p>' +
                    '<p>Zet de banden op de auto en vul de auto met benzine.</p>');
                this.dialog.addButton();
            }
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
//# sourceMappingURL=main.js.map