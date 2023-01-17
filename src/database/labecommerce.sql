-- Active: 1673958593779@@127.0.0.1@3306

--Criando tabela de users
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);

--Populando tabela de users
INSERT INTO users(id, email, password)
VALUES("a001", "João@gmail.com", "maria123");

INSERT INTO users(id, email, password)
VALUES("a002", "Gleice@gmail.com", "Gleice123");

INSERT INTO users(id, email, password)
VALUES("a003", "Pedro@gmail.com", "Pedro123");


--verificar como está a tabela
-- SELECT *  from users;

--excluir tabela
DROP TABLE users;


--Tabela de produtos

CREATE TABLE products (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT  NOT NULL,
	price REAL NOT NULL,
    category TEXT NOT NULL
 );

--Populando a tabela de produtos
INSERT INTO products(id, name, price, category)
VALUES("a01", "mesa", 800.99, "casa");

INSERT INTO products(id, name, price, category)
VALUES("a02", "mesa", 800.99, "casa");

INSERT INTO products(id, name, price, category)
VALUES("a03", "Poltrona", 350, "casa");

INSERT INTO products(id, name, price, category)
VALUES("a04", "cadeira de balanço", 250.99, "casa");

INSERT INTO products(id, name, price, category)
VALUES("a05", "cama box de casal", 1200, "casa");

--Verificando a tabela
SELECT *  from products;

--editando um item da tabela que fiz repetido
UPDATE products 
SET name = "Guarda roupa", price =100
WHERE id = "a02";

--editando valor do item da tabela
UPDATE products
SET price = 1530.99
WHERE id = "a02"


--exercicio da tarde
--01
--retorna todos os usuários cadastrados
SELECT *  from products;
SELECT *  from users;
--mocke um termo de busca, por exemplo "monitor"
--retorna o resultado baseado no termo de busca
SELECT * FROM products
WHERE name ="mesa";

-- mocke um novo usuário
-- insere o item mockado na tabela users
INSERT INTO users(id, email, password)
VALUES("a06", "pedroca1@gmail.com", "pedroca1123");


-- mocke um novo produto
-- insere o item mockado na tabela products
INSERT INTO products(id, name, price, category)
VALUES("a006", "almofadas", 150.99, "casa");

SELECT *  from products;

--exercicio 2
-- mocke uma id de products
-- busca baseada no valor mockado
SELECT * FROM products
WHERE id= "a006";

-- mocke uma id de users
-- delete a linha baseada no valor mockado

DELETE  FROM users
WHERE id="a06";

-- mocke uma id no products
-- delete a linha baseada no valor mockadomocke uma id
-- delete a linha baseada no valor mockado

DELETE FROM products
WHERE id = "a006";

-- mocke valores para editar um user
-- edite a linha baseada nos valores mockados
UPDATE users SET email="maiarama@gmail.com", password="maiara12" WHERE id="a001";


-- mocke valores para editar um product
-- edite a linha baseada nos valores mockados
UPDATE products SET price=1055.99 WHERE id="a02";


--exercicio 3
-- retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email asc;

-- products- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item

SELECT * FROM products
ORDER BY price asc LIMIT 20;


-- PRODUCTS mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT * FROM products
WHERE price >= "800" AND price <="1500"
ORDER BY price ASC;