import { 
    acessarProductId, 
    users,
    products ,
    acessarProductsName,
    createPurchase,
    getAllPurchasesFromUserId, 
    purchases
} from "./database";
import cors from 'cors'

//importando o express 👇🏽
import express, { Request, Response } from 'express'
import { TProduct, TUser, TPurchase, PRODUCT_CATEGORY  } from "./types";

//invocando a função express() dentro da variável app 👇🏽
const app = express();// console.log(acessarProductsName("mouse"));
// console.log(createPurchase("1", "1", 3, 15));
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/users", (req: Request, res: Response) => {
res.status(200).send(users)
})
app.get("/products", (req: Request, res: Response) => {
    res.status(200).send( products )
    })


    app.get("/product/search", (req:Request, res: Response)=>{
        const q= req.query.q as string
         const productsFilter=products.filter((product)=>product.name.includes(q))
     res.status(200).send(productsFilter)
     })

     //Criando novo usuário

     app.post("/users", (req: Request, res: Response )=>{
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password
    
    
    
        const newUser: TUser ={
            id,
            email,
            password,
            
        }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
    })

    //Criando novo produto com o POST
    app.post("/products", (req: Request, res: Response )=>{
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category

    
    
    
        const newProduct: TProduct ={
            id,
            name,
            price,
            category
            
        }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
    })
//Compra criada com o POST

app.post("/purchase", (req:Request, res:Response)=>{
    const userId= req.body.userId
    const productId=req.body.productId
    const quantity= req.body.quantity
    const totalPrice= req.body.totalPrice
  
  const newPurchase: TPurchase ={userId, productId, quantity, totalPrice}
  purchases.push(newPurchase)
  res.status(201).send("Compra realizada com sucesso")
  
  })

  //exercicio1
//produtos procurados por id
  app.get("/products/:id", (req: Request, res: Response)=>{
    const id = req.params.id
    
const result = products.find((product)=>product.id ===id)
res.status(200).send("objeto product encontrado")
})

//compras procuradas por id
app.get("/users/:id/purchase", (req: Request, res: Response)=>{
    const id = req.params.id
    
const result = purchases.filter((purchase)=>purchase.userId ===id)
res.status(200).send(result )
})

//exercicio2
//deletar usuário por id
app.delete("/users/:id", (req: Request, res: Response)=>{
    const id = req.params.id
    const indexToRemove= users.findIndex((user)=>user.id ===id)
    if(indexToRemove >= 0){
        users.splice(indexToRemove, 1)
    }
    res.status(200).send( "User apagado com sucesso")
    })

    //deletar product por id
    app.delete("/products/:id", (req: Request, res: Response)=>{
        const id = req.params.id
        const indexToRemove= products.findIndex((product)=>product.id ===id)
        if(indexToRemove >= 0){
            products.splice(indexToRemove, 1)
        }
        res.status(200).send( "Produto apagado com sucesso")
        })


        //exercicio3
        //Editar user por id
        app.put("/users/:id", (req: Request, res: Response)=>{
            const id = req.params.id
            const newId = req.body.id as string | undefined
            const newEmail = req.body.email as string | undefined
            const newPassword = req.body.password as string |undefined

            
    
            const resultToEdit = users.find((user)=> user.id ===id)
            if(resultToEdit){
              
    resultToEdit.id=newId || resultToEdit.id
    resultToEdit.email=newEmail || resultToEdit.email
    resultToEdit.password=newPassword || resultToEdit.password


   
    
            }
            res.status(200).send("Atualização realizada com sucesso")
    
        })

        app.put("/product/:id", (req: Request, res: Response)=>{
            const id = req.params.id
            const newId = req.body.id as string | undefined
            const newName = req.body.name as string | undefined
            const newPrice = req.body.price as number 
            const newCategory = req.body.category as  PRODUCT_CATEGORY | undefined

            
    
            const resultToEdit = products.find((product)=> product.id ===id)
            if(resultToEdit){
              
    resultToEdit.id=newId || resultToEdit.id
    resultToEdit.name=newName || resultToEdit.name
    resultToEdit.price = isNaN(newPrice) ?  resultToEdit.price : newPrice
    resultToEdit.category=newCategory || resultToEdit.category



   
    
            }
            res.status(200).send("Produto atualizado com sucesso")
    
        })
            