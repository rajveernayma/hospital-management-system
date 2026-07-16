import { useState, useEffect } from "react";

function BookAppointment() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [doctors, setDoctors] = useState([]);

    const [doctorInfo, setDoctorInfo] = useState(null);

    const [form, setForm] = useState({
        doctor_id: "",
        symptoms: ""
    });

    useEffect(() => {
        loadDoctors();
    }, []);

    async function loadDoctors() {

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/doctors/list"
            );

            const data = await response.json();

            setDoctors(data);

        }

        catch {

            alert("Unable to load doctors.");

        }

    }

    async function loadDoctorInfo(id){

        if(id===""){

            setDoctorInfo(null);

            return;

        }

        try{

            const response = await fetch(

                `http://127.0.0.1:8000/doctors/availability/${id}`

            );

            const data = await response.json();

            setDoctorInfo(data);

        }

        catch{

            setDoctorInfo(null);

        }

    }

    function handleChange(e){

        const {name,value}=e.target;

        setForm({

            ...form,

            [name]:value

        });

        if(name==="doctor_id"){

            loadDoctorInfo(value);

        }

    }

    async function bookAppointment(){

        if(form.doctor_id===""){

            alert("Please select a doctor.");

            return;

        }

        if(form.symptoms.trim()===""){

            alert("Please enter symptoms.");

            return;

        }

        try{

            const orderResponse=await fetch(

                "http://127.0.0.1:8000/payment/create",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json"

                    },

                    body:JSON.stringify({

                        amount:500

                    })

                }

            );

            const order=await orderResponse.json();

            const options={

                key:order.key,

                amount:order.amount,

                currency:"INR",

                name:"MediFlow Hospital",

                description:"Doctor Appointment",

                order_id:order.order_id,

                handler:async function(payment){

                    const verify=await fetch(

                        "http://127.0.0.1:8000/payment/verify",

                        {

                            method:"POST",

                            headers:{

                                "Content-Type":"application/json"

                            },

                            body:JSON.stringify(payment)

                        }

                    );

                    const verifyData=await verify.json();

                    if(verifyData.success){

                        const appointment=await fetch(

                            "http://127.0.0.1:8000/appointments/book",

                            {

                                method:"POST",

                                headers:{

                                    "Content-Type":"application/json"

                                },

                                body:JSON.stringify({

                                    patient_id:user.patient_id,

                                    doctor_id:Number(form.doctor_id),

                                    symptoms:form.symptoms

                                })

                            }

                        );

                        const result=await appointment.json();

                        alert(

                            `🎉 Payment Successful

✅ Appointment Booked

👨‍⚕️ Doctor : Dr. ${doctorInfo.first_name} ${doctorInfo.last_name}

🎫 Token Number : ${result.your_token}

⏳ Patients Waiting : ${doctorInfo.waiting}

⌛ Estimated Wait : ${doctorInfo.estimated_wait} Minutes`

                        );

                        setForm({

                            doctor_id:"",
                            symptoms:""

                        });

                        setDoctorInfo(null);

                    }

                    else{

                        alert("Payment Verification Failed");

                    }

                },

                theme:{

                    color:"#2563eb"

                }

            };

            new window.Razorpay(options).open();

        }

        catch{

            alert("Something went wrong.");

        }

    }

    return(

        <div className="card">

            <h1>🩺 Book Appointment</h1>

            <select

                name="doctor_id"

                value={form.doctor_id}

                onChange={handleChange}

            >

                <option value="">

                    Select Doctor

                </option>

                {

                    doctors.map((doctor)=>(

                        <option

                            key={doctor.doctor_id}

                            value={doctor.doctor_id}

                        >

                            Dr. {doctor.first_name} {doctor.last_name} | {doctor.specialization}

                        </option>

                    ))

                }

            </select>

            <br/><br/>

            {

                doctorInfo && (

                    <div
                        style={{
                            border:"1px solid #ddd",
                            padding:"15px",
                            borderRadius:"10px",
                            background:"#f8fafc",
                            marginBottom:"20px"
                        }}
                    >

                        <h3>

                            👨‍⚕️ Dr. {doctorInfo.first_name} {doctorInfo.last_name}

                        </h3>

                        <p>

                            <strong>Specialization:</strong> {doctorInfo.specialization}

                        </p>

                        <p>

                            <strong>Consultation Fee:</strong> ₹{doctorInfo.consultation_fee}

                        </p>

                        <p>

                            <strong>Status:</strong> {doctorInfo.status}

                        </p>

                        <p>

                            <strong>Patients Waiting:</strong> {doctorInfo.waiting}

                        </p>

                        <p>

                            <strong>Estimated Wait:</strong> {doctorInfo.estimated_wait} Minutes

                        </p>

                    </div>

                )

            }

            <textarea

                name="symptoms"

                placeholder="Describe your symptoms"

                rows="5"

                value={form.symptoms}

                onChange={handleChange}

            />

            <br/><br/>

            <button

                onClick={bookAppointment}

            >

                💳 Pay ₹500 & Book Appointment

            </button>

        </div>

    );

}

export default BookAppointment;