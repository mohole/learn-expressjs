# learn-express.js
> Simple REST API server written for learning purpose.

## Install & setup
1. Clone the repo and install the dependencies:
```bash
$ git clone https://github.com/mohole/learn-expressjs
$ cd learn-expressjs
$ npm install
```

2. Create an `.env` file in the project root by copying the `.env.example` or running the command (*bash only*):
```bash
$ cp .env.example .env
```

3. Create a MySQL databse called `expressjs` (*or use a different name if you want to modify the `.env` file*) and import the `movies_db.sql` file in the root of the project.

4. Start the Database server

5. Start the project in development mode with:
```bash
$ npm run dev
```

6. Open the browser at `http://localhost:3004` .

## License
MIT