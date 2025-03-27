import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaInfoCircle, FaTag, FaTrashAlt } from "react-icons/fa";
import { Container, Row, Col, Card } from "react-bootstrap";
import Thumbnailmodal from "../Components/Thumbnailmodal";

function Cards() {
    const [data, setData] = useState([]);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        axios.get(`https://thumbpick.onrender.com/GetThumbnails/${userId}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error fetching thumbnails");
            });
    }, []);

    const handleCardClick = (thumbnail, index) => {
        setSelectedThumbnail(thumbnail);
        setStartIndex(index);
    };
    const handleDelete = async (thumbnailId) => {
        if (window.confirm("Are you sure you want to delete this thumbnail?")) {
            try {
                await axios.delete(`https://thumbpick.onrender.com/thumbnails/${thumbnailId}`);
                toast.success("Thumbnail deleted successfully");
                setData(prev => prev.filter(item => item._id !== thumbnailId));
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete thumbnail");
            }
        }
    };


    return (<>
        <Container className="my-4">
            <h2 className="text-center mb-4">Thumbnails</h2>
            <Row className="g-4">
                {data.map((thumbnail, index) => (
                    <Col key={thumbnail._id} xs={12} sm={6} md={4} lg={3}>
                        <Card onClick={() => handleCardClick(thumbnail, 0)} className="mb-4 shadow-sm" style={{ cursor: "pointer" }} >
                            <Card.Img variant="top" src={thumbnail.images[0]} alt={thumbnail.title} style={{ height: "200px", objectFit: "cover" }} />
                            <Card.Body className="d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <small className="text-muted">
                                        {thumbnail.uploadDate
                                            ? new Date(thumbnail.uploadDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })
                                            : "Date Unknown"}
                                    </small>

                                    <div className="d-flex align-items-center gap-2">
                                        <FaTrashAlt
                                            className="text-danger"
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(thumbnail._id);
                                            }}
                                        />
                                    </div>
                                </div>


                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        <Thumbnailmodal
            show={selectedThumbnail !== null}
            onClose={() => setSelectedThumbnail(null)}
            selectedThumbnail={selectedThumbnail}
            startIndex={startIndex}
        />
    </>
    );
}

export default Cards;
