#  GameNebula

For our capstone project for the Fullstack Academy boot camp, we decided to design a full-stack e-commerce site, complete with Stripe integration, utilizing the PERN (PostgreSQL, Expressjs, React, and Nodejs) stack, with usage of MaterialUI for some components and styling as well. This project was created over the duration of a month, and we are very proud of what we were able to create together!

# Main Functionalities include...

- User account creation, authorization and authentification using JSON Web Tokens (JWTs) for regular users and administrator users
- Persistent cart storage (items placed in cart by user persist throughout separate sessions)
- Stripe integrated check out (Please don't actually buy a non-existant product with a card on our site)
- Full-stack integration with persistent database for users' carts and products sold by our store
  - Administrator dashboard, complete with data tables to enable real-time adding, editting, and deletion of products from the comfort of the website itself
- A lovely image carousel on the home page that shows off some of the popular games on the store page

##  🏁 How to run on your local machine

1. Clone this repository down on your local machine 

2. Install packages

```bash
npm install
```

3. Add a `.env` file with your secret value for auth
```
JWT_SECRET='somesecretvalue'
```

4. Create the database

```bash
createdb your-database-name
```

5. Update `src/server/db/client.js` to reflect the name of your database

```js
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/your-database-name';
```

6. Seed the database
```bash
npm run seed
```

7. Start the server
```bash
npm run dev
```

8. Open your browser at `http://localhost:3000`

9. Buy something 😎 (but please don't actually use your actual credit card information)

## Come back soon to see the URL for the website once we are able to get it deployed! 
