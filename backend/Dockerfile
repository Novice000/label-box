# Use the official Python base image
FROM python:3.10

# Set working directory inside the container
WORKDIR /api

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8000

# Command to run the application
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
