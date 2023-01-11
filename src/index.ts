import { 
    users,
    products ,

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
//não precisa de validação, basta refatorar para o uso do try/catch
app.get("/users", (req: Request, res: Response) => {
    try {
      res.status(200).send(users);
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });
//não precisa de validação, basta refatorar para o uso do try/catch
app.get("/products", (req: Request, res: Response) => {
    try {
      res.status(200).send(products);
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });
  
//query params deve possuir pelo menos um caractere
    
app.get("/product/search", (req: Request, res: Response) => {
    let productFilter;
    try {
      const q = req.query.q as string;
  
      if (q.length <= 1) {
        res.status(400);
        throw new Error("query params deve possuir pelo menos um caractere");
      }
  
      productFilter = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase());
      });
      res.status(200).send(productFilter);
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });

     //Criando novo usuário
//validar o body
// extra:
// não deve ser possível criar mais de uma conta com a mesma id
// não deve ser possível criar mais de uma conta com o mesmo e-mail
app.post("/users", (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const email = req.body.email;
      const password = req.body.password;
  
      const findId = users.find((user) => user.id === id);
  
      if (findId) {
        res.status(400);
        throw new Error("ID indisponivel");
      }
  
      const findEmail = users.find((user) => user.email === email);
  
      if (findEmail) {
        res.status(400);
        throw new Error("EMAIL indisponivel");
      }
  
      const newUser: TUser = {
        id,
        email,
        password,
      };
  
      users.push(newUser);
      res.status(201).send("Usuario criado com sucesso 😎");
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });

    //Criando novo produto com o POST
//     validar o body
// extra:
// não deve ser possível criar mais de um produto com a mesma id
app.post("/products", (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const name = req.body.name;
      const price = req.body.price;
      const category = req.body.category;
  
      const findId = products.find((product) => product.id === id);
  
      if (findId) {
        res.status(400);
        throw new Error("ID indisponivel");
      }
  
      const newProduct: TProduct = {
        id,
        name,
        price,
        category,
      };
  
      products.push(newProduct);
      res.status(201).send("Produto criado com sucesso 😎");
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });
//Compra criada com o POST
// validar o body
// extra:
// id do usuário que fez a compra deve existir no array de usuários cadastrados
// id do produto que foi comprado deve existir no array de produtos cadastrados
// a quantidade e o total da compra devem estar com o cálculo correto
app.post("/purchase", (req:Request, res:Response)=>{
   
   try {
    const userId= req.body.userId
    const productId=req.body.productId
    const quantity= req.body.quantity
    const totalPrice= req.body.totalPrice
  
  const newPurchase: TPurchase ={userId, productId, quantity, totalPrice}
  purchases.push(newPurchase)
  res.status(201).send("Compra realizada com sucesso")
   
   } catch (error) {
    
   }
  })
  app.post("/purchases", (req: Request, res: Response) => {
    try {
      const userId = req.body.userId;
      const productId = req.body.productId;
      const quantity = req.body.quantity;
      const totalPrice = req.body.totalPrice;
  
      const findIdUser = purchases.find((purchase) => purchase.userId === userId);
  
      if (!findIdUser) {
        res.status(400);
        throw new Error("ID do usuario não existe");
      }
  
      const findIdProduct = products.find(
        (product) => product.id === productId
      );
  
      if (!findIdProduct) {
        res.status(400);
        throw new Error("ID do produto não existe");
      }
  
      
      if (findIdProduct.price * quantity !== totalPrice) {
          res.status(400)
          throw new Error("Total incorreto");
      }
  
      const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
      };
  
      purchases.push(newPurchase);
      res.status(201).send("Compra efetuada com sucesso 😎");
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });
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
            