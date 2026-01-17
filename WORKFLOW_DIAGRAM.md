# Milestone-Based Payment Workflow

## 🔄 Complete Project Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                     1. PROJECT CREATION                         │
│                                                                 │
│  Company → POST /projects                                       │
│  {                                                              │
│    project_name: "E-commerce Platform",                        │
│    total_budget: 100000,                                        │
│    project_status: "open"                                       │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                     2. ADD MILESTONES                           │
│                                                                 │
│  Company → POST /projects/milestones (3 times)                  │
│                                                                 │
│  Milestone 1: Frontend ($30k)  - order_no: 1                   │
│  Milestone 2: Backend ($40k)   - order_no: 2                   │
│  Milestone 3: Testing ($30k)   - order_no: 3                   │
│                                                                 │
│  Each milestone_status: "pending"                               │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                  3. ASSIGN FREELANCER                           │
│                                                                 │
│  Company → POST /projects/assignments                           │
│  {                                                              │
│    project_id: "uuid",                                          │
│    freelancer_auth_id: "uuid",                                  │
│    assignment_status: "active"                                  │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│               4. FREELANCER WORKS ON MILESTONE 1                │
│                                                                 │
│  Company → PATCH /milestones/{id}/status                        │
│  { milestone_status: "in_progress" }                            │
│                                                                 │
│  Freelancer builds frontend...                                 │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│              5. FREELANCER SUBMITS WORK                         │
│                                                                 │
│  Freelancer → POST /projects/milestones/submissions             │
│  {                                                              │
│    milestone_id: "uuid",                                        │
│    submission_url: "https://github.com/user/repo",             │
│    message: "Frontend completed. Ready for review."            │
│  }                                                              │
│                                                                 │
│  Auto-updates: milestone_status → "submitted"                   │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                 6. COMPANY REVIEWS WORK                         │
│                                                                 │
│  Company → PUT /submissions/{id}/review                         │
│  {                                                              │
│    status: "approved",                                          │
│    feedback: "Great work!"                                      │
│  }                                                              │
│                                                                 │
│  Then → PATCH /milestones/{id}/status                           │
│  { milestone_status: "approved" }                               │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│              7. COMPANY CREATES PAYMENT                         │
│                                                                 │
│  Company → POST /payments/milestones                            │
│  {                                                              │
│    milestone_id: "uuid",                                        │
│    freelancer_auth_id: "uuid",                                  │
│    amount: 30000,                                               │
│    currency: "INR",                                             │
│    payment_status: "pending"                                    │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│              8. COMPANY RELEASES PAYMENT                        │
│                                                                 │
│  Company → PUT /payments/{id}/release                           │
│  {                                                              │
│    payment_status: "released",                                  │
│    transaction_reference: "TXN123456",                          │
│    paid_at: "2026-03-01T15:00:00Z"                              │
│  }                                                              │
│                                                                 │
│  Money transferred to freelancer's account                      │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│            9. UPDATE MILESTONE TO PAID                          │
│                                                                 │
│  Company → PATCH /milestones/{id}/status                        │
│  { milestone_status: "paid" }                                   │
│                                                                 │
│  ✅ Milestone 1 Complete!                                       │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│           10. REPEAT FOR MILESTONES 2 & 3                       │
│                                                                 │
│  Same flow for Backend milestone ($40k)                         │
│  Same flow for Testing milestone ($30k)                         │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│         11. ALL MILESTONES COMPLETE                             │
│                                                                 │
│  Company → PUT /projects/{id}                                   │
│  { project_status: "completed" }                                │
│                                                                 │
│  Company → PATCH /assignments/{id}/status                       │
│  { assignment_status: "completed" }                             │
│                                                                 │
│  🎉 Project Complete! Total paid: ₹100,000                      │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Milestone Status Flow

```
pending → in_progress → submitted → approved → paid
                            ↓
                        rejected
                            ↓
                    back to in_progress
```

## 💰 Payment Status Flow

```
pending → released
    ↓
  failed
    ↓
 (retry) → released
```

## 👥 Assignment Status Flow

```
active → completed
   ↓
terminated (if needed)
```

## 🎯 Project Status Flow

```
draft → open → in_progress → completed
                   ↓
              cancelled (optional)
```

## 🔐 Role-Based Actions

### Company Can:
- ✅ Create projects
- ✅ Add milestones
- ✅ Assign freelancers
- ✅ Review submissions
- ✅ Approve/reject work
- ✅ Release payments
- ✅ Update project status

### Freelancer Can:
- ✅ View assigned projects
- ✅ Update milestone status (in_progress)
- ✅ Submit work
- ✅ View payment history
- ✅ Track milestone progress

## 📋 Database Relationships

```
auth_users (1)
    ↓
    ├── companies (1:1)
    │       ↓
    │       ├── company_websites (1:N)
    │       └── projects (1:N)
    │               ↓
    │               ├── project_milestones (1:N)
    │               │       ↓
    │               │       ├── milestone_submissions (1:N)
    │               │       └── milestone_payments (1:N)
    │               │
    │               └── project_assignments (1:N)
    │
    └── freelancers (1:1)
            ↓
            ├── project_assignments (1:N)
            ├── milestone_submissions (1:N)
            └── milestone_payments (1:N)
```

## 🚦 Validation Rules

### Project Creation
- ✅ `total_budget` > 0
- ✅ `end_date` > `start_date`
- ✅ `project_status` in allowed enum
- ✅ User is company type

### Milestone Creation
- ✅ Project exists
- ✅ Sum of milestone amounts ≤ total_budget
- ✅ `order_no` unique within project
- ✅ Dates within project date range

### Work Submission
- ✅ Freelancer assigned to project
- ✅ Milestone status is "in_progress"
- ✅ Valid submission URL

### Payment Release
- ✅ Milestone approved
- ✅ Payment exists and is pending
- ✅ Valid transaction reference
- ✅ Sufficient company balance (if applicable)

## 🔔 Notification Triggers

- Freelancer assigned → Notify freelancer
- Work submitted → Notify company
- Work approved → Notify freelancer
- Payment released → Notify freelancer
- Work rejected → Notify freelancer
- Milestone deadline approaching → Notify both

## 📈 Analytics Opportunities

### For Companies:
- Total projects created
- Active projects
- Completed projects
- Total amount paid
- Average project duration
- Freelancer ratings

### For Freelancers:
- Total assignments
- Completed milestones
- Total earnings
- Average milestone completion time
- Client ratings
- Success rate

## 🛡️ Security Considerations

1. **Authorization**: Verify user owns/is assigned to project
2. **Payment Security**: Use transactions for payment operations
3. **Data Validation**: Sanitize all inputs
4. **Rate Limiting**: Prevent API abuse
5. **Audit Trail**: Log all payment operations
6. **File Upload**: Validate file types and sizes

## 🔄 Transaction Example

```sql
BEGIN;

-- 1. Create payment record
INSERT INTO milestone_payments (...) VALUES (...);

-- 2. Update milestone status
UPDATE project_milestones SET milestone_status = 'paid' WHERE id = ?;

-- 3. Update freelancer balance (if using wallet)
UPDATE freelancer_wallets SET balance = balance + ? WHERE freelancer_id = ?;

-- 4. Create transaction log
INSERT INTO payment_logs (...) VALUES (...);

COMMIT;
```

## 📱 Frontend Components to Update

1. **CreateProject.jsx**
   - Use `projectAPI.createProject()`
   - Use `projectMilestonesAPI.createMilestone()`
   - Update field names

2. **MyProjects.jsx**
   - Display milestones
   - Show payment status
   - Track progress

3. **ProjectDetails.jsx**
   - Show all milestones
   - Display submissions
   - Show payment history
   - Action buttons based on role

4. **Dashboard.jsx**
   - Show recent milestones
   - Payment summary
   - Pending actions

5. **Profile.jsx (Company)**
   - Use `companyAPI.updateProfile()`
   - Manage websites
   - Upload logo/banner

## 🎨 UI Elements Needed

- Milestone progress bar
- Payment status badges
- Submission review modal
- Payment confirmation dialog
- File upload component
- Date range picker
- Budget calculator

---

## Quick Integration Steps

1. ✅ Backend implements endpoints (see `BACKEND_QUICK_REF.md`)
2. ✅ Frontend connects API methods (already done)
3. ✅ Update components to use new APIs
4. ✅ Test end-to-end workflow
5. ✅ Add loading states and error handling
6. ✅ Deploy and monitor

**Everything is documented and ready for integration!** 🚀
