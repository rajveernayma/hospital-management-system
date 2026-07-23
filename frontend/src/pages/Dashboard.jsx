import { useEffect, useState } from "react";

function Dashboard() {

    const [data, setData] = useState({

        patients: 0,

        doctors: 0,

        appointments: 0,

        today_appointments: 0,

        waiting: 0,

        completed: 0,

        revenue: 0,

        latest: []

    });

    useEffect(() => {

        fetch("https://hospital-management-system-lvu6.onrender.com/dashboard")

            .then(res => res.json())

            .then(result => {

                setData(result);

            })

            .catch(() => {

                alert("Unable to load dashboard");

            });

    }, []);

    return (

        <div>

            <h1>🏥 MediFlow Admin Dashboard</h1>

            <div className="dashboard-grid">

                <div className="dashboard-card">

                    <h2>👥 Patients</h2>

                    <h1>{data.patients}</h1>

                    <p>Total Registered Patients</p>

                </div>

                <div className="dashboard-card">

                    <h2>👨‍⚕️ Doctors</h2>

                    <h1>{data.doctors}</h1>

                    <p>Hospital Doctors</p>

                </div>

                <div className="dashboard-card">

                    <h2>📅 Appointments</h2>

                    <h1>{data.appointments}</h1>

                    <p>Total Bookings</p>

                </div>

                <div className="dashboard-card">

                    <h2>💰 Revenue</h2>

                    <h1>₹ {data.revenue}</h1>

                    <p>Total Revenue</p>

                </div>

                <div className="dashboard-card">

                    <h2>📆 Today's Appointments</h2>

                    <h1>{data.today_appointments}</h1>

                    <p>Today's Schedule</p>

                </div>

                <div className="dashboard-card">

                    <h2>🟡 Waiting Queue</h2>

                    <h1>{data.waiting}</h1>

                    <p>Patients Waiting</p>

                </div>

                <div className="dashboard-card">

                    <h2>✅ Completed</h2>

                    <h1>{data.completed}</h1>

                    <p>Completed Visits</p>

                </div>

            </div>

            <br />

            <div className="dashboard-card">

                <h2>🕒 Latest Appointments</h2>

                <table
                    width="100%"
                    cellPadding="10"
                >

                    <thead>

                        <tr>

                            <th>Patient</th>

                            <th>Doctor</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            data.latest.length === 0 ?

                                (

                                    <tr>

                                        <td colSpan="3">

                                            No Recent Appointments

                                        </td>

                                    </tr>

                                )

                                :

                                data.latest.map((item) => (

                                    <tr key={item.appointment_id}>

                                        <td>{item.patient}</td>

                                        <td>{item.doctor}</td>

                                        <td>{item.status}</td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Dashboard;