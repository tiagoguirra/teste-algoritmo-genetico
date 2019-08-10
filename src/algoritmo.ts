import Populacao from './populacao';
import Individuo from './individuo';
import Roleta from './roleta';
import * as _ from 'lodash';
import * as util from 'util';

export default class Algotimo {
  geracoes: number = 10;
  tamanhoPopulacao: number = 10;
  populacoes: Populacao[] = [];
  taxaHereditariedade: number = 30;
  taxaMutacao: number = 1;
  melhoresIndividuos: Individuo[] = [];
  constructor(
    geracoes: number,
    tamanhoPopulacao: number,
    taxaHereditariedade: number = 30,
    taxaMutacao: number = 1
  ) {
    this.geracoes = geracoes;
    this.tamanhoPopulacao = tamanhoPopulacao;
    this.taxaHereditariedade = taxaHereditariedade;
    this.taxaMutacao = taxaMutacao;
  }

  iniciaAlgoritmo() {
    console.log(`++++ Executando algoritmo com ${this.geracoes} gerações e ${this.tamanhoPopulacao} individuos ++++`)    
    do {
      this.geraNovaPopulacao();
      let ultimaGeracao = this.populacoes[this.populacoes.length - 1];      
      ultimaGeracao.classifica();
      ultimaGeracao.ordena();
    //   console.log(`++++++ Geração n ${this.populacoes.length} ++++++`);
    //   ultimaGeracao.printa();
      this.melhoresIndividuos.push(ultimaGeracao.individuos[ultimaGeracao.individuos.length - 1])
    } while (this.verificaContinuidade());    
    console.log('==== Algoritmo finalizado ====');
    console.log({
      geracoes: this.populacoes.length,
      melhorIndividui: this.populacoes[
          this.populacoes.length - 1].individuos[
              this.populacoes[this.populacoes.length - 1].individuos.length - 1
            ],
      classificacaoFinal: this.populacoes[this.populacoes.length - 1]
        .classificacao
    });
    // console.log(util.inspect(this.melhoresIndividuos, { showHidden: false, depth: null }))
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
    //   console.log('===> Gerando nova população');
      let novaPopulacao = this.crossOver(ultimaGeracao);
      novaPopulacao = this.mutacao(novaPopulacao);
      this.populacoes.push(novaPopulacao);
    } else {
      let genesis = new Populacao(this.tamanhoPopulacao);
      genesis.geraAleatorio();
      this.populacoes.push(genesis);
    }
  }
  crossOver(populacao: Populacao): Populacao {
    let novaPopulacao = new Populacao(
      this.tamanhoPopulacao,
      this.taxaHereditariedade
    );
    let quantidadeHereditarios: number =
      (this.tamanhoPopulacao * this.taxaHereditariedade) / 100;
    if (
      quantidadeHereditarios > 0 &&
      quantidadeHereditarios < this.tamanhoPopulacao
    ) {
      for (let i = 1; i <= quantidadeHereditarios; i++) {
        novaPopulacao.adicionaIndividuos(
          populacao.individuos[populacao.individuos.length - i]
        );
      }
    }
    let restante = _.cloneDeep(populacao.individuos);
    restante = restante.slice(quantidadeHereditarios);
    let roleta = new Roleta(restante);

    let mapemantoGenoma = Object.keys({ r: '', g: '', b: '' });       
    for (let i = 0; i < restante.length; i++) {
      let pai: Individuo = roleta.selectionaIndividuo();
      let mae: Individuo = roleta.selectionaIndividuo();
      let inicioCrossOver = Math.floor(Math.random() * 3);
      let mapCrossOver = mapemantoGenoma.slice(inicioCrossOver,  + 2);
      let novoGenoma = { ...mae.genoma };
      mapCrossOver.map(itemGenoma => {
        novoGenoma[itemGenoma] = pai.genoma[itemGenoma];
      });
      novaPopulacao.adicionaIndividuos(new Individuo(novoGenoma));
    }
    // console.log('=== gera cross over');
    // console.log(
    //   util.inspect(novaPopulacao, { showHidden: false, depth: null })
    // );
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
    // console.log('=== gera mutacao');
    // console.log(util.inspect(populacao, { showHidden: false, depth: null }));
    return populacao;
  }
}
