import { useEffect, useState } from "react";


function MedicalHistory(){


const [records,setRecords]=useState([]);




useEffect(()=>{


fetch("http://127.0.0.1:8000/medical-records/1")


.then(res=>res.json())


.then(data=>setRecords(data));



},[]);







return(


<div>


<h1>

🏥 Medical Timeline

</h1>



{

records.length===0

?

<h2>

No Previous Medical History

</h2>


:


<div className="card-grid">


{


records.map(r=>(


<div

className="doctor-card"

key={r.record_id}

>


<h2>

👨‍⚕️ Dr. {r.doctor}

</h2>




<p>

🩺 Diagnosis:

{r.diagnosis}

</p>





<p>

💊 Medicines:

{r.medicines}

</p>





<p>

📝 Notes:

{r.doctor_notes}

</p>





<p>

📅

{r.created_at}

</p>




{

r.report_url &&


<a

href={r.report_url}

target="_blank"

>

📄 View Report

</a>


}



</div>



))


}


</div>


}



</div>


)


}



export default MedicalHistory;