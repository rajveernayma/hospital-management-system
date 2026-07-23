import { useEffect, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";


function Billing(){


const [bills,setBills]=useState([]);



useEffect(()=>{


fetch("https://hospital-management-system-lvu6.onrender.com/billing")


.then(res=>res.json())


.then(data=>{


setBills(data)


})


},[]);





async function payBill(id){



await fetch(

`https://hospital-management-system-lvu6.onrender.com/billing/${id}/pay`,

{

method:"PUT"

}

);




setBills(

bills.map(b=>


b.bill_id===id

?

{
...b,
payment_status:"Paid"
}

:

b


)


)



}








return(


<div>


<h1>
💳 Billing Management
</h1>



<div className="card-grid">


{


bills.map(b=>(


<div 
className="doctor-card"
key={b.bill_id}
>


<h2>

👤 {b.patient_name}

</h2>



<p>

Consultation Fee : ₹{b.consultation_fee}

</p>



<p>

Medicine Fee : ₹{b.medicine_fee}

</p>



<p>

Test Fee : ₹{b.test_fee}

</p>



<h3>

Total : ₹{b.total_amount}

</h3>





{

b.payment_status==="Paid"

?

<button className="available">

Paid ✓

</button>


:


<button

className="busy"

onClick={()=>payBill(b.bill_id)}

>

Pay Bill


</button>


}




</div>



))


}



</div>



</div>


)


}


export default Billing;