import { useEffect, useState } from "react";
import { FaUserMd } from "react-icons/fa";

function Doctors(){

const [doctors,setDoctors]=useState([]);


useEffect(()=>{

fetch("http://127.0.0.1:8000/doctors")

.then(res=>res.json())

.then(data=>setDoctors(data));

},[]);



return(

<div>

<h1 className="page-title">
<FaUserMd/> Doctors Management
</h1>


<div className="doctor-grid">


{
doctors.map((doctor)=>(


<div className="doctor-card" key={doctor.doctor_id}>


<h2>
Dr. {doctor.first_name} {doctor.last_name}
</h2>


<p>
🩺 {doctor.specialization}
</p>


<p>
⭐ Experience: {doctor.experience} years
</p>


<p>
📞 {doctor.phone}
</p>


<span className={
doctor.status==="Available"
?
"success"
:
"pending"
}>

{doctor.status}

</span>



</div>


))

}


</div>


</div>

)


}


export default Doctors;