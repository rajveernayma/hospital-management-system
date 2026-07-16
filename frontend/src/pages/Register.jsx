import {useState} from "react";



function Register(){


const [data,setData]=useState({

first_name:"",
last_name:"",
age:"",
gender:"",
phone:"",
email:"",
password:""

});





function change(e){


setData({

...data,

[e.target.name]:e.target.value

});


}






async function register(){


await fetch(

"http://127.0.0.1:8000/auth/register",

{

method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(data)

}

);



alert("Account Created");


window.location.reload();



}









return(

<div className="login-page">


<div className="login-box">


<h1>

🏥 Register

</h1>




<input name="first_name"
placeholder="First Name"
onChange={change}/>



<input name="last_name"
placeholder="Last Name"
onChange={change}/>



<input name="age"
placeholder="Age"
onChange={change}/>



<input name="gender"
placeholder="Gender"
onChange={change}/>



<input name="phone"
placeholder="Phone"
onChange={change}/>



<input name="email"
placeholder="Email"
onChange={change}/>



<input

name="password"

type="password"

placeholder="Password"

onChange={change}

/>



<button onClick={register}>


Create Account


</button>





</div>


</div>


)


}



export default Register;