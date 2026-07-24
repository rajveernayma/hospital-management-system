from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from database.db import get_db

router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"]
)


@router.get("")
def get_doctors(db: Session = Depends(get_db)):

    result = db.execute(
        text("""
            SELECT *
            FROM doctors
            ORDER BY doctor_id
        """)
    )

    return [dict(row._mapping) for row in result]


@router.post("")
def add_doctor(
    doctor: dict = Body(...),
    db: Session = Depends(get_db)
):

    db.execute(
        text("""
            INSERT INTO doctors
            (
                first_name,
                last_name,
                specialization,
                experience,
                phone,
                status
            )
            VALUES
            (
                :first_name,
                :last_name,
                :specialization,
                :experience,
                :phone,
                :status
            )
        """),
        doctor
    )

    db.commit()

    return {"message": "Doctor Added Successfully"}


@router.delete("/{id}")
def delete_doctor(
    id: int,
    db: Session = Depends(get_db)
):

    db.execute(
        text("""
            DELETE FROM doctors
            WHERE doctor_id=:id
        """),
        {"id": id}
    )

    db.commit()

    return {"message": "Doctor Deleted"}


@router.get("/list")
def doctor_list(db: Session = Depends(get_db)):

    result = db.execute(
        text("""
            SELECT
                doctor_id,
                first_name,
                last_name,
                specialization
            FROM doctors
            ORDER BY first_name
        """)
    )

    return [dict(row._mapping) for row in result]


@router.get("/availability/{doctor_id}")
def doctor_availability(
    doctor_id: int,
    db: Session = Depends(get_db)
):

    doctor = db.execute(
        text("""
            SELECT
                doctor_id,
                first_name,
                last_name,
                specialization,
                status
            FROM doctors
            WHERE doctor_id=:id
        """),
        {"id": doctor_id}
    ).fetchone()

    if doctor is None:
        return {"message": "Doctor not found"}

    waiting = db.execute(
        text("""
            SELECT COUNT(*)
            FROM appointments
            WHERE doctor_id=:id
            AND status='WAITING'
        """),
        {"id": doctor_id}
    ).scalar()

    doctor = dict(doctor._mapping)
    doctor["waiting"] = waiting
    doctor["estimated_wait"] = waiting * 10

    return doctor