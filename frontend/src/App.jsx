import { Routes, Route, Link, Navigate } from "react-router-dom";


import Billing from "./pages/Billing";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Prescription from "./pages/Prescription";
import DoctorPanel from "./pages/DoctorPanel";
import PatientPanel from "./pages/PatientPanel";
import BookAppointment from "./pages/BookAppointment";
import QueueTracker from "./pages/QueueTracker";
import MedicalHistory from "./pages/MedicalHistory";
import AddMedicalRecord from "./pages/AddMedicalRecord";
import Reports from "./pages/Reports";


import {
FaHospital,
FaUserInjured,
FaUserMd,
FaCalendarCheck,
FaSignOutAlt,
FaNotesMedical
} from "react-icons/fa";


import "./index.css";





function App(){


const user = JSON.parse(
localStorage.getItem("user")
);



if(!user){

return <Login/>

}




function logout(){

localStorage.removeItem("user");

window.location.reload();

}




function HomeRedirect(){


if(user.role==="ADMIN"){

return <Dashboard/>

}



if(user.role==="DOCTOR"){

return <DoctorPanel/>

}



if(user.role==="PATIENT"){

return <PatientPanel/>

}


}









return(

<div className="layout">



<div className="sidebar">



<h2>

<FaHospital/>

MediFlow

</h2>




<div className="user-box">


<h3>

👋 {user.name}

</h3>


<p>

{user.role}

</p>


</div>





<Link to="/">

🏠 Home

</Link>









{/* PATIENT MENU */}


{

user.role==="PATIENT"

&&

<>


<Link to="/patient-panel">

👤 My Portal

</Link>



<Link to="/book">

📅 Book Appointment

</Link>



<Link to="/queue">

🚦 My Queue Number

</Link>



<Link to="/history">

🏥 My Medical History

</Link>



<Link to="/reports">

📤 My Reports

</Link>



</>


}










{/* DOCTOR MENU */}


{

user.role==="DOCTOR"

&&

<>


<Link to="/doctor-panel">

🩺 Doctor Panel

</Link>



<Link to="/add-record">

📝 Add Medical Record

</Link>


</>

}










{/* ADMIN + DOCTOR */}


{

(user.role==="ADMIN" || user.role==="DOCTOR")

&&


<Link to="/patients">

<FaUserInjured/>

Patients

</Link>


}









{/* ADMIN */}


{

user.role==="ADMIN"

&&

<>


<Link to="/add-patient">

➕ Add Patient

</Link>



<Link to="/doctors">

<FaUserMd/>

Doctors

</Link>


</>

}









<Link to="/appointments">

<FaCalendarCheck/>

Appointments

</Link>





<Link to="/prescriptions">

<FaNotesMedical/>

Prescriptions

</Link>






{

(user.role==="ADMIN" || user.role==="PATIENT")

&&


<Link to="/billing">

💳 Billing

</Link>


}







<button

className="logout-btn"

onClick={logout}

>

<FaSignOutAlt/>

Logout


</button>



</div>









<div className="content">



<Routes>



<Route

path="/"

element={<HomeRedirect/>}

/>



<Route

path="/patient-panel"

element={<PatientPanel/>}

/>



<Route

path="/book"

element={<BookAppointment/>}

/>



<Route

path="/queue"

element={<QueueTracker/>}

/>



<Route

path="/history"

element={<MedicalHistory/>}

/>



<Route

path="/reports"

element={<Reports/>}

/>






<Route

path="/doctor-panel"

element={<DoctorPanel/>}

/>



<Route

path="/add-record"

element={<AddMedicalRecord/>}

/>







<Route

path="/patients"

element={<Patients/>}

/>



<Route

path="/add-patient"

element={<AddPatient/>}

/>



<Route

path="/doctors"

element={<Doctors/>}

/>



<Route

path="/appointments"

element={<Appointments/>}

/>



<Route

path="/prescriptions"

element={<Prescription/>}

/>



<Route

path="/billing"

element={<Billing/>}

/>



<Route

path="*"

element={<Navigate to="/"/>}

/>



</Routes>



</div>



</div>


)


}



export default App;