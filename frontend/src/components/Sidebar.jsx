import { Link } from "react-router-dom";


function Sidebar(){


return(

<div>

<h2>🏥 MediFlow</h2>


<ul>

<li>
<Link to="/">Dashboard</Link>
</li>


<li>
<Link to="/patients">Patients</Link>
</li>


<li>
<Link to="/add-patient">Add Patient</Link>
</li>


<li>
<Link to="/doctors">Doctors</Link>
</li>


<li>
<Link to="/appointments">Appointments</Link>
</li>


</ul>


</div>


)


}


export default Sidebar;