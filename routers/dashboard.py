from fastapi import APIRouter
from sqlalchemy import text

from database.db import get_db


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)



@router.get("")
def dashboard():


    db = next(get_db())


    # ==========================
    # TOTAL PATIENTS
    # ==========================

    patients = db.execute(
        text(
            """
            SELECT COUNT(*)
            FROM patients
            """
        )
    ).scalar()



    # ==========================
    # TOTAL DOCTORS
    # ==========================


    doctors = db.execute(
        text(
            """
            SELECT COUNT(*)
            FROM doctors
            """
        )
    ).scalar()



    # ==========================
    # TOTAL APPOINTMENTS
    # ==========================


    appointments = db.execute(
        text(
            """
            SELECT COUNT(*)
            FROM appointments
            """
        )
    ).scalar()



    # ==========================
    # TODAY APPOINTMENTS
    # ==========================


    today_appointments = db.execute(
        text(
            """
            SELECT COUNT(*)

            FROM appointments

            WHERE appointment_date=CURRENT_DATE
            """
        )
    ).scalar()




    # ==========================
    # WAITING PATIENTS
    # ==========================


    waiting = db.execute(
        text(
            """
            SELECT COUNT(*)

            FROM appointments

            WHERE status='WAITING'
            """
        )
    ).scalar()





    # ==========================
    # COMPLETED APPOINTMENTS
    # ==========================


    completed = db.execute(
        text(
            """
            SELECT COUNT(*)

            FROM appointments

            WHERE status='COMPLETED'
            """
        )
    ).scalar()





    # ==========================
    # TOTAL REVENUE
    # ==========================


    revenue = db.execute(
        text(
            """

            SELECT 
            COALESCE(
            SUM(amount),0
            )

            FROM payments

            WHERE status='SUCCESS'

            """
        )
    ).scalar()





    # ==========================
    # LATEST APPOINTMENTS
    # ==========================


    latest = db.execute(
        text(
            """

            SELECT

            a.appointment_id,

            p.first_name || ' ' || p.last_name
            AS patient,

            d.first_name || ' ' || d.last_name
            AS doctor,

            a.status


            FROM appointments a


            JOIN patients p
            ON a.patient_id=p.patient_id


            JOIN doctors d
            ON a.doctor_id=d.doctor_id



            ORDER BY a.appointment_id DESC


            LIMIT 5


            """
        )
    )



    latest_data=[]


    for row in latest:

        latest_data.append(
            dict(row._mapping)
        )






    return {


        "patients":patients,


        "doctors":doctors,


        "appointments":appointments,


        "today_appointments":today_appointments,


        "waiting":waiting,


        "completed":completed,


        "revenue":revenue,


        "latest":latest_data


    }