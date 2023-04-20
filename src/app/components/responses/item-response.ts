export interface ItemResponse {
    id: number
    name: string
    price: number
    picture: string
    sizes: SizeModel[]
}

export interface SizeModel {
    name: string
    price: number
}