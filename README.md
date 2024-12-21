# Annotate Project

## Overview
Annotate is a web-based application that provides annotation functionalities for managing and organizing data. It is built with a **Django** backend and a **React** frontend, designed to work seamlessly with **Docker** for streamlined development and deployment.

This project contains configuration files to facilitate deployment on platforms like **Choreo**, though this README focuses on local setup and Docker deployment.

## Project Structure
```
.
├── backend                 # Django backend
│   ├── Dockerfile          # Backend-specific Dockerfile
│   ├── Procfile            # Configuration for hosting (e.g., on Choreo)
│   ├── annotate            # Core app containing business logic
│   │   ├── migrations      # Database migration files
│   │   ├── models.py       # Models defining database structure
│   │   ├── serializers.py  # Data serialization logic
│   │   ├── views.py        # Request handling logic
│   │   └── urls.py         # Routing for annotate app
│   ├── backend             # Project-level configuration
│   │   ├── settings.py     # Django settings
│   │   ├── urls.py         # Project-wide routing
│   │   └── wsgi.py         # WSGI entry point
│   ├── db.sqlite3          # SQLite database file
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
├── docker-compose.yaml     # Docker Compose configuration
├── frontend                # React frontend
│   ├── Dockerfile          # Frontend-specific Dockerfile
│   ├── package.json        # Frontend dependencies
│   └── src                 # Source code for React app
│       ├── Annotation.js   # Annotation-related UI components
│       ├── App.js          # Main React application file
│       ├── Project.js      # Project-related UI components
│       └── utils           # Utility functions
│           └── axios.config.js  # Axios configuration for API calls
```

## Prerequisites
Before running the project, ensure the following are installed on your machine:
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Comes bundled with Docker Desktop.

## Getting Started

### Running the Project Locally with Docker
The project is configured to run both the frontend and backend services using Docker Compose. Follow the steps below:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Build and Start Services**:
   Run the following command to build and start the containers for both the frontend and backend:
   ```bash
   docker-compose up --build
   ```

3. **Access the Application**:
   - **Frontend**: Open your browser and go to [http://localhost:3000](http://localhost:3000)
   - **Backend**: API endpoints are accessible at [http://localhost:8000](http://localhost:8000)

4. **Stop Services**:
   To stop the running services, press `Ctrl+C` in the terminal where `docker-compose` is running or run:
   ```bash
   docker-compose down
   ```

### Directory-Specific Details
- **Frontend**:
  - The `frontend/Dockerfile` builds the React application.
  - Development changes to the React code in `src/` are reflected immediately if the volumes are correctly configured in the `docker-compose.yml`.

- **Backend**:
  - The `backend/Dockerfile` builds the Django backend.
  - The SQLite database is persisted via a Docker volume to avoid data loss.

## Deployment on Choreo Platform
The project includes a `.choreo` directory with configuration files for deploying on the **Choreo** platform. These configurations simplify hosting and scaling the application. 

> Note: Refer to the Choreo documentation for details on using these configurations.

## Features
- **Frontend**:
  - Built with React for a modern, responsive UI.
  - Contains components for managing projects and annotations.

- **Backend**:
  - Built with Django, leveraging its robust ORM and admin interface.
  - SQLite database for lightweight storage needs.

## Environment Variables
While the project is designed for simplicity with minimal configuration, you can modify certain variables as needed:

### Backend (Django)
- `SECRET_KEY`: Set in `backend/settings.py` for production.
- `DEBUG`: Ensure this is set to `False` in production environments.
- `ALLOWED_HOSTS`: Update to include the hostname/IP of your deployment environment.

### Frontend (React)
- **API URL**: Update `src/utils/axios.config.js` if the backend is hosted at a different URL.

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).
