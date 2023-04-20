export interface ItemAddRequestDTO {
    name: string
    price: number
    picture: string
    sizes: Size[]
}

export interface Size {
    name: string
    price: number
  }
  