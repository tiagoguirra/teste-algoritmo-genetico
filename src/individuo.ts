import {IGenoma, IIndividuo} from './interfaces'

export default class Individuo implements IIndividuo{
    genoma: IGenoma
    classificacao: number
    constructor(color: IGenoma){
        this.genoma = color
        this.classificacao = 0
    }
    static genomaAleatorio(): Individuo{
        return new this({
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        })
    }
    avalia(){
        let rDiff = (this.genoma.r - 255) / 255 
        let gDiff = (this.genoma.g - 255) / 255
        let bDiff = (this.genoma.b - 255) / 255
        rDiff = rDiff<0?rDiff*-1:rDiff
        gDiff = gDiff<0?gDiff*-1:gDiff
        bDiff = bDiff<0?bDiff*-1:bDiff        
        this.classificacao =  (rDiff + gDiff + bDiff)/3
    }
}

