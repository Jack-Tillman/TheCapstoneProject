#  🚀 Capstone Boilerplate

A template for building web applications using the PERN (PostgreSQL, Express.js, React, Node.js) stack. 

##  🏁 Getting Started

1. **Don't fork or clone this repo!** Instead, create a new, empty directory on your machine and `git init` (or create an _empty_ repo on GitHub and clone it to your local machine)

2. Add this template as a remote and merge it into your own repository

```bash
git remote add boilermaker https://github.com/FullstackAcademy/capstone-app-template
git fetch boilermaker
git merge boilermaker/main
```

1. Install packages

```bash
npm i
```

2. Add a `.env` file with your secret value for auth
```
JWT_SECRET='somesecretvalue'
```

3. Create the database

```bash
createdb your-database-name
```

4. Update `server/db/client.js` to reflect the name of your database

```js
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/your-database-name';
```

5. Seed the database
```bash
npm run seed
```

6. Start the server
```bash
npm run dev
```

7. Build something cool! 😎