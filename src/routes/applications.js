const express = require("express");
const router = express.Router();
const { db } = require("../config/firebaseServices");
const {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
  writeBatch
} = require("firebase/firestore");
const { verifyToken, requireCompany } = require("../middleware/auth");

// Get all applications for a project
router.get("/projects/:projectId/applications", verifyToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.query;
    
    // Verify project belongs to company
    const projectRef = doc(db, "projects", projectId);
    const projectDoc = await getDoc(projectRef);
    
    if (!projectDoc.exists()) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    const applicationsRef = collection(db, "applications");
    let applicationsQuery;
    
    if (status) {
      applicationsQuery = query(
        applicationsRef,
        where("projectId", "==", projectId),
        where("status", "==", status),
        orderBy("appliedAt", "desc")
      );
    } else {
      applicationsQuery = query(
        applicationsRef,
        where("projectId", "==", projectId),
        orderBy("appliedAt", "desc")
      );
    }
    
    const snapshot = await getDocs(applicationsQuery);
    const applications = [];
    
    snapshot.forEach(doc => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({ success: true, data: applications });
  } catch (error) {
    console.error("Get applications error:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Get single application
router.get("/applications/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const applicationRef = doc(db, "applications", id);
    const applicationDoc = await getDoc(applicationRef);
    
    if (!applicationDoc.exists()) {
      return res.status(404).json({ error: "Application not found" });
    }
    
    res.json({ success: true, data: { id: applicationDoc.id, ...applicationDoc.data() } });
  } catch (error) {
    console.error("Get application error:", error);
    res.status(500).json({ error: "Failed to fetch application" });
  }
});

// Update application status
router.patch("/applications/:id/status", verifyToken, requireCompany, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!["applied", "shortlisted", "selected", "rejected", "not_selected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    
    const applicationRef = doc(db, "applications", id);
    const applicationDoc = await getDoc(applicationRef);
    
    if (!applicationDoc.exists()) {
      return res.status(404).json({ error: "Application not found" });
    }
    
    const application = applicationDoc.data();
    
    // Verify project belongs to company
    const projectRef = doc(db, "projects", application.projectId);
    const projectDoc = await getDoc(projectRef);
    
    if (!projectDoc.exists() || projectDoc.data().companyId !== req.user.uid) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    await updateDoc(applicationRef, {
      status,
      statusUpdatedAt: serverTimestamp(),
      statusUpdatedBy: req.user.uid
    });
    
    res.json({ success: true, message: "Application status updated successfully" });
  } catch (error) {
    console.error("Update application status error:", error);
    res.status(500).json({ error: "Failed to update application status" });
  }
});

// Shortlist an application
router.post("/applications/:id/shortlist", verifyToken, requireCompany, async (req, res) => {
  try {
    const { id } = req.params;
    
    const applicationRef = doc(db, "applications", id);
    const applicationDoc = await getDoc(applicationRef);
    
    if (!applicationDoc.exists()) {
      return res.status(404).json({ error: "Application not found" });
    }
    
    const application = applicationDoc.data();
    
    // Verify project belongs to company
    const projectRef = doc(db, "projects", application.projectId);
    const projectDoc = await getDoc(projectRef);
    
    if (!projectDoc.exists() || projectDoc.data().companyId !== req.user.uid) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    await updateDoc(applicationRef, {
      status: "shortlisted",
      statusUpdatedAt: serverTimestamp(),
      statusUpdatedBy: req.user.uid
    });
    
    // Update project shortlisted count
    await updateDoc(projectRef, {
      shortlistedCount: increment(1)
    });
    
    res.json({ success: true, message: "Application shortlisted successfully" });
  } catch (error) {
    console.error("Shortlist error:", error);
    res.status(500).json({ error: "Failed to shortlist application" });
  }
});

// Select an application (Fair Selection Workflow)
router.post("/applications/:id/select", verifyToken, requireCompany, async (req, res) => {
  try {
    const { id } = req.params;
    
    const applicationRef = doc(db, "applications", id);
    const applicationDoc = await getDoc(applicationRef);
    
    if (!applicationDoc.exists()) {
      return res.status(404).json({ error: "Application not found" });
    }
    
    const application = applicationDoc.data();
    
    // Verify project belongs to company
    const projectRef = doc(db, "projects", application.projectId);
    const projectDoc = await getDoc(projectRef);
    
    if (!projectDoc.exists() || projectDoc.data().companyId !== req.user.uid) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    // Use batch to update multiple documents atomically
    const batch = writeBatch(db);
    
    // Update selected application
    batch.update(applicationRef, {
      status: "selected",
      statusUpdatedAt: serverTimestamp(),
      statusUpdatedBy: req.user.uid
    });
    
    // Update project with selected freelancer
    batch.update(projectRef, {
      selectedFreelancer: application.freelancerId,
      status: "closed",
      updatedAt: serverTimestamp()
    });
    
    // Get all other applications for this project
    const applicationsRef = collection(db, "applications");
    const otherApplicationsQuery = query(
      applicationsRef,
      where("projectId", "==", application.projectId)
    );
    const otherApplicationsSnapshot = await getDocs(otherApplicationsQuery);
    
    // Update all other applications to "not_selected"
    otherApplicationsSnapshot.forEach(doc => {
      if (doc.id !== id && doc.data().status !== "selected") {
        batch.update(doc.ref, {
          status: "not_selected",
          statusUpdatedAt: serverTimestamp(),
          statusUpdatedBy: req.user.uid
        });
      }
    });
    
    await batch.commit();
    
    res.json({
      success: true,
      message: "Application selected successfully. All other applications marked as not selected."
    });
  } catch (error) {
    console.error("Select application error:", error);
    res.status(500).json({ error: "Failed to select application" });
  }
});

// Reject an application
router.post("/applications/:id/reject", verifyToken, requireCompany, async (req, res) => {
  try {
    const { id } = req.params;
    
    const applicationRef = doc(db, "applications", id);
    const applicationDoc = await getDoc(applicationRef);
    
    if (!applicationDoc.exists()) {
      return res.status(404).json({ error: "Application not found" });
    }
    
    const application = applicationDoc.data();
    
    // Verify project belongs to company
    const projectRef = doc(db, "projects", application.projectId);
    const projectDoc = await getDoc(projectRef);
    
    if (!projectDoc.exists() || projectDoc.data().companyId !== req.user.uid) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    await updateDoc(applicationRef, {
      status: "rejected",
      statusUpdatedAt: serverTimestamp(),
      statusUpdatedBy: req.user.uid
    });
    
    res.json({ success: true, message: "Application rejected successfully" });
  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({ error: "Failed to reject application" });
  }
});

module.exports = router;
