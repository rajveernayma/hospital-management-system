# Hospital Management System

## Tech Stack
- Python 3.13
- FastAPI
- PostgreSQL
- SQLAlchemy
- pgAdmin 4

## Setup Instructions

### Clone the project

```bash
git clone <repository-url>
```

### Create virtual environment

```bash
python -m venv venv
```

### Activate virtual environment

```bash
venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Start PostgreSQL

Ensure PostgreSQL service is running.

### Run the application

```bash
uvicorn app:app --reload
```

### Open Swagger API

```
http://127.0.0.1:8000/docs
```

## Features

- Add Patient
- View Patients
- Search Patient
- Update Patient
- Delete Patient

## Database

Database Name: `hospital_db`

Main Table: `patients`