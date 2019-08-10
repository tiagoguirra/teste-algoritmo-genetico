import Populacao from './populacao';
import Individuo from './individuo';
import Roleta from './roleta';
import * as _ from 'lodash';
import * as util from 'util';

export default class Algotimo {
  geracoes: number = 10;
  tamanhoPopulacao: number = 10;
  populacoes: Populacao[] = [];
  taxaSelecao: number = 30;
  taxaMutacao: number = 1;
  melhoresIndividuos: Individuo[] = [];
  constructor(
    geracoes: number,
    tamanhoPopulacao: number,
    taxaSelecao: number = 30,
    taxaMutacao: number = 1
  ) {
    if (!geracoes || !tamanhoPopulacao || !taxaSelecao) {
      throw new Error(
        'A taxa de seleção não pode ser igual ou inferior a zero'
      );
    }
    this.geracoes = geracoes;
    this.tamanhoPopulacao = tamanhoPopulacao;
    this.taxaSelecao = taxaSelecao;
    this.taxaMutacao = taxaMutacao;
  }

  iniciaAlgoritmo() {
    console.log(
      `++++ Executando algoritmo com ${this.geracoes} gerações e ${
        this.tamanhoPopulacao
      } individuos ++++`
    );
    do {
      this.geraNovaPopulacao();
      let ultimaGeracao = this.populacoes[this.populacoes.length - 1];
      ultimaGeracao.classifica();
      ultimaGeracao.ordena();      
      this.melhoresIndividuos.push(
        ultimaGeracao.individuos[ultimaGeracao.individuos.length - 1]
      );
    } while (this.verificaContinuidade());
    console.log('==== Algoritmo finalizado ====');
    console.log({
      geracoes: this.populacoes.length,
      melhorIndividui: this.populacoes[this.populacoes.length - 1].individuos[
        this.populacoes[this.populacoes.length - 1].individuos.length - 1
      ],
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
      // novaPopulacao.printa()
    } else {
      let genesis = new Populacao(this.tamanhoPopulacao);
      genesis.geraAleatorio();
      // console.log("==== Genesis ====")      
      // genesis.printa()
      this.populacoes.push(genesis);
    }
  }
  crossOver(populacao: Populacao): Populacao {
    let novaPopulacao = new Populacao(this.tamanhoPopulacao, this.taxaSelecao);
    let individuosSelecionado: Individuo[] = [];
    let quantidadeSelecao: number =
      (this.tamanhoPopulacao * this.taxaSelecao) / 100;
    if (quantidadeSelecao < this.tamanhoPopulacao) {
      quantidadeSelecao = quantidadeSelecao<=0?3:quantidadeSelecao

      for (let i = 1; i <= quantidadeSelecao; i++) {
        individuosSelecionado.push(
          _.cloneDeep(populacao.individuos[populacao.individuos.length - i])
        );
      }
    }
    let roleta = new Roleta(individuosSelecionado);

    let mapemantoGenoma = Object.keys({ r: '', g: '', b: '' });
    while (novaPopulacao.individuos.length < this.tamanhoPopulacao) {
      let pai: Individuo = roleta.selectionaIndividuo();
      let mae: Individuo = roleta.selectionaIndividuo();
      let inicioCrossOver = Math.floor(Math.random() * 3);
      let mapCrossOver = mapemantoGenoma.slice(inicioCrossOver, inicioCrossOver + 2);
      let novoGenoma = { ...mae.genoma };
      mapCrossOver.map(itemGenoma => {
        novoGenoma[itemGenoma] = pai.genoma[itemGenoma];
      });
      novaPopulacao.adicionaIndividuos(new Individuo(novoGenoma));
    }
    return novaPopulacao;
  }
  mutacao(populacao: Populacao): Populacao {
    let populacaoMutada = populacao.individuos.map((individuo: Individuo) => {
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
