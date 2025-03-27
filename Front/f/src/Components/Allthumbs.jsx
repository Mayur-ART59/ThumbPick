import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaInfoCircle, FaTag, FaRegThumbsUp } from "react-icons/fa";
import { Container, Row, Col, Card } from "react-bootstrap";
import Thumbnailmodal from "../Components/Thumbnailmodal";
import AOS from "aos";

function Allthumbs({ limit = null }) {
    const [data, setData] = useState([]);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [likeCounts, setLikeCounts] = useState({});

    const refreshLikeCounts = () => {
        axios.get("http://localhost:5000/likes/totalPerThumbnail").then((res) => {
            const counts = {};
            res.data.forEach((item) => { counts[item._id] = item.totalLikes; });
            setLikeCounts(counts);
        }).catch((err) => {
            console.error(err);
            toast.error("Error refreshing like counts");
        });
    };

    useEffect(() => {
        axios.get("http://localhost:5000/GetThumbnails").then((res) => {
            setData(res.data);
        }).catch((err) => {
            console.error(err);
            toast.error("Error fetching thumbnails");
        });

        refreshLikeCounts();
        AOS.init({ duration: 800, once: false });
    }, []);

    const handleCardClick = (thumbnail, index) => {
        setSelectedThumbnail(thumbnail);
        setStartIndex(index);
    };

    return (
        <>
        <div className="thumbs-bg">
            <Container className="my-4">
                <h2 className="text-center mb-4">Thumbnails</h2>
                <Row className="g-4">
                {data.slice(0, limit || data.length).map((thumbnail, i) => (
                        <Col key={thumbnail._id} xs={12} sm={6} md={4} lg={4} data-aos="zoom-in" data-aos-delay={i * 60}>
                            <Card onClick={() => handleCardClick(thumbnail, thumbnail.mostLikedImageIndex)} className="mb-4 border-0 shadow-lg card-hover" style={{ cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.3s ease", borderRadius: "15px", overflow: "hidden" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                                <Card.Img variant="top" src={thumbnail.images[thumbnail.mostLikedImageIndex]} alt={thumbnail.title} style={{ height: "200px", objectFit: "cover", borderBottom: "1px solid #ddd" }} />
                                <Card.Body className="d-flex flex-column" style={{ padding: "1rem" }}>
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <img src={thumbnail.uploaderImage || "https://cdn-icons-png.flaticon.com/128/18125/18125416.png"} alt="Uploader" className="rounded-circle border" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                        <div>
                                            <small className="text-muted">Uploaded by</small><br />
                                            <strong style={{ fontSize: "15px" }}>{thumbnail.uploaderName || "Unknown"}</strong>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <small className="text-muted">{thumbnail.uploadDate ? new Date(thumbnail.uploadDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Date Unknown"}</small>
                                        <div className="d-flex align-items-center gap-3">
                                            {likeCounts[thumbnail._id] > 0 && (
                                                <span className="d-flex align-items-center gap-1 px-2 py-1" style={{ backgroundColor: "#f0f8ff", borderRadius: "20px", fontSize: "0.85rem", color: "#007bff" }}><FaRegThumbsUp /> {likeCounts[thumbnail._id]}</span>
                                            )}
                                            <FaInfoCircle title="More Info" className="text-secondary" />
                                            <FaTag title="Tags" className="text-secondary" />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            </div>
            <Thumbnailmodal show={selectedThumbnail !== null} onClose={() => setSelectedThumbnail(null)} selectedThumbnail={selectedThumbnail} startIndex={startIndex} refreshLikeCounts={refreshLikeCounts} />
        </>
    );
}

export default Allthumbs;
