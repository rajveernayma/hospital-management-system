import { useState } from "react";

function AddPatient(){

const [patient,setPatient] = useState({
first_name:"",
last_name:"",
age:"",
gender:"",
blood_group:"",
phone:""
});


const handleChange=(e)=>{

setPatient({
...patient,
[e.target.name]:e.target.value
});

};



const addPatient=async()=>{


await fetch("https://hospital-management-system-lvu6.onrender.com/patients",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(patient)

});


alert("Patient Added Successfully ✅");


setPatient({

first_name:"",
last_name:"",
age:"",
gender:"",
blood_group:"",
phone:""

});


};



return(

<div>


<h1>➕ Add New Patient</h1>


<div className="form-box">


<input
name="first_name"
placeholder="First Name"
value={patient.first_name}
onChange={handleChange}
/>


<input
name="last_name"
placeholder="Last Name"
value={patient.last_name}
onChange={handleChange}
/>


<input
name="age"
placeholder="Age"
value={patient.age}
onChange={handleChange}
/>


<input
name="gender"
placeholder="Gender"
value={patient.gender}
onChange={handleChange}
/>


<input
name="blood_group"
placeholder="Blood Group"
value={patient.blood_group}
onChange={handleChange}
/>


<input
name="phone"
placeholder="Phone"
value={patient.phone}
onChange={handleChange}
/>


<button onClick={addPatient}>
Add Patient
</button>


</div>


</div>

)

}


export default AddPatient;