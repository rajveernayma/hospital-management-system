import { useState } from "react";


function AddMedicalRecord(){


const [form,setForm]=useState({

patient_id:"",
doctor_id:"",
diagnosis:"",
treatment:"",
notes:""

});





function change(e){


setForm({

...form,

[e.target.name]:e.target.value

});


}







async function saveRecord(){


const res = await fetch(

"http://127.0.0.1:8000/medical-records/",

{

method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(form)


}

);



const data = await res.json();


alert(data.message);



}









return(


<div>


<h1>

📝 Add Patient Medical Record

</h1>



<input

name="patient_id"

placeholder="Patient ID"

onChange={change}

/>



<input

name="doctor_id"

placeholder="Doctor ID"

onChange={change}

/>




<input

name="diagnosis"

placeholder="Diagnosis"

onChange={change}

/>



<input

name="treatment"

placeholder="Treatment Given"

onChange={change}

/>



<textarea

name="notes"

placeholder="Doctor Notes"

onChange={change}

>

</textarea>




<button onClick={saveRecord}>


Save Record


</button>




</div>


)


}



export default AddMedicalRecord;