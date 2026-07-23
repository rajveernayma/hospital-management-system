from fastapi import APIRouter, Body
from sqlalchemy import text

# ... keep the rest of your imports


@router.post("/login")
def login(data: dict = Body(...)):
    try:
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
                WHERE email = :email
                AND password = :password
            """),
            {
                "email": data.get("email"),
                "password": data.get("password")
            }
        ).fetchone()

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

    except Exception as e:
        print("LOGIN ERROR:", str(e))
        return {
            "success": False,
            "message": str(e)
        }