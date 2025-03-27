import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";

function UpdateUser() {
    const { id } = useParams();


    const [user, setUser] = useState({
        name: "",
        email: "",
        profileImage: "",
        password: "",
    });

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            toast.error("User not logged in");
            return;
        }


        axios
            .get(`https://thumbpick.onrender.com/GetUsers/${userId}`)
            .then((res) => {
                setUser(res.data);

                const savedProfileImage = localStorage.getItem("profileImage");
                if (savedProfileImage) {
                    setUser(prevUser => ({
                        ...prevUser,
                        profileImage: savedProfileImage,
                    }));
                }
            })
            .catch((err) => {
                console.error("Fetch error:", err.response?.data || err.message);
                toast.error("Error fetching user");
            });
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleRemoveImage = async () => {
        const userId = localStorage.getItem("userId");

        try {
            // Frontend cleanup
            setUser((prevUser) => ({ ...prevUser, profileImage: "" }));
            setImageFile(null);
            localStorage.removeItem("profileImage");

            // Backend update
            await axios.patch(`https://thumbpick.onrender.com/UpdateUser/${userId}`, {
                profileImage: "",
            });

            toast.success("Profile image removed successfully!");
        } catch (error) {
            console.error("Error while removing image:", error);
            toast.error("Failed to update profile image.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        let formData = new FormData();
        formData.append("profile", imageFile);
        formData.append("userId", userId);

        try {
            if (imageFile) {

                const uploadResponse = await axios.post(
                    "https://thumbpick.onrender.com/upload/profile",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );


                const imageUrl = uploadResponse.data.imageUrl;
                setUser(prevUser => ({
                    ...prevUser,
                    profileImage: imageUrl
                }));


                localStorage.setItem("profileImage", imageUrl);


                await axios.patch(`https://thumbpick.onrender.com/UpdateUser/${userId}`, {
                    ...user,
                    profileImage: imageUrl,
                });

                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            toast.error("Error uploading profile picture.");
        }
    };



    return (
        <>
            <div className="dheader">
                <Sidebar />
                <h1 className="text-center">Settings</h1>
            </div>

            <Container className="mt-4">
                <Card className="p-4 shadow-sm">
                    <h4 className="mb-3">Profile Settings</h4>
                    <Form onSubmit={handleSubmit}>
                        {/* Profile Image */}
                        <Form.Group className="mb-3 text-center">
                            {user.profileImage ? (
                                <>
                                    <img
                                        src={user.profileImage}
                                        alt="Profile Preview"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div className="mt-2">
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={handleRemoveImage}
                                        >
                                            Remove Photo
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-muted">No profile photo</div>
                            )}
                        </Form.Group>

                        {/* File input for image upload */}
                        <Form.Group className="mb-3">
                            <Form.Label>Upload New Profile Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <h5 className="mb-3 mt-4">Account Management</h5>

                        <Form.Group className="mb-3">
                            <Form.Label>Change Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default UpdateUser;
