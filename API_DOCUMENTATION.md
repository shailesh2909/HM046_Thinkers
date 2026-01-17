# API Documentation - Frontend to Backend Integration

This document outlines all API endpoints used by the frontend application, aligned with the database schema.

## Base URL
All endpoints are relative to the configured API base URL in `axiosConfig.js`

## Authentication
- All authenticated requests include `Authorization: Bearer {token}` header
- Token is stored in localStorage as 'token'
- User type stored as 'userType' (freelancer/company)

---

## 1. Companies API (`/companies`)

### Company Profile

#### GET `/companies/profile`
Get current authenticated company's profile
**Response:**
```json
{
  "id": "uuid",
  "auth_user_id": "uuid",
  "company_name": "string",
  "headline": "string",
  "about": "string",
  "profile_photo": "string (URL)",
  "banner_photo": "string (URL)",
  "industry": "string",
  "company_size": "string (e.g., 11-50)",
  "contact_email": "string",
  "phone_number": "string",
  "phone_type": "work|support|other",
  "address": "string",
  "location": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

#### GET `/companies/:companyId`
Get company profile by ID
**Response:** Same as above

#### PUT `/companies/profile`
Update company profile
**Request Body:**
```json
{
  "company_name": "string",
  "headline": "string",
  "about": "string",
  "profile_photo": "string",
  "banner_photo": "string",
  "industry": "string",
  "company_size": "string",
  "contact_email": "string",
  "phone_number": "string",
  "phone_type": "string",
  "address": "string",
  "location": "string"
}
```

#### POST `/companies/upload-logo`
Upload company logo (multipart/form-data)
**Response:** `{ "profile_photo": "URL" }`

#### POST `/companies/upload-banner`
Upload company banner (multipart/form-data)
**Response:** `{ "banner_photo": "URL" }`

---

## 2. Company Websites API (`/companies/websites`)

#### POST `/companies/websites`
Add website to company profile
**Request Body:**
```json
{
  "website_url": "string",
  "website_type": "official|blog|portfolio|product"
}
```

#### GET `/companies/:companyId/websites`
Get all websites for a company

#### GET `/companies/websites`
Get current company's websites

#### PUT `/companies/websites/:websiteId`
Update website
**Request Body:**
```json
{
  "website_url": "string",
  "website_type": "string"
}
```

#### DELETE `/companies/websites/:websiteId`
Delete website

---

## 3. Projects API (`/projects`)

#### POST `/projects`
Create new project (companies only)
**Request Body:**
```json
{
  "project_name": "string",
  "description": "string",
  "total_budget": "number",
  "currency": "string (default: INR)",
  "start_date": "date",
  "end_date": "date",
  "project_status": "draft|open|in_progress|completed|cancelled"
}
```

#### GET `/projects`
Get all projects (with filters)
**Query Params:** `?page=1&limit=10&status=open&budget_min=10000`

#### GET `/projects/:projectId`
Get project by ID

#### PUT `/projects/:projectId`
Update project
**Request Body:** Same as POST

#### DELETE `/projects/:projectId`
Delete project

#### GET `/projects/company/:companyId`
Get all projects for a company

#### GET `/projects/freelancer/:freelancerId`
Get projects assigned to freelancer

#### GET `/projects/search`
Search projects
**Query Params:** `?q=searchTerm`

---

## 4. Project Milestones API (`/projects/milestones`)

#### POST `/projects/milestones`
Create milestone for project
**Request Body:**
```json
{
  "project_id": "uuid",
  "milestone_title": "string",
  "description": "string",
  "amount": "number",
  "order_no": "number",
  "start_date": "date",
  "end_date": "date",
  "milestone_status": "pending|in_progress|submitted|approved|paid|rejected"
}
```

#### GET `/projects/:projectId/milestones`
Get all milestones for a project

#### GET `/projects/milestones/:milestoneId`
Get milestone by ID

#### PUT `/projects/milestones/:milestoneId`
Update milestone
**Request Body:** Same as POST

#### PATCH `/projects/milestones/:milestoneId/status`
Update milestone status
**Request Body:**
```json
{
  "milestone_status": "pending|in_progress|submitted|approved|paid|rejected"
}
```

#### DELETE `/projects/milestones/:milestoneId`
Delete milestone

---

## 5. Milestone Submissions API (`/projects/milestones/submissions`)

#### POST `/projects/milestones/submissions`
Submit work for milestone (freelancer)
**Request Body:**
```json
{
  "milestone_id": "uuid",
  "submission_url": "string (work link)",
  "message": "string (notes)"
}
```
**Note:** `freelancer_auth_id` and `submitted_at` are set automatically by backend

#### GET `/projects/milestones/:milestoneId/submissions`
Get all submissions for a milestone

#### GET `/projects/milestones/submissions/:submissionId`
Get submission by ID

#### PUT `/projects/milestones/submissions/:submissionId/review`
Review submission (company)
**Request Body:**
```json
{
  "reviewed_at": "timestamp",
  "status": "approved|rejected",
  "feedback": "string"
}
```

---

## 6. Milestone Payments API (`/payments/milestones`)

#### POST `/payments/milestones`
Create milestone payment record
**Request Body:**
```json
{
  "milestone_id": "uuid",
  "freelancer_auth_id": "uuid",
  "amount": "number",
  "currency": "string (default: INR)",
  "payment_status": "pending|released|failed",
  "transaction_reference": "string"
}
```

#### GET `/payments/milestones/:milestoneId`
Get all payments for a milestone

#### GET `/payments/:paymentId`
Get payment by ID
**Response:**
```json
{
  "id": "uuid",
  "milestone_id": "uuid",
  "freelancer_auth_id": "uuid",
  "amount": "number",
  "currency": "string",
  "payment_status": "pending|released|failed",
  "transaction_reference": "string",
  "paid_at": "timestamp"
}
```

#### PUT `/payments/:paymentId/release`
Release payment after milestone approval
**Request Body:**
```json
{
  "payment_status": "released",
  "transaction_reference": "string",
  "paid_at": "timestamp (auto-set)"
}
```

#### PATCH `/payments/:paymentId/status`
Update payment status
**Request Body:**
```json
{
  "payment_status": "pending|released|failed"
}
```

#### GET `/payments/freelancer/:freelancerAuthId`
Get all payments for a freelancer

#### GET `/payments/company`
Get all payments made by current company

---

## 7. Project Assignments API (`/projects/assignments`)

#### POST `/projects/assignments`
Assign freelancer to project
**Request Body:**
```json
{
  "project_id": "uuid",
  "freelancer_auth_id": "uuid",
  "assignment_status": "active|completed|terminated"
}
```
**Note:** `assigned_at` is set automatically by backend

#### GET `/projects/:projectId/assignments`
Get all assignments for a project

#### GET `/freelancers/:freelancerAuthId/assignments`
Get all assignments for a freelancer

#### PATCH `/projects/assignments/:assignmentId/status`
Update assignment status
**Request Body:**
```json
{
  "assignment_status": "active|completed|terminated"
}
```

#### PUT `/projects/assignments/:assignmentId/terminate`
Terminate assignment
**Request Body:**
```json
{
  "assignment_status": "terminated",
  "reason": "string"
}
```

---

## 8. Bids/Applications API (`/bids`)

#### POST `/bids`
Submit bid/proposal
**Request Body:**
```json
{
  "projectId": "uuid",
  "freelancerId": "uuid",
  "bidAmount": "number",
  "coverLetter": "string",
  "estimatedDays": "number",
  "attachments": "array"
}
```

#### GET `/bids/project/:projectId`
Get all bids for a project (company only)

#### GET `/bids/freelancer/:freelancerId`
Get freelancer's bids

#### GET `/bids/:bidId`
Get single bid

#### PUT `/bids/:bidId/accept`
Accept bid (company only)

#### PUT `/bids/:bidId/reject`
Reject bid (company only)

#### PUT `/bids/:bidId`
Update bid (freelancer only)

#### DELETE `/bids/:bidId`
Withdraw bid (freelancer only)

---

## 9. User/Freelancer API (`/users`)

#### GET `/users/profile`
Get current user profile

#### PUT `/users/profile`
Update user profile

#### GET `/users/:userId`
Get user by ID

#### GET `/users/freelancer/:freelancerId`
Get freelancer details

#### GET `/users/company/:companyId`
Get company details

#### POST `/users/upload-profile-picture`
Upload profile picture (multipart/form-data)

#### PUT `/users/password`
Update password

#### GET `/users/:userId/ratings`
Get user ratings and reviews

#### DELETE `/users/account`
Delete account

---

## Database Schema Field Mapping

### Companies Table
- Frontend uses camelCase → Backend expects snake_case
- Example: `companyName` → `company_name`

### Projects Table
- `projectName` → `project_name`
- `totalBudget` → `total_budget`
- `projectStatus` → `project_status`

### Milestones Table
- `milestoneTitle` → `milestone_title`
- `orderNo` → `order_no`
- `milestoneStatus` → `milestone_status`

### Payments Table
- `freelancerAuthId` → `freelancer_auth_id`
- `paymentStatus` → `payment_status`
- `transactionReference` → `transaction_reference`
- `paidAt` → `paid_at`

### Assignments Table
- `projectId` → `project_id`
- `freelancerAuthId` → `freelancer_auth_id`
- `assignmentStatus` → `assignment_status`
- `assignedAt` → `assigned_at`

---

## Status Enums

### Project Status
- `draft` - Project created but not published
- `open` - Published and accepting applications
- `in_progress` - Work started
- `completed` - Project finished
- `cancelled` - Project cancelled

### Milestone Status
- `pending` - Not started
- `in_progress` - Work in progress
- `submitted` - Freelancer submitted work
- `approved` - Company approved work
- `paid` - Payment released
- `rejected` - Work rejected

### Payment Status
- `pending` - Payment not yet released
- `released` - Payment sent to freelancer
- `failed` - Payment failed

### Assignment Status
- `active` - Currently working
- `completed` - Work completed
- `terminated` - Assignment ended early

### Phone Type
- `work`
- `support`
- `other`

### Website Type
- `official`
- `blog`
- `portfolio`
- `product`

---

## Notes for Backend Team

1. **Authentication**: All endpoints (except public ones) should verify JWT token from `Authorization` header

2. **Foreign Keys**: 
   - Use `auth_user_id` to link to auth_users table
   - Company endpoints use authenticated user's company
   - Freelancer endpoints use authenticated user's freelancer profile

3. **Timestamps**: 
   - Backend should auto-set `created_at`, `updated_at`, `assigned_at`, `submitted_at`, `paid_at`
   - Frontend sends these only when explicitly updating

4. **File Uploads**: 
   - Logo/banner/profile uploads should return URLs
   - Store files in cloud storage (S3, etc.)

5. **Cascade Deletes**: 
   - Deleting project should handle milestones/assignments
   - Consider soft deletes for important records

6. **Pagination**: 
   - Support `?page=1&limit=10` for list endpoints
   - Return total count in response

7. **Validation**: 
   - Validate enums match exact values
   - Validate UUIDs format
   - Validate required fields

8. **Error Responses**: 
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

9. **Success Responses**: 
```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```
