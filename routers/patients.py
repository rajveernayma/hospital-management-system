from fastapi import APIRouter,Body
from sqlalchemy import text

from database.db import get_db



router = APIRouter(

prefix="/patients",

tags=["Patients"]

)





@router.get("")
def get_patients():


    db=next(get_db())


    result=db.execute(

    text(

    """

    SELECT *

    FROM patients

    ORDER BY patient_id


    """

    )


    )


    data=[]


    for row in result:

        data.append(dict(row._mapping))


    return data






@router.post("")
def add_patient(patient:dict=Body(...)):


    db=next(get_db())


    db.execute(

    text(

    """

    INSERT INTO patients

    (

    first_name,
    last_name,
    age,
    gender,
    blood_group,
    phone

    )

    VALUES

    (

    :first_name,
    :last_name,
    :age,
    :gender,
    :blood_group,
    :phone

    )


    """

    ),

    patient

    )



    db.commit()


    return {

    "message":"Patient Added"

    }






@router.delete("/{id}")
def delete_patient(id:int):


    db=next(get_db())


    db.execute(

    text(

    """

    DELETE FROM patients

    WHERE patient_id=:id


    """

    ),

    {"id":id}

    )


    db.commit()



    return {

    "message":"Deleted"

    }