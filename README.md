This repository contains the source code for our frontend application. Follow the instructions below to get up and running using Docker.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop) (including Docker Compose, if required)
- [Git](https://git-scm.com/)

## Getting Started

### Clone the Repository

First, clone the repository from GitHub:

```bash
git clone https://github.com/singhjoginder321/Devlinks-frontend-reactjs.git
cd Devlinks-frontend-reactjs
```

### Build and Run with Docker

1. **Create a Docker Image**

   You need to build the Docker image for the project. This will compile your application and prepare it for running in a container. Run the following command:

   ```bash
   docker build -t frontend-project .
   ```

   This command uses the `Dockerfile` in the root of your project to create an image named `frontend-project`.

2. **Run the Docker Container**

   After building the image, you can run the container using the following command:

   ```bash
   docker run -p 5173:5173 frontend-project
   ```

   This maps port `5173` on your host machine to port `5173` in the container. You can adjust the port mapping if your application runs on a different port.

3. **Access the Application**

   Open your web browser and navigate to `http://localhost:5173` to see the running application. If you used a different port, replace `5173` with your configured port.

## Docker Compose (Optional)

If your project uses Docker Compose, you can start the application with a single command. Ensure you have a `docker-compose.yml` file in the root of your project directory, then run:

```bash
docker-compose up
```

This command will build the image and start the container as defined in your `docker-compose.yml` file.

## Configuration

If you need to configure environment variables or other settings, you can do so by creating a `.env` file in the root directory. Refer to the `.env.example` file for available configuration options.
