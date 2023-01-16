-- Active: 1673833765815@@127.0.0.1@3306

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
SELECT *  from users;

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