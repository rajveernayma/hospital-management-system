import { useState } from "react";


function Login(){



const [email,setEmail]=useState("");

const [password,setPassword]=useState("");





async function login(){


const response = await fetch(

"http://127.0.0.1:8000/auth/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

email:email,

password:password

})

}


);




const data = await response.json();





if(data.success){


localStorage.setItem(

"user",

JSON.stringify(data.user)

);



window.location.reload();



}


else{


alert(

"Invalid Email or Password"

);


}



}








return(



<div className="login-page">



<div className="login-box">



<h1>

🏥 MediFlow

</h1>




<h3>

Login Portal

</h3>







<input

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>








<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>








<button

onClick={login}

>


Login


</button>








</div>



</div>


)


}



export default Login;