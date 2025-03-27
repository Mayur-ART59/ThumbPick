import React, { useState, useRef } from 'react';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Upload() {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);


  const userId = localStorage.getItem("userId");

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    
    const combinedFiles = [...images, ...newFiles].slice(0, 5);
    setImages(combinedFiles);

   
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    const combinedPreviews = [...preview, ...newPreviews].slice(0, 5);
    setPreview(combinedPreviews);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreview = [...preview];

    updatedImages.splice(index, 1);
    URL.revokeObjectURL(updatedPreview[index]);
    updatedPreview.splice(index, 1);

    setImages(updatedImages);
    setPreview(updatedPreview);
  
    if (updatedImages.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  const navigate = useNavigate();
  const handleUpload = async () => {
    if (!title.trim()) {
      toast.warning("Please enter a title.");
      return;
    }
    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }
    if (images.length < 2) {
      toast.warning("Please select at least 2 thumbnails.");
      return;
    }
  
    setLoading(true);
    const formData = new FormData();
    images.forEach((image) => formData.append("thumbnails", image));
    formData.append("userId", userId);
    formData.append("title", title);
  
    try {
      const res = await axios.post("http://localhost:5000/upload/thumbnails", formData);
      toast.success("Upload successful!");
      setImages([]);
      setPreview([]);
      setTitle('');
      navigate('/Myuploads')
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed: " + (err.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="dheader">
        <Sidebar />
      
        <h1 className="text-center "> Upload Thumbnails</h1>
        
      </div>

      <div className="upload-container">
        <div className="upload-box">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this upload"
            className="title-input"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            ref={fileInputRef}
            style={{ display: "none" }}
  id="file-upload"
          /> <label htmlFor="file-upload" style={{ cursor: "pointer", display: "inline-block" }}>
          <img id='upload-btn'
            src="https://cdn-icons-png.flaticon.com/128/8466/8466735.png"  
            alt="Upload"
            style={{ width: "64px", height: "64px" }}
          />
        </label>
        

          <div className="preview-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {preview.map((src, index) => (
              <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={src}
                  alt={`preview-${index}`}
                  onClick={() => setSelectedImage(src)}
                />
                <button onClick={() => removeImage(index)} style={{ position: 'absolute',top: '-6px', right: '-6px', background: '#ff4d4d', border: 'none', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer',fontWeight: 'bold', fontSize: '14px', lineHeight: '18px', padding: 0 }}>
                  ×
                </button>
               
              </div>
            ))}
          </div>

          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload Thumbnails"}
          </button>
        </div>
       

        <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)} size="lg" centered>
          <Modal.Body className="text-center">
            <Button variant="light" className="position-absolute top-0 end-0 m-2" onClick={() => setSelectedImage(null)}>
              ❌
            </Button>
            <img src={selectedImage} alt="Enlarged Thumbnail" className="img-fluid" style={{ width: "100%", maxHeight: "100vh", objectFit: "contain" }} />
          </Modal.Body>
        </Modal>
      </div>
     
    </>
  );
}

export default Upload;
