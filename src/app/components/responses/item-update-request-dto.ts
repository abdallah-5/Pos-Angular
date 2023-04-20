export interface ItemUpdateRequestDTO {
    name: string
    price: number
    picture: string
    sizes: SizeModel[]
}

export interface SizeModel {
    name: string
    price: number
}