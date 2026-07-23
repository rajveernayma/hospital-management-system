import { useEffect, useState } from "react";

import { FaNotesMedical } from "react-icons/fa";

import jsPDF from "jspdf";




function Prescription(){



const [data,setData]=useState([]);





useEffect(()=>{


fetch("https://hospital-management-system-lvu6.onrender.com/prescriptions")


.then(res=>res.json())


.then(result=>setData(result));



},[]);







function downloadPDF(p){



const pdf = new jsPDF();



pdf.setFontSize(22);


pdf.text(
"MediFlow Hospital",
20,
20
);



pdf.setFontSize(14);



pdf.text(
`Patient: ${p.patient}`,
20,
40
);



pdf.text(
`Doctor: ${p.doctor}`,
20,
55
);



pdf.text(
`Medicine: ${p.medicine}`,
20,
70
);




pdf.text(
`Dosage: ${p.dosage}`,
20,
85
);




pdf.text(
`Advice: ${p.doctor_advice}`,
20,
100
);



pdf.text(
`Date: ${p.created_date}`,
20,
115
);




pdf.save(

`${p.patient}_Prescription.pdf`

);



}









return(


<div>


<h1>

<FaNotesMedical/>

 Prescriptions

</h1>






<div className="card-grid">


{


data.map(p=>(



<div 

className="doctor-card"

key={p.prescription_id}

>



<h2>

👤 {p.patient}

</h2>




<p>

👨‍⚕️ Doctor : {p.doctor}

</p>




<p>

💊 Medicine : {p.medicine}

</p>





<p>

⏰ Dosage : {p.dosage}

</p>





<p>

📝 Advice : {p.doctor_advice}

</p>





<p>

📅 {p.created_date}

</p>






<button

className="available"

onClick={()=>downloadPDF(p)}

>


📄 Download PDF


</button>





</div>


))


}



</div>




</div>


)


}




export default Prescription;