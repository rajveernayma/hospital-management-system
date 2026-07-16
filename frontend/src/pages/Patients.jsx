import { useEffect, useState } from "react";


function Patients(){


const [patients,setPatients]=useState([]);

const [search,setSearch]=useState("");



const getPatients=async()=>{


const response = await fetch(
"http://127.0.0.1:8000/patients"
);


const data = await response.json();


setPatients(data);


};



useEffect(()=>{


getPatients();


},[]);





const deletePatient=async(id)=>{


const confirmDelete = window.confirm(
"Are you sure you want to delete this patient?"
);


if(!confirmDelete){

return;

}



await fetch(
`http://127.0.0.1:8000/patients/${id}`,
{

method:"DELETE"

}

);



alert("Patient Deleted Successfully 🗑️");


getPatients();


};





const filteredPatients = patients.filter((p)=>{


return (

p.first_name.toLowerCase().includes(search.toLowerCase()) ||

p.last_name.toLowerCase().includes(search.toLowerCase())

);


});





return(

<div>


<h1>🏥 Patients Management</h1>



<input

className="search"

placeholder="Search Patient..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>




<table>


<thead>


<tr>

<th>ID</th>

<th>Name</th>

<th>Age</th>

<th>Gender</th>

<th>Blood</th>

<th>Phone</th>

<th>Action</th>


</tr>


</thead>



<tbody>


{

filteredPatients.map((patient)=>(


<tr key={patient.patient_id}>


<td>{patient.patient_id}</td>


<td>

{patient.first_name} {patient.last_name}

</td>


<td>{patient.age}</td>


<td>{patient.gender}</td>


<td>{patient.blood_group}</td>


<td>{patient.phone}</td>



<td>


<button

className="delete-btn"

onClick={()=>deletePatient(patient.patient_id)}

>

Delete

</button>


</td>


</tr>


))

}


</tbody>


</table>



</div>

)


}



export default Patients;
