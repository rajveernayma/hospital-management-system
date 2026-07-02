from fastapi import FastAPI, Body
from sqlalchemy import text

from database.db import get_db

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Hospital Management API Running"}


# -------------------- GET ALL PATIENTS --------------------

@app.get("/patients")
def get_patients():
    db = next(get_db())

    result = db.execute(text("SELECT * FROM patients"))

    patients = []

    for row in result:
        patients.append(dict(row._mapping))

    return patients


# -------------------- ADD PATIENT --------------------

@app.post("/patients")
def add_patient(patient: dict = Body(...)):
    db = next(get_db())

    query = """
    INSERT INTO patients
    (first_name, last_name, age, gender, phone, blood_group, address)
    VALUES (:first_name,:last_name,:age,:gender,:phone,:blood_group,:address)
    RETURNING patient_id;
    """

    result = db.execute(
        text(query),
        patient
    )

    patient_id = result.fetchone()[0]

    db.commit()

    return {
        "message": "Patient Added Successfully",
        "patient_id": patient_id,
    }


# -------------------- GET ONE PATIENT --------------------

@app.get("/patients/{patient_id}")
def get_patient(patient_id: int):
    db = next(get_db())

    result = db.execute(
        text("SELECT * FROM patients WHERE patient_id = :id"),
        {"id": patient_id},
    )

    patient = result.fetchone()

    if patient:
        return dict(patient._mapping)

    return {"message": "Patient not found"}


# -------------------- UPDATE PATIENT --------------------

@app.put("/patients/{patient_id}")
def update_patient(patient_id: int, patient: dict = Body(...)):
    db = next(get_db())

    query = """
    UPDATE patients
    SET
        first_name = :first_name,
        last_name = :last_name,
        age = :age,
        gender = :gender,
        phone = :phone,
        blood_group = :blood_group,
        address = :address
    WHERE patient_id = :patient_id
    """

    patient["patient_id"] = patient_id

    db.execute(text(query), patient)

    db.commit()

    return {
        "message": "Patient Updated Successfully"
    }


# -------------------- DELETE PATIENT --------------------

@app.delete("/patients/{patient_id}")
def delete_patient(patient_id: int):
    db = next(get_db())

    # Delete all appointments of this patient first
    db.execute(
        text("""
            DELETE FROM appointments
            WHERE patient_id = :patient_id
        """),
        {"patient_id": patient_id}
    )

    # Now delete the patient
    result = db.execute(
        text("""
            DELETE FROM patients
            WHERE patient_id = :patient_id
        """),
        {"patient_id": patient_id}
    )

    db.commit()

    if result.rowcount == 0:
        return {"message": "Patient not found"}

    return {
        "message": "Patient Deleted Successfully"
    }