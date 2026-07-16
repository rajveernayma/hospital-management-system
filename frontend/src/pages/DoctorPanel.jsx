import { useEffect, useState } from "react";
import axios from "axios";

function DoctorPanel() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [queue, setQueue] = useState([]);

    const [loading, setLoading] = useState(true);

    function loadQueue() {

        if (!user || !user.doctor_id) return;

        axios
            .get(
                `http://127.0.0.1:8000/appointments/queue/${user.doctor_id}`
            )
            .then(res => {

                setQueue(res.data);

                setLoading(false);

            })
            .catch(err => {

                console.log(err);

                setLoading(false);

            });

    }

    useEffect(() => {

        loadQueue();

        const interval = setInterval(loadQueue, 5000);

        return () => clearInterval(interval);

    }, []);

    function completeAppointment(id) {

        axios
            .put(
                `http://127.0.0.1:8000/appointments/${id}/complete`
            )
            .then(() => {

                alert("✅ Appointment Completed");

                loadQueue();

            });

    }

    const waiting = queue.filter(
        q => q.status === "WAITING"
    ).length;

    const completed = queue.filter(
        q => q.status === "COMPLETED"
    ).length;

    return (

        <div>

            <h1>🩺 Doctor Dashboard</h1>

            <div className="dashboard-grid">

                <div className="dashboard-card">

                    <h2>👨‍⚕️ Doctor</h2>

                    <h3>{user.name}</h3>

                </div>

                <div className="dashboard-card">

                    <h2>📋 Total Queue</h2>

                    <h1>{queue.length}</h1>

                </div>

                <div className="dashboard-card">

                    <h2>🟡 Waiting</h2>

                    <h1>{waiting}</h1>

                </div>

                <div className="dashboard-card">

                    <h2>✅ Completed</h2>

                    <h1>{completed}</h1>

                </div>

            </div>

            <br />

            {

                loading ?

                <h2>Loading...</h2>

                :

                queue.length === 0 ?

                <div className="dashboard-card">

                    <h2>🎉 No Patients Waiting</h2>

                </div>

                :

                <>

                    <div className="dashboard-card">

                        <h2>⭐ Current Patient</h2>

                        <h3>

                            👤 {queue[0].patient}

                        </h3>

                        <p>

                            🎟 Token :
                            {" "}
                            {queue[0].token_number}

                        </p>

                        <p>

                            🩺 Symptoms :
                            {" "}
                            {queue[0].symptoms}

                        </p>

                        <p>

                            Status :
                            {" "}
                            {queue[0].status}

                        </p>

                        {

                            queue[0].status === "WAITING" &&

                            <button

                                onClick={() =>
                                    completeAppointment(
                                        queue[0].appointment_id
                                    )
                                }

                            >

                                ✅ Complete Visit

                            </button>

                        }

                    </div>

                    <br />

                    <div className="dashboard-card">

                        <h2>📋 Today's Queue</h2>

                        <table
                            width="100%"
                            cellPadding="10"
                        >

                            <thead>

                                <tr>

                                    <th>Token</th>

                                    <th>Patient</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    queue.map(item => (

                                        <tr
                                            key={item.appointment_id}
                                        >

                                            <td>

                                                {item.token_number}

                                            </td>

                                            <td>

                                                {item.patient}

                                            </td>

                                            <td>

                                                {item.status}

                                            </td>

                                            <td>

                                                {

                                                    item.status === "WAITING"

                                                    ?

                                                    <button

                                                        onClick={() =>
                                                            completeAppointment(
                                                                item.appointment_id
                                                            )
                                                        }

                                                    >

                                                        Complete

                                                    </button>

                                                    :

                                                    "✔"

                                                }

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </>

            }

        </div>

    );

}

export default DoctorPanel;