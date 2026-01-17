const express = require("express");
const router = express.Router();
const { db } = require("../config/firebaseServices");
const { doc, getDoc, setDoc, updateDoc, serverTimestamp } = require("firebase/firestore");
const { verifyToken, requireCompany } = require("../middleware/auth");

// Get company profile
router.get("/:uid", verifyToken, async (req, res) => {
  try {
    const { uid } = req.params;
    
    const companyRef = doc(db, "companies", uid);
    const companyDoc = await getDoc(companyRef);
    
    if (!companyDoc.exists()) {
      return res.status(404).json({ error: "Company not found" });
    }
    
    res.json({ success: true, data: companyDoc.data() });
  } catch (error) {
    console.error("Get company error:", error);
    res.status(500).json({ error: "Failed to fetch company profile" });
  }
});

// Create/Update company profile
router.put("/:uid", verifyToken, requireCompany, async (req, res) => {
  try {
    const { uid } = req.params;
    
    if (req.user.uid !== uid) {
      return res.status(403).json({ error: "Cannot modify another company's profile" });
    }
    
    const {
      companyName,
      logo,
      industry,
      description,
      website,
      location,
      companySize,
      contactEmail
    } = req.body;
    
    // Calculate profile completion
    let profileComplete = 0;
    const fields = [companyName, logo, industry, description, website, location, companySize, contactEmail];
    fields.forEach(field => {
      if (field && field.trim() !== "") profileComplete += 12.5;
    });
    
    const companyData = {
      uid,
      companyName: companyName || "",
      logo: logo || "",
      industry: industry || "",
      description: description || "",
      website: website || "",
      location: location || "",
      companySize: companySize || "",
      contactEmail: contactEmail || "",
      profileComplete: Math.round(profileComplete),
      updatedAt: serverTimestamp()
    };
    
    const companyRef = doc(db, "companies", uid);
    const companyDoc = await getDoc(companyRef);
    
    if (companyDoc.exists()) {
      await updateDoc(companyRef, companyData);
    } else {
      companyData.createdAt = serverTimestamp();
      await setDoc(companyRef, companyData);
    }
    
    res.json({ success: true, message: "Profile updated successfully", data: companyData });
  } catch (error) {
    console.error("Update company error:", error);
    res.status(500).json({ error: "Failed to update company profile" });
  }
});

// Get company statistics
router.get("/:uid/stats", verifyToken, requireCompany, async (req, res) => {
  try {
    const { uid } = req.params;
    const { collection, query, where, getDocs } = require("firebase/firestore");
    
    // Get projects count
    const projectsRef = collection(db, "projects");
    const projectsQuery = query(projectsRef, where("companyId", "==", uid));
    const projectsSnapshot = await getDocs(projectsQuery);
    
    let totalProjects = 0;
    let activeProjects = 0;
    let totalApplicants = 0;
    
    projectsSnapshot.forEach(doc => {
      totalProjects++;
      const project = doc.data();
      if (project.status === "open") activeProjects++;
      totalApplicants += project.applicantsCount || 0;
    });
    
    res.json({
      success: true,
      data: {
        totalProjects,
        activeProjects,
        totalApplicants,
        shortlistedCount: 0 // Will be calculated from applications
      }
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

module.exports = router;
