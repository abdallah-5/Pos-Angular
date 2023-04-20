export interface CartResponse {
    responseModel : ProductInCartModel[];
    orderTotal: number;
}

export interface ProductInCartModel {
    id: number
    productId: number
    name: string
    picture: string
    price: number
    count: number
    totalItemPrice: number
 
}