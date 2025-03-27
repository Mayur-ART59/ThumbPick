import React, { useEffect, useState } from "react";
import { Modal, Carousel, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";


function Thumbnailmodal({ show, onClose, selectedThumbnail, startIndex, refreshLikeCounts }) {
  const [data, setData] = useState([]);
  const [likedThumbnails, setLikedThumbnails] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [currentIndex, setCurrentIndex] = useState(startIndex || 0);

  const fetchLikeCount = async (thumbnailId, imageIndex) => {
    const key = `${thumbnailId}-${imageIndex}`;
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.get(`http://localhost:5000/likes/${thumbnailId}?userId=${userId}`);

      setLikeCounts((prev) => ({
        ...prev,
        [key]: res.data.likeCounts[key] || 0
      }));

      setLikedThumbnails((prev) => ({
        ...prev,
        [key]: res.data.userLikes[key] || false
      }));

    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios.get("http://localhost:5000/GetThumbnails")
      .then((res) => {
        setData(res.data);
        const storedLikes = JSON.parse(localStorage.getItem("likedThumbnails")) || {};
        let likedState = {};

        res.data.forEach((thumbnail) => {
          thumbnail.images.forEach((_, index) => {
            const key = `${thumbnail._id}-${index}`;
            likedState[key] = storedLikes[key] || false;
            fetchLikeCount(thumbnail._id, index);
          });
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching thumbnails");
      });
  }, []);

  useEffect(() => {
    if (show && typeof startIndex === "number") {
      setCurrentIndex(startIndex);
    }
  }, [show, startIndex]);

  const handleLikeToggle = async (thumbnailId, imageIndex) => {
    const key = `${thumbnailId}-${imageIndex}`;
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User not logged in! Please log in to like thumbnails.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/like", { thumbnailId, userId, imageIndex });

      if (res.data.warning) {
        toast.warning(res.data.warning);
        return;
      }

      setLikedThumbnails((prev) => {
        const updatedLikes = { ...prev, [key]: res.data.liked };
        localStorage.setItem("likedThumbnails", JSON.stringify(updatedLikes));
        return updatedLikes;
      });

      setLikeCounts((prev) => ({
        ...prev,
        [key]: res.data.liked ? (prev[key] || 0) + 1 : Math.max((prev[key] || 0) - 1, 0),
      }));
      if (refreshLikeCounts) refreshLikeCounts();

    } catch (error) {
      console.error("Error in liking/unliking:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!selectedThumbnail) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg" className="thumb-modal" backdropClassName="modal-backdrop">
      <Modal.Body className="position-relative text-light">
        <button onClick={onClose} className="btn btn-light position-absolute" style={{ top: "10px", right: "10px", zIndex: 10 }}>
          <FaTimes />
        </button>

        <Carousel activeIndex={currentIndex}
          onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)} indicators={true} keyboard={true} wrap={true} interval={null} >
          {selectedThumbnail.images.map((img, idx) => {
            const key = `${selectedThumbnail._id}-${idx}`;

            return (
              <Carousel.Item key={idx}>
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                  <img
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    style={{ maxHeight: "70vh", maxWidth: "80vw", objectFit: "contain" }}
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <hr className="border border-light border-1 opacity-50" />
        <div className=" ps-3 bg-black text-start">
          <h5 className="mb-1">{selectedThumbnail.title}</h5>
          <p className="mb-0">Uploaded by: <strong>{selectedThumbnail.uploaderName || "Unknown"}</strong></p>
          <small className="text-light">{new Date(selectedThumbnail.uploadDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</small>

          <div className="text-end me-5" style={{ position: 'relative', bottom: '70px', }}>
            <Button
              className={` border-0  ${likedThumbnails[`${selectedThumbnail._id}-${currentIndex}`] ? "liked bg-primary" : "bg-dark"}`}
              style={{ height: '39px', borderRadius: '50%' }}
              size="sm"
              onClick={() => handleLikeToggle(selectedThumbnail._id, currentIndex)}>
              {likedThumbnails[`${selectedThumbnail._id}-${currentIndex}`]
                ?
                <img src="https://cdn-icons-png.flaticon.com/128/15567/15567917.png" style={{ height: '25px', width: '25px' }} />
                :
                <img src="https://cdn-icons-png.flaticon.com/128/18814/18814796.png" style={{ height: '25px', width: '25px' }} />}
            </Button>
            <p className="mt-1 fw-semibold">
              {likeCounts[`${selectedThumbnail._id}-${currentIndex}`] || ""} Likes
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Thumbnailmodal;
