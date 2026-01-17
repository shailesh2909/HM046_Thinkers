// Authentication middleware to verify Firebase token
const admin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // For development, you might want to use Firebase Admin SDK
    // For now, we'll pass the token through
    req.user = { uid: token }; // Simplified for development
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

const requireCompany = async (req, res, next) => {
  try {
    const { db } = require("../config/firebaseServices");
    const { doc, getDoc } = require("firebase/firestore");
    
    const userRef = doc(db, "users", req.user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists() || userDoc.data().role !== "company") {
      return res.status(403).json({ error: "Access denied. Company role required." });
    }
    
    next();
  } catch (error) {
    console.error("Role check error:", error);
    res.status(500).json({ error: "Role verification failed" });
  }
};

module.exports = { verifyToken, requireCompany };
