"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Roleta {
    constructor(individuos) {
        this.roleta = [];
        individuos.map((item, index) => {
            let ranking = (index * 100) / individuos.length;
            for (let i = 0; i < ranking; i++) {
                this.roleta.push(item);
            }
        });
    }
    selectionaIndividuo() {
        let index = Math.floor(Math.random() * 10);
        return this.roleta[index];
    }
}
exports.default = Roleta;
//# sourceMappingURL=roleta.js.map