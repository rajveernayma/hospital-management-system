import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddRecord(){


const navigate = useNavigate();


const user = JSON.parse(
localStorage.getItem("user")
);



const [form,setForm] = useState({

patient_id:"",

doctor_id:user.doctor_id,

diagnosis:"",

prescription:"",

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

"https://hospital-management-system-lvu6.onrender.com/medical-records/",


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



navigate("/doctor-panel");



}









return(


<div>


<h1>

📝 Add Medical Record

</h1>



<input

placeholder="Patient ID"

name="patient_id"

onChange={change}

/>



<br/><br/>




<input

placeholder="Diagnosis"

name="diagnosis"

onChange={change}

/>



<br/><br/>




<textarea

placeholder="Prescription / Medicines"

name="prescription"

onChange={change}

></textarea>



<br/><br/>





<textarea

placeholder="Doctor Notes"

name="notes"

onChange={change}

></textarea>





<br/><br/>




<button onClick={saveRecord}>


Save Record


</button>



</div>


)


}



export default AddRecord;