from fastapi import APIRouter, Body
from sqlalchemy import text

from database.db import get_db



router = APIRouter(
    prefix="/prescriptions",
    tags=["Prescriptions"]
)



# =============================
# GET ALL PRESCRIPTIONS
# =============================


@router.get("")
def get_prescriptions():


    db = next(get_db())


    result = db.execute(

        text(
            """

            SELECT

            pr.prescription_id,

            p.first_name || ' ' || p.last_name 
            AS patient,

            d.first_name || ' ' || d.last_name 
            AS doctor,

            pr.medicine,

            pr.dosage,

            pr.doctor_advice,

            pr.created_date


            FROM prescriptions pr


            JOIN appointments a

            ON pr.appointment_id=a.appointment_id



            JOIN patients p

            ON a.patient_id=p.patient_id



            JOIN doctors d

            ON a.doctor_id=d.doctor_id



            ORDER BY pr.prescription_id


            """
        )
    )



    data=[]



    for row in result:

        data.append(

            dict(row._mapping)

        )



    return data





# =============================
# ADD PRESCRIPTION
# =============================


@router.post("")
def add_prescription(data:dict=Body(...)):


    db = next(get_db())



    db.execute(

        text(
            """

            INSERT INTO prescriptions

            (
            appointment_id,
            medicine,
            dosage,
            doctor_advice
            )

            VALUES

            (
            :appointment_id,
            :medicine,
            :dosage,
            :doctor_advice
            )


            """
        ),

        data

    )



    db.commit()



    return {

        "message":

        "Prescription Added Successfully"

    }