export interface IPopulacao{
    individuos: IIndividuo[],
    tamanho: number,
    classificacao: number,
    geraAleatorio(): void,
    classifica(): void,
    ordena(): void,
    printa(): void
}
export interface IGenoma  {
    r: number,
    g: number,
    b: number
}

export interface IIndividuo{
    genoma: IGenoma,
    classificacao: number,    
    avalia(): void
}