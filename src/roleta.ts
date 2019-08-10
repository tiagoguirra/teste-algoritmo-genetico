import Individuo from './individuo'
export default class Roleta {
    roleta: Individuo[] = []
    constructor(individuos: Individuo[]){
        // for(let i = 0; i< individuos.length;i++){
        //     let individuo = individuos[i]
        //     let chanceRoleta = Math.floor(individuo.classificacao*100)
        //     for(i=0;i<chanceRoleta;i++){
        //         this.roleta.push(individuo)
        //     }
        // }
        individuos.map((item: Individuo,index: number) => {
            let ranking = (index*100)/individuos.length
            for(let i=0;i<ranking;i++){
                this.roleta.push(item)
            }
        })
    }
    selectionaIndividuo(): Individuo{
        let index = Math.floor(Math.random()*10)

        return this.roleta[index]
    }   
}