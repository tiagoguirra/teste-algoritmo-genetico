import {IPopulacao, IIndividuo} from './interfaces'
import Individuo from './individuo'

export default class Populacao implements IPopulacao{
    individuos: Individuo[] = null
    tamanho: number
    classificacao: number
    taxaHereditariedade: number 

    constructor(tamanho: number, taxaHereditariedade: number = 30, indiviuos?: Individuo[]){
        this.individuos = indiviuos || [] 
        this.tamanho = tamanho
        this.classificacao = 0
        this.taxaHereditariedade = taxaHereditariedade
    }
    adicionaIndividuos(individuo: Individuo){
        this.individuos.push(individuo)
    }
    geraAleatorio(){
        for(let i = 0; i < this.tamanho; i++){
            this.individuos.push(Individuo.genomaAleatorio())
        }
    }
    classifica(){
        this.individuos.map((individuo: Individuo)=>{
            individuo.avalia()
        })        
    }
    ordena(){
        this.individuos.sort((a: Individuo, b: Individuo) => {
            return a.classificacao < b.classificacao? -1:1
        })
        this.classificacao = this.individuos[this.individuos.length-1].classificacao
    }
    printa(){
        console.log('======= Individuos =======')
        console.log(this.individuos)
        console.log('======= Tamanho =======')
        console.log(this.tamanho)
        console.log('======= Classificação =======')
        console.log(this.classificacao)
    }    
}