from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# ======================
# ROUTERS IMPORT
# ======================
from routers import auth
from routers import patients
from routers import doctors
from routers import appointments
from routers import billing
from routers import dashboard
from routers import prescriptions
from routers import medical_records
from routers import auth
from routers import medical_records
from routers import payment
from routers import payment
from routers import files

# ======================
# APP CONFIG
# ======================


app = FastAPI(

    title="MediFlow Hospital Management System",

    description="FastAPI + PostgreSQL Hospital ERP Backend",

    version="2.0"

)



# ======================
# CORS
# ======================


app.add_middleware(

    CORSMiddleware,


    allow_origins=[

        "http://localhost:5173",

        "http://127.0.0.1:5173"

    ],


    allow_credentials=True,


    allow_methods=["*"],


    allow_headers=["*"],

)




# ======================
# HOME API
# ======================


@app.get("/")
def home():


    return {

        "message":"MediFlow Backend Running Successfully 🚀"

    }






# ======================
# CONNECT ROUTERS
# ======================


app.include_router(

    patients.router

)



app.include_router(

    doctors.router

)



app.include_router(

    appointments.router

)



app.include_router(

    billing.router

)



app.include_router(

    dashboard.router

)

app.include_router(
    auth.router
)

app.include_router(
    prescriptions.router
)

app.include_router(
    medical_records.router
)

app.include_router(auth.router)

app.include_router(

medical_records.router

)

app.include_router(payment.router)

app.include_router(
    payment.router
)

app.include_router(
    files.router
)