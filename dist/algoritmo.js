"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const populacao_1 = require("./populacao");
const individuo_1 = require("./individuo");
const roleta_1 = require("./roleta");
const _ = require("lodash");
const CLI = require('clui');
class Algotimo {
    constructor(geracoes, tamanhoPopulacao, taxaHereditariedade = 30, taxaMutacao = 1) {
        this.geracoes = 10;
        this.tamanhoPopulacao = 10;
        this.populacoes = [];
        this.taxaHereditariedade = 30;
        this.taxaMutacao = 1;
        this.melhoresIndividuos = [];
        this.geracoes = geracoes;
        this.tamanhoPopulacao = tamanhoPopulacao;
        this.taxaHereditariedade = taxaHereditariedade;
        this.taxaMutacao = taxaMutacao;
    }
    iniciaAlgoritmo() {
        const spinner = new CLI.Spinner(`Executando algoritmo com ${this.geracoes} gerações e ${this.tamanhoPopulacao} individuos`);
        spinner.start();
        do {
            this.geraNovaPopulacao();
            let ultimaGeracao = this.populacoes[this.populacoes.length - 1];
            ultimaGeracao.classifica();
            ultimaGeracao.ordena();
            this.melhoresIndividuos.push(ultimaGeracao.individuos[ultimaGeracao.individuos.length - 1]);
        } while (this.verificaContinuidade());
        spinner.stop();
        console.log('==== Algoritmo finalizado ====');
        console.log({
            geracoes: this.populacoes.length,
            melhorIndividui: this.populacoes[this.populacoes.length - 1].individuos[this.populacoes[this.populacoes.length - 1].individuos.length - 1],
            classificacaoFinal: this.populacoes[this.populacoes.length - 1]
                .classificacao
        });
    }
    verificaContinuidade() {
        if (this.populacoes[this.populacoes.length - 1].classificacao >= 0.999) {
            return false;
        }
        if (this.populacoes.length >= this.geracoes) {
            return false;
        }
        return true;
    }
    geraNovaPopulacao() {
        if (this.populacoes.length > 0) {
            let ultimaGeracao = this.populacoes[this.populacoes.length - 1];
            let novaPopulacao = this.crossOver(ultimaGeracao);
            novaPopulacao = this.mutacao(novaPopulacao);
            this.populacoes.push(novaPopulacao);
        }
        else {
            let genesis = new populacao_1.default(this.tamanhoPopulacao);
            genesis.geraAleatorio();
            this.populacoes.push(genesis);
        }
    }
    crossOver(populacao) {
        let novaPopulacao = new populacao_1.default(this.tamanhoPopulacao, this.taxaHereditariedade);
        let quantidadeHereditarios = (this.tamanhoPopulacao * this.taxaHereditariedade) / 100;
        if (quantidadeHereditarios > 0 &&
            quantidadeHereditarios < this.tamanhoPopulacao) {
            for (let i = 1; i <= quantidadeHereditarios; i++) {
                novaPopulacao.adicionaIndividuos(populacao.individuos[populacao.individuos.length - i]);
            }
        }
        let restante = _.cloneDeep(populacao.individuos);
        restante = restante.slice(quantidadeHereditarios);
        let roleta = new roleta_1.default(restante);
        let mapemantoGenoma = Object.keys({ r: '', g: '', b: '' });
        let inicioCrossOver = Math.floor(Math.random() * 3);
        let mapCrossOver = mapemantoGenoma.slice(0, inicioCrossOver);
        for (let i = 0; i < restante.length; i++) {
            let pai = roleta.selectionaIndividuo();
            let mae = roleta.selectionaIndividuo();
            let inicioCrossOver = Math.floor(Math.random() * 3);
            let mapCrossOver = mapemantoGenoma.slice(0, inicioCrossOver);
            let novoGenoma = Object.assign({}, mae.genoma);
            mapCrossOver.map(itemGenoma => {
                novoGenoma[itemGenoma] = pai.genoma[itemGenoma];
            });
            novaPopulacao.adicionaIndividuos(new individuo_1.default(novoGenoma));
        }
        return novaPopulacao;
    }
    mutacao(populacao) {
        let populacaoMutada = populacao.individuos.map((individuo) => {
            let mapemantoGenoma = Object.keys({ r: '', g: '', b: '' });
            let itensMutacao = Math.floor((3 * this.taxaMutacao) / 100);
            for (let i = 0; i < itensMutacao; i++) {
                let diff = 255 - individuo.genoma[mapemantoGenoma[i]];
                let valorMutacao = Math.floor(Math.random() * 25);
                let posicaoMutacao = Math.floor(Math.random() * 3);
                individuo.genoma[mapemantoGenoma[posicaoMutacao]] = valorMutacao;
            }
            return individuo;
        });
        populacao.individuos = populacaoMutada;
        return populacao;
    }
}
exports.default = Algotimo;
//# sourceMappingURL=algoritmo.js.map