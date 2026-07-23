import { useState } from "react";



function QueueTracker(){



const [id,setId]=useState("");

const [queue,setQueue]=useState(null);





async function track(){



const res = await fetch(

`https://hospital-management-system-lvu6.onrender.com/appointments/track/${id}`

);



const data = await res.json();



setQueue(data);



}








return(


<div>


<h1>

🚦 Live Queue Tracker

</h1>





<input

placeholder="Enter Appointment ID"

onChange={(e)=>setId(e.target.value)}

/>





<button

className="available"

onClick={track}

>

Track

</button>







{


queue &&



<div className="doctor-card">



<h2>

🎟 Your Token: {queue.your_token}

</h2>




<h2>

🏥 Current Token: {queue.current_token}

</h2>





<h3>

⏳ Patients Before You:

{queue.patients_before_you}


</h3>




<p>

Estimated Wait:

{queue.estimated_wait_minutes} minutes

</p>




<h3>

Status:

{queue.status}

</h3>





</div>



}





</div>


)


}



export default QueueTracker;