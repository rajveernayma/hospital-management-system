from fastapi import APIRouter, Body
from sqlalchemy import text
from database.db import get_db

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# ======================
# REGISTER PATIENT
# ======================
@router.post("/register")
def register(data: dict = Body(...)):
    db = next(get_db())

    try:
        db.execute(
            text("""
                INSERT INTO users
                (
                    name,
                    email,
                    password,
                    role,
                    patient_id
                )
                VALUES
                (
                    :name,
                    :email,
                    :password,
                    'PATIENT',
                    :patient_id
                )
            """),
            data
        )

        db.commit()

        return {
            "success": True,
            "message": "Registration Successful"
        }

    except Exception as e:
        db.rollback()
        return {
            "success": False,
            "error": str(e)
        }


# ======================
# LOGIN
# ======================
@router.post("/login")
def login(data: dict = Body(...)):
    print("Received:", data)

    db = next(get_db())

    result = db.execute(
        text("""
            SELECT
                user_id,
                name,
                email,
                password,
                role,
                patient_id,
                doctor_id
            FROM users
            WHERE email=:email
            AND password=:password
        """),
        {
            "email": data.get("email"),
            "password": data.get("password")
        }
    ).fetchone()

    print("Result:", result)

    if result is None:
        return {
            "success": False,
            "message": "Invalid Email or Password"
        }

    user = dict(result._mapping)

    return {
        "success": True,
        "user": {
            "id": user["user_id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "patient_id": user["patient_id"],
            "doctor_id": user["doctor_id"]
        }
    }