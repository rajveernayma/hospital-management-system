import { useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";

function Appointments(){


const [appointments,setAppointments]=useState([]);



useEffect(()=>{

fetch("http://127.0.0.1:8000/appointments")

.then(res=>res.json())

.then(data=>{

setAppointments(data)

})


},[]);





async function completeAppointment(id){


await fetch(
`http://127.0.0.1:8000/appointments/${id}/complete`,
{
method:"PUT"
}
);



setAppointments(

appointments.map(a=>

a.appointment_id===id

?
{
...a,
status:"Completed"
}

:

a


)

);



}





return (

<div>


<h1>
🗓️ Appointments
</h1>



<div className="card-grid">


{

appointments.map((a)=>{


return (

<div 
className="doctor-card"
key={a.appointment_id}
>


<h2>
👤 {a.patient_name}
</h2>



<p>

<FaUserDoctor/>

 Doctor : {a.doctor_name}

</p>



<p>

<FaClock/>

{a.appointment_date}

|

{a.appointment_time}


</p>



<p>

Reason : {a.reason}

</p>



{


a.status==="Completed"

?

<button className="available">

Completed

</button>


:

<button 
className="busy"
onClick={()=>completeAppointment(a.appointment_id)}
>

Mark Complete

</button>


}



</div>


)


})

}


</div>


</div>


)


}


export default Appointments;

