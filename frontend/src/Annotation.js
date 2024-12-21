import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactPictureAnnotation } from "react-picture-annotation";
import axiosInstance from "./utils/axios.config";
import './App.css';

function Annotation() {
    const location = useLocation();
    const { data } = location.state;

    const navigate = useNavigate()

    const [pageSize, setPageSize] = useState({
        height: window.innerHeight * 0.7, // Initial height
        width: window.innerWidth * 0.7,  // Initial width
    });

    const [imageData, setImageData] = useState(null);
    const [error, setError] = useState(null);
    const [annotations, setAnnotations] = useState([]); // Store annotation data

    // Handle window resize
    useEffect(() => {
        const onResize = () => {
            setPageSize({ width: window.innerWidth * 0.7, height: window.innerHeight * 0.7 });
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Fetch image data
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axiosInstance.get(`annotate/annotations/${data.id}`);
                if (response.status === 200 || response.status === 202) {
                    setImageData(response.data);
                } else {
                    setError("Failed to fetch image data.");
                }
            } catch (err) {
                setError("An error occurred while fetching image data.");
            }
        };

        fetchdata();
    }, [data.id]);

    // Handle selection in the annotation tool
    const onSelect = (selectedId) => console.log("Selected Annotation ID:", selectedId);

    // Update annotations when changes are made
    const onChange = (annotationData) => setAnnotations(annotationData);

    // Submit annotations
    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.put(`annotate/annotations/${data.id}/`, { data: annotations });
            if (response.status === 200 || response.status === 201) {
                alert("Annotations submitted successfully.");
                navigate("/")
            } else {
                alert("Failed to submit annotations.");
            }
        } catch (err) {
            alert("An error occurred while submitting annotations.");
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!imageData) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="annotation-container">
            <div className="annotation-header">
                <h1>{data.name}</h1>
                <h3>{data.description}</h3>
            </div>
            <div className="annotation-tool-wrapper">
                <ReactPictureAnnotation
                    style={{ border: "2px solid black", borderRadius: "8px" }}
                    annotationStyle={{
                        border: "1px solid red",
                    }}
                    image={imageData.image}
                    onSelect={onSelect}
                    onChange={onChange}
                    width={pageSize.width}
                    height={pageSize.height}
                />
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                Submit Annotations
            </button>
        </div>
    );
}

export default Annotation;