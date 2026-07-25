from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import (
    auth,
    patients,
    doctors,
    appointments,
    billing,
    dashboard,
    prescriptions,
    medical_records,
    payment,
    files,
)

app = FastAPI(
    title="MediFlow Hospital Management System",
    description="FastAPI + PostgreSQL Hospital ERP Backend",
    version="2.0",
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    # Your deployed frontend
    "https://hospital-management-system-pesy.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "MediFlow Backend Running Successfully 🚀"
    }

app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(doctors.router)
app.include_router(appointments.router)
app.include_router(billing.router)
app.include_router(dashboard.router)
app.include_router(prescriptions.router)
app.include_router(medical_records.router)
app.include_router(payment.router)
app.include_router(files.router)