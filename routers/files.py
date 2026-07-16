from fastapi import APIRouter, UploadFile, File, Form
from sqlalchemy import text
from database.db import get_db

import shutil
import os



router = APIRouter(
    prefix="/files",
    tags=["Medical Files"]
)



UPLOAD_FOLDER = "uploads"



# ==============================
# UPLOAD MEDICAL REPORT
# ==============================


@router.post("/upload")
def upload_file(

    patient_id:int = Form(...),

    file:UploadFile = File(...)

):


    db = next(get_db())



    path = (

        UPLOAD_FOLDER

        +

        "/"

        +

        file.filename

    )




    with open(path,"wb") as buffer:


        shutil.copyfileobj(

            file.file,

            buffer

        )





    db.execute(

        text(
            """

            INSERT INTO medical_files

            (

            patient_id,

            file_name,

            file_type,

            file_path

            )


            VALUES

            (

            :patient_id,

            :name,

            :type,

            :path

            )


            """
        ),


        {

        "patient_id":patient_id,

        "name":file.filename,

        "type":file.content_type,

        "path":path


        }


    )


    db.commit()



    return {


    "message":"Report Uploaded Successfully",

    "file":file.filename


    }







# ==============================
# VIEW PATIENT REPORTS
# ==============================


@router.get("/{patient_id}")
def get_files(patient_id:int):


    db = next(get_db())


    result=db.execute(

        text(
            """

            SELECT *

            FROM medical_files

            WHERE patient_id=:id

            ORDER BY uploaded_at DESC


            """
        ),


        {"id":patient_id}


    )



    files=[]



    for row in result:


        files.append(

            dict(row._mapping)

        )



    return files