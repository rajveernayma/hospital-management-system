from fastapi import APIRouter
from sqlalchemy import text

from database.db import get_db


router = APIRouter(

    prefix="/medical-records",

    tags=["Medical Records"]

)



# =========================
# GET PATIENT HISTORY
# =========================

@router.get("/{patient_id}")
def get_history(patient_id:int):


    db = next(get_db())


    result = db.execute(

        text(
            """

            SELECT

            record_id,
            patient_id,
            doctor_id,
            diagnosis,
            treatment,
            notes,
            created_at


            FROM medical_records


            WHERE patient_id = :patient_id


            ORDER BY created_at DESC


            """
        ),

        {

            "patient_id":patient_id

        }


    ).fetchall()



    records=[]


    for row in result:


        records.append(

            dict(row._mapping)

        )



    return records







# =========================
# ADD MEDICAL RECORD
# =========================


@router.post("/")
def add_record(data:dict):


    db=next(get_db())



    db.execute(

        text(
            """

            INSERT INTO medical_records

            (

            patient_id,
            doctor_id,
            diagnosis,
            treatment,
            notes

            )

            VALUES

            (

            :patient_id,
            :doctor_id,
            :diagnosis,
            :treatment,
            :notes

            )


            """
        ),

        data

    )



    db.commit()



    return {


        "message":"Medical Record Added Successfully"


    }