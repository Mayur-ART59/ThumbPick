export const isAuthenticated=()=>{
    const token=localStorage.getItem('Token');
    return !!token;
};

export const IsAdmin = () => {
    const userData = localStorage.getItem("Admin");
  
    if (!userData) return false;
  
    try {
      const parsedUser = JSON.parse(userData);
      return parsedUser.isAdmin === true; 
    } catch (err) {
      console.error("Failed to parse admin data", err);
      return false;
    }
  };
  