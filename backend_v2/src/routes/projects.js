const express = require("express");
const router = express.Router();
const { db } = require("../config/firebaseServices");
const {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment
} = require("firebase/firestore");
const { verifyToken, requireCompany } = require("../middleware/auth");

// Get all projects (with filters)
router.get("/", verifyToken, async (req, res) => {
  try {
    const { companyId, status } = req.query;
    
    let projectsQuery;
    const projectsRef = collection(db, "projects");
    
    if (companyId && status) {
      projectsQuery = query(
        projectsRef,
        where("companyId", "==", companyId),
        where("status", "==", status),
        orderBy("createdAt", "desc")
      );
    } else if (companyId) {
      projectsQuery = query(
        projectsRef,
        where("companyId", "==", companyId),
        orderBy("createdAt", "desc")
      );
    } else if (status) {
      projectsQuery = query(
        projectsRef,
        where("status", "==", status),
        orderBy("createdAt", "desc")
      );
    } else {
      projectsQuery = query(projectsRef, orderBy("createdAt", "desc"));
    }
    
    const snapshot = await getDocs(projectsQuery);
    const projects = [];
    
    snapshot.forEach(doc => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Get single project
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const projectRef = doc(db, "projects", id);
    const projectDoc = await getDoc(projectRef);
    
    if (!projectDoc.exists()) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    res.json({ success: true, data: { id: projectDoc.id, ...projectDoc.data() } });
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// Create new project
router.post("/", verifyToken, requireCompany, async (req, res) => {
  try {
    const {
      title,
      description,
      requiredSkills,
      compensationType,
      budget,
      timeline,
      deadline,
      freelancersRequired,
      submissionType,
      status
    } = req.body;
    
    // Get company name
    const companyRef = doc(db, "companies", req.user.uid);
    const companyDoc = await getDoc(companyRef);
    const companyName = companyDoc.exists() ? companyDoc.data().companyName : "Unknown Company";
    
    const projectData = {
      companyId: req.user.uid,
      companyName,
      title,
      description,
      requiredSkills: requiredSkills || [],
      compensationType: compensationType || "fixed",
      budget: budget || 0,
      timeline: timeline || "",
      deadline: deadline || null,
      freelancersRequired: freelancersRequired || 1,
      submissionType: submissionType || "code",
      status: status || "draft",
      applicantsCount: 0,
      shortlistedCount: 0,
      selectedFreelancer: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const newProjectRef = doc(collection(db, "projects"));
    await setDoc(newProjectRef, projectData);
    
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: { id: newProjectRef.id, ...projectData }
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Update project
router.put("/:id", verifyToken, requireCompany, async (req, res) => {
  try {
    const { id } = req.params;
    
    const projectRef = doc(db, "projects", id);
    const projectDoc = await getDoc(projectRef);
    
    if (!projectDoc.exists()) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    const project = projectDoc.data();
    if (project.companyId !== req.user.uid) {
      return res.status(403).json({ error: "Cannot modify another company's project" });
    }
    
    const updateData = {
      ...req.body,
      updatedAt: serverTimestamp()
    };
    
    // Remove fields that shouldn't be updated directly
    delete updateData.companyId;
    delete updateData.applicantsCount;
    delete updateData.shortlistedCount;
    delete updateData.createdAt;
    
    await updateDoc(projectRef, updateData);
    
    res.json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete project
router.delete("/:id", verifyToken, requireCompany, async (req, res) => {
  try {
    const { id } = req.params;
    
    const projectRef = doc(db, "projects", id);
    const projectDoc = await getDoc(projectRef);
    
    if (!projectDoc.exists()) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    const project = projectDoc.data();
    if (project.companyId !== req.user.uid) {
      return res.status(403).json({ error: "Cannot delete another company's project" });
    }
    
    await deleteDoc(projectRef);
    
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Update project status
router.patch("/:id/status", verifyToken, requireCompany, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!["draft", "open", "closed", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    
    const projectRef = doc(db, "projects", id);
    const projectDoc = await getDoc(projectRef);
    
    if (!projectDoc.exists()) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    const project = projectDoc.data();
    if (project.companyId !== req.user.uid) {
      return res.status(403).json({ error: "Cannot modify another company's project" });
    }
    
    await updateDoc(projectRef, {
      status,
      updatedAt: serverTimestamp()
    });
    
    res.json({ success: true, message: "Project status updated successfully" });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ error: "Failed to update project status" });
  }
});

module.exports = router;
