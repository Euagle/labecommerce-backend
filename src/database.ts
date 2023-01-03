import { TUser } from "./types"
import { TProduct } from "./types"
import { TPurchase } from "./types"
export const users: TUser[] = [
  {
      id: '01',
      email: 'euagle@gmail.com',
      password: 'a123f'
    }, {
      id: '02',
      email: 'eujoao@gmail.com',
      password: 'aksdkl4'
    }]

    export const products: TProduct[] = [
        {
            id: '01',
            name: 'cama king',
            price: 1.200,
            category: 'casa'
          }, {
            id: '02',
            name: 'mesa',
            price: 1.200,
            category: 'casa'
          }]

          export const purchase: TPurchase[] = [
            {
                userId: '01',
                productId: '01',
                quantity: 2,
                totalPrice:2.200
              }, {
                userId: '02',
                productId: '02',
                quantity: 1,
                totalPrice: 2.00
              }]