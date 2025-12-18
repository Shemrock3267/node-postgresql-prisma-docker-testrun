## Overview

This is an **Dockerized** and authentication-protected Todo App using **Node.js**, **Express.js**, **bcrypt**, **JWT authentication**, **Prisma**, and **PostgreSQL**. The app allows users to:
- **Register**: Create a new account.
- **Login**: Authenticate and receive a JWT token.
- **Manage Todos**: Perform auth protected CRUD operations on their own todo tasks after logging in.

### Explanation of Key Directories and Files

- **`prisma/`**: Contains Prisma's schema (`schema.prisma`) and migration files. After each schema change, migration files are generated here to apply database changes.
- **`public/`**: Contains the frontend HTML file. This file interacts with the backend API for user registration, login, and todo management.
- **`src/`**: The core backend code.
    - **`middlewares/`**: Contains middleware for handling JWT-based authentication, protecting routes that require authentication.
    - **`routes/`**: Contains API routes for handling authentication and CRUD operations for todos.
    - **`prismaClient.js`**: Sets up the Prisma client for database interaction.
    - **`server.js`**: The entry point for the Express.js application, which configures the app, routes, and middleware.
- **`.env`**: Stores environment variables like `DATABASE_URL` and `JWT_SECRET`. These variables are used to configure Prisma, JWT, and database connections.
- **`Dockerfile`**: The Dockerfile for building the Node.js application in a containerized environment.
- **`docker-compose.yaml`**: Configuration for Docker Compose, which sets up both the Node.js app and PostgreSQL in separate containers.
- **`package.json`**: Defines the Node.js dependencies and scripts used to run the application (e.g., `npm start`).
- **`README.md`**: Project documentation, including setup instructions and directory structure (this file).

### Example Workflow

1. **Define or Update Schema**: Modify the `schema.prisma` file to change your database structure.
2. **Create Migrations**: Use Prisma to generate and apply migrations.
3. **Run Docker Compose**: Build and run the Node.js app and PostgreSQL using Docker Compose.
4. **Interact with the API**: Use the frontend or API client (e.g., Postman) to register, login, and manage todos.

## Getting Started

0. **Install Docker Desktop**

1. **Clone the Repository**:

```bash
git clone https://github.com/your-username/your-app-name.git
cd your-app-name
```

2. **Generate the Prisma Client**:

`npx prisma generate`

3. **Build docker images**:

`docker compose build`

4. **Create PostgreSQL migrations and apply them**:

`docker compose run app npx prisma migrate dev --name init`

*Also* - to run/apply migrations if necessary:

`docker-compose run app npx prisma migrate deploy`

5. **Boot up 2x docker containers**:

`docker compose up`

*or*

`docker compose up -d`

If you want to boot it up without it commandeering your terminal (you'll have to stop if via Docker Desktop though).

6. **To login to docker PostgreSQL database (from a new terminal instance while docker containers are running) where you can run SQL commands and modify database!**:

`docker exec -it postgres-db psql -U postgres -d todoapp`

7. **To stop Docker containers**:

`docker compose down`

8. **To delete all docker containers**:

`docker system prune`

9. **Access the App**:

Open `http://localhost:5858` (or `localhost:3000` if changed) in your browser to see the frontend. You can register, log in, and manage your todo list from there.

## Emulating HTTP Requests (REST Client)

The **REST Client** file (`todo-app.rest`) is provided to help you test the API using HTTP requests directly. You can run these requests using the **REST Client** extension for VS Code or other compatible tools.

### `todo-app.rest`

The `todo-app.rest` file includes requests for:
- **Registering a user**: Sends a `POST` request to create a new user.
- **Logging in**: Sends a `POST` request to authenticate a user and retrieve a JWT token.
- **Fetching todos**: Sends a `GET` request to fetch the authenticated user's todos (JWT required).
- **Adding a todo**: Sends a `POST` request to create a new todo (JWT required).
- **Updating a todo**: Sends a `PUT` request to update an existing todo (JWT required).
- **Deleting a todo**: Sends a `DELETE` request to remove a todo (JWT required).
