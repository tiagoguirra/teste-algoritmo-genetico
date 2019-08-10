"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const individuo_1 = require("./individuo");
class Populacao {
    constructor(tamanho, taxaHereditariedade = 30, indiviuos) {
        this.individuos = null;
        this.individuos = indiviuos || [];
        this.tamanho = tamanho;
        this.classificacao = 0;
        this.taxaHereditariedade = taxaHereditariedade;
    }
    adicionaIndividuos(individuo) {
        this.individuos.push(individuo);
    }
    geraAleatorio() {
        for (let i = 0; i < this.tamanho; i++) {
            this.individuos.push(individuo_1.default.genomaAleatorio());
        }
    }
    classifica() {
        this.individuos.map((individuo) => {
            individuo.avalia();
        });
    }
    ordena() {
        this.individuos.sort((a, b) => {
            return a.classificacao < b.classificacao ? -1 : 1;
        });
        this.classificacao = this.individuos[this.individuos.length - 1].classificacao;
    }
    printa() {
        console.log('======= Individuos =======');
        console.log(this.individuos);
        console.log('======= Tamanho =======');
        console.log(this.tamanho);
        console.log('======= Classificação =======');
        console.log(this.classificacao);
    }
}
exports.default = Populacao;
//# sourceMappingURL=populacao.js.map