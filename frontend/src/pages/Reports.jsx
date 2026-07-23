import { useState, useEffect } from "react";


function Reports(){


const user = JSON.parse(
localStorage.getItem("user")
);



const [file,setFile]=useState(null);


const [reports,setReports]=useState([]);






function loadReports(){


fetch(

`https://hospital-management-system-lvu6.onrender.com/files/${user.patient_id}`

)

.then(res=>res.json())

.then(data=>{

setReports(data);

});



}





useEffect(()=>{

loadReports();

},[]);






async function upload(){


if(!file){

alert("Please select a file");

return;

}



const formData=new FormData();



formData.append(
"patient_id",
user.patient_id
);



formData.append(
"file",
file
);






const res=await fetch(

"https://hospital-management-system-lvu6.onrender.com/files/upload",

{

method:"POST",

body:formData

}

);



const data=await res.json();



alert(
"📄 "+data.message
);



setFile(null);


loadReports();



}









return(


<div>



<h1>

📄 Medical Reports

</h1>




<input

type="file"

onChange={(e)=>setFile(e.target.files[0])}

/>




<button onClick={upload}>

Upload Report

</button>






<h2>

My Reports

</h2>





{

reports.length===0

?


<h3>No Reports Uploaded</h3>


:


reports.map(

(r)=>(


<div 

key={r.file_id}

className="card"

>


<h3>

📑 {r.file_name}

</h3>


<p>

{r.uploaded_at}

</p>


</div>


)

)


}





</div>


);


}



export default Reports;