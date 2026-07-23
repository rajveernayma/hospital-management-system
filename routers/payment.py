from fastapi import APIRouter, Body
import razorpay


# ==================================
# PAYMENT ROUTER
# ==================================

router = APIRouter(
    prefix="/payment",
    tags=["Payment"]
)



# ==================================
# RAZORPAY CONFIG
# ==================================

razorpay_client = razorpay.Client(
    auth=(
        "rzp_test_TBQZdhIYFYWQbq",
        "2AOwscsdy6foXw1BPrhFlua9"
    )
)




# ==================================
# CREATE RAZORPAY ORDER
# ==================================

@router.post("/create")
def create_payment(data: dict = Body(...)):


    amount = data["amount"]


    order = razorpay_client.order.create(

        {

            "amount": amount * 100,

            "currency": "INR",

            "payment_capture": 1

        }

    )



    return {

        "success": True,

        "key": "rzp_test_TBQZdhIYFYWQbq",

        "order_id": order["id"],

        "amount": order["amount"],

        "currency": order["currency"]

    }






# ==================================
# VERIFY PAYMENT
# ==================================

@router.post("/verify")
def verify_payment(data:dict = Body(...)):


    try:


        razorpay_client.utility.verify_payment_signature(

            {

            "razorpay_order_id":

            data["razorpay_order_id"],



            "razorpay_payment_id":

            data["razorpay_payment_id"],



            "razorpay_signature":

            data["razorpay_signature"]

            }

        )




        return {

            "success":True,

            "message":

            "Payment Verified Successfully"

        }





    except Exception as e:



        return {


            "success":False,


            "message":"Payment Verification Failed",


            "error":str(e)

        }