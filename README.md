# Book Borrows REST API

This is a REST API for managing book borrowing. It allows users to borrow and return books, and provides endpoints for managing users and books.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/ubeydullah26/book-borrowing-api.git
cd book-borrowing-api
```

2. Install dependencies:

```sh
npm install
```

3. Copy the example environment file and configure it:

```sh
cp .env.example .env
```

4. Set up the database:

```sh
npm run migrate
npm run seed
```

## Usage

To start the development server, run:

```sh
docker-compose up --build
```

The server will start on http://localhost:3000

## API Endpoints

### Books

- `GET /books` - Get all books
- `POST /books` - Add a new book
- `GET /books/:id` - Get a book by ID

### Users

- `GET /users` - Get all users
- `POST /users` - Add a new user
- `GET /users/:id` - Get a user by ID
- `POST /users/:userId/borrow/:bookId` - User borrowed a book
- `POST /users/:userId/return/:bookId` - User returning a book

## Database

This project uses PostgreSQL with Knex.js for database management.

### Migrations

To run the latest migrations:

```sh
npm run migrate
```

To rollback all migrations:

```sh
npm run migrate:rollback
```

### Seeds

To seed the database:

```
npm run seed
```

## Environment Variables

The following environment variables need to be set in the `.env` file:

- `APP_DEBUG` - Enable or disable debug mode
- `DB_NAME` - Database name
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `PGADMIN_EMAIL` - PgAdmin email
- `PGADMIN_PASSWORD` - PgAdmin password

## Docker

To build and run the Docker container:

```sh
docker-compose up --build
```

## License

This project is licensed under the MIT License.
