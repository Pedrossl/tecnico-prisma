
# Título do Projeto

```md
# API de Restaurante com Node.js, TypeScript, Prisma & MySQL

Este é um guia passo a passo para construir uma API RESTful simples para um restaurante. A API permitirá gerenciar pessoas (clientes), comidas (itens do menu) e pedidos, utilizando um stack moderno e robusto.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript no lado do servidor.
* **Express**: Framework web para Node.js.
* **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
* **Prisma**: ORM (Object-Relational Mapper) de próxima geração para Node.js e TypeScript.
* **MySQL**: Sistema de gerenciamento de banco de dados relacional.

## 📁 Estrutura de Pastas

A organização do projeto seguirá uma estrutura modular e clara para separar as responsabilidades.


## ⚙️ Configuração do Projeto

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### 1. Inicialização e Dependências

Primeiro, crie o diretório do projeto e inicialize o `npm`.

```bash
# Criar e acessar o diretório do projeto
mkdir restaurant-api
cd restaurant-api

# Inicializar o projeto Node.js
npm init -y
````

Agora, instale as dependências de produção e de desenvolvimento.

```bash
npm init -y

# Dependências de produção
npm install express @prisma/client

# Dependências de desenvolvimento
npm install typescript ts-node @types/node @types/express --save-dev
```

### 2\. Configuração do TypeScript e Prisma

Inicialize os arquivos de configuração do TypeScript e do Prisma.

```bash
# Criar o arquivo tsconfig.json
npx tsc --init

# Inicializar o Prisma (cria a pasta /prisma e o arquivo .env)
npx prisma init
```

### 3\. Variáveis de Ambiente

Configure a string de conexão com seu banco de dados MySQL no arquivo `.env`. Certifique-se de que o banco de dados `restaurant` já exista no seu servidor MySQL.

**`.env`**

```env
DATABASE_URL="mysql://user:password@localhost:3306/restaurant"
# Exemplo:
# DATABASE_URL="mysql://lobato:1234@localhost:3306/restaurant"
```

-----

## 📜 Schema do Prisma

Defina os modelos de dados no arquivo `prisma/schema.prisma`. Este schema será a fonte da verdade para a estrutura do seu banco de dados.

**`prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Person {
  id      Int     @id @default(autoincrement())
  name    String
  email   String  @unique
  orders  Order[]
}

model Food {
  id      Int     @id @default(autoincrement())
  name    String
  price   Float
  orders  Order[]
}

model Order {
  id        Int      @id @default(autoincrement())
  person    Person   @relation(fields: [personId], references: [id])
  personId  Int
  food      Food     @relation(fields: [foodId], references: [id])
  foodId    Int
  quantity  Int
  createdAt DateTime @default(now())
}
```

-----

## 🔄 Migração do Banco de Dados

Com o schema definido, crie as tabelas no banco de dados e gere o Prisma Client.

```bash
# Cria uma nova migração e aplica as mudanças ao banco de dados
npx prisma migrate dev

# Gera o Prisma Client com base no schema atualizado
npx prisma generate
```

-----

## 🖥️ Implementação do Código

Agora, vamos criar os arquivos de código da aplicação.

### Controllers

Os controllers contêm a lógica para processar as requisições.

**`src/controllers/personController.ts`**

```typescript
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getPersons = async (req: Request, res: Response) => {
  const persons = await prisma.person.findMany();
  res.json(persons);
};

export const createPerson = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const person = await prisma.person.create({ data: { name, email } });
  res.status(201).json(person);
};
```

**`src/controllers/foodController.ts`**

```typescript
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getFoods = async (req: Request, res: Response) => {
  const foods = await prisma.food.findMany();
  res.json(foods);
};

export const createFood = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  const food = await prisma.food.create({ data: { name, price } });
  res.status(201).json(food);
};
```

**`src/controllers/orderController.ts`**

```typescript
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({ 
    include: { person: true, food: true } 
  });
  res.json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
  const { personId, foodId, quantity } = req.body;
  const order = await prisma.order.create({ 
    data: { personId, foodId, quantity } 
  });
  res.status(201).json(order);
};
```

### Rotas (Routes)

As rotas mapeiam os endpoints HTTP para os métodos dos controllers.

**`src/routes/personRoutes.ts`**

```typescript
import { Router } from 'express';
import { getPersons, createPerson } from '../controllers/personController';

const router = Router();

router.get('/', getPersons);
router.post('/', createPerson);

export default router;
```

**`src/routes/foodRoutes.ts`**

```typescript
import { Router } from 'express';
import { getFoods, createFood } from '../controllers/foodController';

const router = Router();

router.get('/', getFoods);
router.post('/', createFood);

export default router;
```

**`src/routes/orderRoutes.ts`**

```typescript
import { Router } from 'express';
import { getOrders, createOrder } from '../controllers/orderController';

const router = Router();

router.get('/', getOrders);
router.post('/', createOrder);

export default router;
```

### Ponto de Entrada (Entry Point)

O arquivo `index.ts` configura e inicia o servidor Express.

**`src/index.ts`**

```typescript
import express from 'express';
import personRoutes from './routes/personRoutes';
import foodRoutes from './routes/foodRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Registro das rotas
app.use('/persons', personRoutes);
app.use('/foods', foodRoutes);
app.use('/orders', orderRoutes);

app.listen(PORT, () => 
  console.log(`🚀 API running at http://localhost:${PORT}`)
);
```

-----

## 🚀 Executando a Aplicação

Para iniciar o servidor da API, execute o comando a seguir na raiz do projeto:

```bash
npx ts-node src/index.ts
```

Você verá a mensagem `🚀 API running at http://localhost:3000` no console.

-----

## ✅ Testando a API

Use uma ferramenta como **Postman**, **Insomnia** ou `curl` para testar os endpoints:

  * **Listar Pessoas**: `GET /persons`
  * **Criar Pessoa**: `POST /persons`
      * Body: `{ "name": "João Silva", "email": "joao@example.com" }`
  * **Listar Comidas**: `GET /foods`
  * **Criar Comida**: `POST /foods`
      * Body: `{ "name": "Pizza Margherita", "price": 45.50 }`
  * **Listar Pedidos**: `GET /orders`
  * **Criar Pedido**: `POST /orders`
      * Body: `{ "personId": 1, "foodId": 1, "quantity": 2 }`
