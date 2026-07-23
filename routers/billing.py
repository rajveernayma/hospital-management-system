from fastapi import APIRouter, Body
from sqlalchemy import text

from database.db import get_db


router = APIRouter(
    prefix="/billing",
    tags=["Billing"]
)



# ===========================
# GET ALL BILLS
# ===========================


@router.get("")
def get_bills():


    db = next(get_db())


    result = db.execute(

        text(
            """

            SELECT

            b.bill_id,

            p.first_name || ' ' || p.last_name
            AS patient_name,


            b.consultation_fee,
            b.medicine_fee,
            b.test_fee,
            b.total_amount,
            b.payment_status


            FROM bills b


            JOIN appointments a
            ON b.appointment_id=a.appointment_id


            JOIN patients p
            ON a.patient_id=p.patient_id


            ORDER BY b.bill_id;


            """
        )


    )



    bills=[]


    for row in result:


        bills.append(

            dict(row._mapping)

        )



    return bills






# ===========================
# CREATE BILL
# ===========================


@router.post("")
def create_bill(data:dict = Body(...)):



    db = next(get_db())



    total = (
        data["consultation_fee"]
        +
        data["medicine_fee"]
        +
        data["test_fee"]
    )



    query = """

    INSERT INTO bills

    (

    appointment_id,
    consultation_fee,
    medicine_fee,
    test_fee,
    total_amount,
    payment_status

    )


    VALUES

    (

    :appointment_id,
    :consultation_fee,
    :medicine_fee,
    :test_fee,
    :total_amount,
    'Unpaid'

    )

    """



    data["total_amount"]=total



    db.execute(
        text(query),
        data
    )



    db.commit()



    return {

    "message":"Bill Generated Successfully",

    "amount":total

    }






# ===========================
# PAY BILL
# ===========================


@router.put("/{id}/pay")
def pay_bill(id:int):


    db=next(get_db())


    db.execute(

        text(
            """

            UPDATE bills

            SET payment_status='Paid'

            WHERE bill_id=:id

            """
        ),

        {"id":id}

    )



    db.commit()



    return {

    "message":"Payment Completed"

    }