from fastapi import APIRouter, Body
from sqlalchemy import text

from database.db import get_db


router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"]
)


# ==============================
# GET ALL APPOINTMENTS
# ==============================

@router.get("")
def get_appointments():

    db = next(get_db())


    result = db.execute(

        text(
            """

            SELECT

            a.appointment_id,

            p.first_name || ' ' || p.last_name
            AS patient_name,

            d.first_name || ' ' || d.last_name
            AS doctor_name,

            a.doctor_id,

            a.token_number,

            a.symptoms,

            a.appointment_date,

            a.appointment_time,

            a.status,

            a.payment_status


            FROM appointments a


            JOIN patients p
            ON a.patient_id=p.patient_id


            JOIN doctors d
            ON a.doctor_id=d.doctor_id


            ORDER BY a.token_number


            """
        )

    )


    data=[]


    for row in result:

        data.append(
            dict(row._mapping)
        )


    return data






# ==============================
# PATIENT BOOK APPOINTMENT
# ==============================

@router.post("/book")
def book_appointment(data:dict=Body(...)):



    db = next(get_db())



    # generate next token for selected doctor

    token = db.execute(

        text(
            """

            SELECT 
            COALESCE(MAX(token_number),0)+1

            FROM appointments

            WHERE doctor_id=:doctor_id

            AND status!='COMPLETED'


            """
        ),

        {
            "doctor_id":data["doctor_id"]
        }

    ).scalar()





    db.execute(

        text(
            """

            INSERT INTO appointments

            (

            patient_id,

            doctor_id,

            appointment_date,

            appointment_time,

            symptoms,

            token_number,

            status,

            payment_status,

            consultation_fee

            )


            VALUES

            (

            :patient_id,

            :doctor_id,

            CURRENT_DATE,

            CURRENT_TIME,

            :symptoms,

            :token,

            'WAITING',

            'Paid',

            500

            )


            """
        ),

        {

        "patient_id":data["patient_id"],

        "doctor_id":data["doctor_id"],

        "symptoms":data["symptoms"],

        "token":token


        }


    )



    db.commit()



    return {

    "message":"Appointment Booked",

    "your_token":token

    }








# ==============================
# DOCTOR QUEUE
# ==============================


@router.get("/queue/{doctor_id}")
def doctor_queue(doctor_id:int):



    db=next(get_db())



    result=db.execute(

        text(
            """

            SELECT *

            FROM appointments

            WHERE doctor_id=:id

            AND status='WAITING'


            ORDER BY token_number


            """
        ),

        {"id":doctor_id}


    )



    queue=[]


    for row in result:

        queue.append(
            dict(row._mapping)
        )



    return queue








# ==============================
# COMPLETE VISIT
# ==============================


@router.put("/{id}/complete")
def complete_visit(id:int):



    db=next(get_db())



    db.execute(

        text(
            """

            UPDATE appointments

            SET status='COMPLETED'

            WHERE appointment_id=:id


            """
        ),

        {"id":id}


    )



    db.commit()



    return {

    "message":"Visit Completed"

    }

# ==============================
# PATIENT LIVE QUEUE STATUS
# ==============================


@router.get("/track/{appointment_id}")
def track_queue(appointment_id:int):


    db = next(get_db())



    appointment = db.execute(

        text(
            """

            SELECT *

            FROM appointments

            WHERE appointment_id=:id

            """
        ),

        {"id":appointment_id}

    ).fetchone()




    if appointment is None:


        return {

            "message":"Appointment Not Found"

        }




    appointment=dict(appointment._mapping)



    current_token = db.execute(

        text(
            """

            SELECT MIN(token_number)

            FROM appointments

            WHERE doctor_id=:doctor_id

            AND status='WAITING'

            """
        ),

        {

        "doctor_id":appointment["doctor_id"]

        }

    ).scalar()




    patients_before = (

        appointment["token_number"]

        -

        current_token

    )



    return {


    "your_token":appointment["token_number"],


    "current_token":current_token,


    "patients_before_you":patients_before,


    "estimated_wait_minutes":patients_before * 10,


    "status":appointment["status"]


    }
# ======================================
# PATIENT QUEUE STATUS
# ======================================


@router.get("/appointments/queue/{patient_id}")
def patient_queue(patient_id:int):


    db = next(get_db())



    patient = db.execute(

        text(
            """

            SELECT *

            FROM appointments

            WHERE patient_id=:id

            AND status='WAITING'


            """
        ),


        {"id":patient_id}


    ).fetchone()





    if patient is None:


        return {


        "message":"No Active Appointment"


        }





    appointment = dict(patient._mapping)




    waiting = db.execute(

        text(
            """

            SELECT COUNT(*)

            FROM appointments


            WHERE doctor_id=:doctor_id


            AND status='WAITING'


            AND token_number < :token


            """
        ),


        {


        "doctor_id":appointment["doctor_id"],


        "token":appointment["token_number"]


        }


    ).fetchone()[0]






    return {


    "your_token":appointment["token_number"],


    "patients_before_you":waiting,


    "status":appointment["status"]


    }

# ======================================
# DOCTOR TODAY QUEUE
# ======================================


@router.get("/doctor/queue/{doctor_id}")
def doctor_queue(doctor_id:int):


    db = next(get_db())


    result = db.execute(

        text(
            """

            SELECT

            a.appointment_id,
            a.token_number,
            a.symptoms,
            a.status,

            p.patient_id,
            p.first_name,
            p.last_name,
            p.age,
            p.gender


            FROM appointments a


            JOIN patients p

            ON a.patient_id = p.patient_id



            WHERE a.doctor_id=:id


            ORDER BY a.token_number


            """
        ),


        {"id":doctor_id}

    )



    queue=[]


    for row in result:


        queue.append(

        dict(row._mapping)

        )


    return queue

