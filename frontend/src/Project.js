import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./utils/axios.config";

function Projects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get("annotate/projects");
                if (response.status === 200 || response.status === 202) {
                    setProjects(response.data);
                    
                } else {
                    setError("Failed to fetch projects.");
                }
            } catch (err) {
                setError("An error occurred while fetching projects.");
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        console.log(projects); // Logs whenever projects changes
    }, [projects]); // Logs whenever `projects` is updated

    function handleClick(data) {
        navigate("/annotation", { state: { data } });
    }

    function ProjectsTable({ info }) {
        return info.map((data) => (
            <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>
                    <button onClick={() => handleClick(data)}>Do Task</button>
                </td>
            </tr>
        ));
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
        <h1
                style={{ textAlign: "center", 
                color:"#1abc9c",
                fontSize:"50px"}}>Label Box</h1>
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.length > 0 ? (
                        <ProjectsTable info={projects} />
                    ) : (
                        <tr>
                            <td colSpan="3">No projects available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default Projects;
