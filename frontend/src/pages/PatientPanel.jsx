import { useEffect, useState } from "react";

function PatientPanel() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [queue, setQueue] = useState(null);

    const [reports, setReports] = useState([]);

    const [records, setRecords] = useState([]);

    function loadQueue() {

        fetch(
            `http://127.0.0.1:8000/appointments/queue/${user.patient_id}`
        )
            .then(res => res.json())
            .then(data => {
                setQueue(data);
            });

    }

    function loadReports() {

        fetch(
            `http://127.0.0.1:8000/files/${user.patient_id}`
        )
            .then(res => res.json())
            .then(data => {
                setReports(data);
            });

    }

    function loadRecords() {

        fetch(
            `http://127.0.0.1:8000/medical-records/${user.patient_id}`
        )
            .then(res => res.json())
            .then(data => {
                setRecords(data);
            });

    }

    useEffect(() => {

        loadQueue();

        loadReports();

        loadRecords();

        const interval = setInterval(() => {

            loadQueue();

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div>

            <h1>👤 Patient Health Portal</h1>

            {/* PROFILE */}

            <div className="dashboard-card">

                <h2>🙋 Welcome</h2>

                <h3>{user.name}</h3>

                <p>Patient ID : {user.patient_id}</p>

            </div>

            <br />

            {/* QUEUE */}

            <div className="dashboard-card">

                <h2>🏥 Appointment Queue</h2>

                {

                    queue?.your_token ?

                        <>

                            <h2>🎟 Token #{queue.your_token}</h2>

                            <p>

                                <strong>Status :</strong> {queue.status}

                            </p>

                            <p>

                                <strong>Patients Before You :</strong>

                                {" "}

                                {queue.patients_before_you}

                            </p>

                            {

                                queue.patients_before_you === 0 ?

                                    <h2 style={{color:"green"}}>

                                        🟢 Your Turn

                                    </h2>

                                    :

                                    <h3>

                                        Estimated Wait :

                                        {" "}

                                        {queue.patients_before_you * 15}

                                        {" "}minutes

                                    </h3>

                            }

                        </>

                        :

                        <h3>No Active Appointment</h3>

                }

            </div>

            <br />

            {/* REPORTS */}

            <div className="dashboard-card">

                <h2>📄 Recent Reports</h2>

                {

                    reports.length === 0 ?

                        <p>No reports uploaded.</p>

                        :

                        reports.slice(0,5).map(report => (

                            <div key={report.file_id}>

                                📁 {report.file_name}

                            </div>

                        ))

                }

            </div>

            <br />

            {/* MEDICAL HISTORY */}

            <div className="dashboard-card">

                <h2>🩺 Medical Timeline</h2>

                {

                    records.length === 0 ?

                        <p>No Medical Records</p>

                        :

                        records.slice(0,5).map(record => (

                            <div
                                key={record.record_id}
                                style={{
                                    borderBottom:"1px solid #ddd",
                                    padding:"10px"
                                }}
                            >

                                <h4>

                                    {record.diagnosis}

                                </h4>

                                <p>

                                    {record.treatment}

                                </p>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default PatientPanel;