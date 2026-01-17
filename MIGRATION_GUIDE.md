# Frontend Migration Guide - Database Schema Alignment

## Overview
The frontend has been updated to align with the new PostgreSQL database schema featuring milestone-based payment tracking and company profiles.

## What Changed

### 1. API Files Updated

#### `src/api/userAPI.js`
- ✅ Added `updateCompanyProfile()` method
- ✅ Added `getCompanyProfile()` method
- ✅ Exported `companyWebsitesAPI` for managing company websites

#### `src/api/projectAPI.js`
- ✅ Updated field names to match schema:
  - `title` → `project_name`
  - `budget` → `total_budget`
  - Added `project_status` (draft/open/in_progress/completed/cancelled)
- ✅ Added **`projectMilestonesAPI`** for milestone management
- ✅ Added **`milestoneSubmissionsAPI`** for freelancer work submissions
- ✅ Added **`projectAssignmentsAPI`** for tracking freelancer assignments

#### `src/api/contractPaymentAPI.js`
- ✅ Added **`milestonePaymentAPI`** for milestone-based payments
- ✅ Includes methods for:
  - Creating payment records
  - Releasing payments after approval
  - Tracking payment status
  - Getting freelancer/company payment history

### 2. New API File Created

#### `src/api/companyAPI.js` (NEW)
Centralized company profile management:
- Company profile CRUD operations
- Logo and banner upload
- Multiple website links management
- Field mapping (camelCase → snake_case)

### 3. Documentation Files Created

#### `API_DOCUMENTATION.md` (NEW)
Complete API endpoint documentation including:
- All endpoint paths and methods
- Request/response formats
- Field name mappings (Frontend ↔ Backend)
- Status enum values
- Pagination support
- Error handling guidelines

#### `src/api/types.js` (NEW)
TypeScript-style interface definitions:
- Data structures for all entities
- Request/response type definitions
- Enum types for status values
- Field mapping reference in comments

## Database Schema Entities

### 1. Companies (`companies` table)
```javascript
{
  id: "uuid",
  auth_user_id: "uuid",
  company_name: "string",
  headline: "string",
  about: "string",
  profile_photo: "url",
  banner_photo: "url",
  industry: "string",
  company_size: "11-50",
  contact_email: "string",
  phone_number: "string",
  phone_type: "work|support|other",
  address: "string",
  location: "string",
  created_at: "timestamp",
  updated_at: "timestamp"
}
```

### 2. Company Websites (`company_websites` table)
```javascript
{
  id: "uuid",
  company_id: "uuid",
  website_url: "string",
  website_type: "official|blog|portfolio|product"
}
```

### 3. Projects (`projects` table)
```javascript
{
  id: "uuid",
  company_id: "uuid",
  project_name: "string",
  description: "string",
  total_budget: "number",
  currency: "INR",
  start_date: "date",
  end_date: "date",
  project_status: "draft|open|in_progress|completed|cancelled",
  created_at: "timestamp",
  updated_at: "timestamp"
}
```

### 4. Project Milestones (`project_milestones` table)
```javascript
{
  id: "uuid",
  project_id: "uuid",
  milestone_title: "string",
  description: "string",
  amount: "number",
  order_no: "number",
  start_date: "date",
  end_date: "date",
  milestone_status: "pending|in_progress|submitted|approved|paid|rejected",
  created_at: "timestamp",
  updated_at: "timestamp"
}
```

### 5. Milestone Submissions (`milestone_submissions` table)
```javascript
{
  id: "uuid",
  milestone_id: "uuid",
  freelancer_auth_id: "uuid",
  submission_url: "string",
  message: "string",
  submitted_at: "timestamp",
  reviewed_at: "timestamp"
}
```

### 6. Milestone Payments (`milestone_payments` table)
```javascript
{
  id: "uuid",
  milestone_id: "uuid",
  freelancer_auth_id: "uuid",
  amount: "number",
  currency: "string",
  payment_status: "pending|released|failed",
  transaction_reference: "string",
  paid_at: "timestamp"
}
```

### 7. Project Assignments (`project_assignments` table)
```javascript
{
  id: "uuid",
  project_id: "uuid",
  freelancer_auth_id: "uuid",
  assignment_status: "active|completed|terminated",
  assigned_at: "timestamp"
}
```

## Key API Endpoint Examples

### Create Project with Milestones
```javascript
import { projectAPI, projectMilestonesAPI } from './api/projectAPI';

// 1. Create project
const project = await projectAPI.createProject({
  projectName: "E-commerce Platform",
  description: "Build a full-stack e-commerce platform",
  totalBudget: 100000,
  currency: "INR",
  startDate: "2026-02-01",
  endDate: "2026-06-01",
  projectStatus: "open"
});

// 2. Add milestones
await projectMilestonesAPI.createMilestone({
  projectId: project.id,
  milestoneTitle: "Phase 1: Frontend Development",
  description: "Build React frontend",
  amount: 30000,
  orderNo: 1,
  startDate: "2026-02-01",
  endDate: "2026-03-01",
  milestoneStatus: "pending"
});
```

### Freelancer Submits Work
```javascript
import { milestoneSubmissionsAPI } from './api/projectAPI';

await milestoneSubmissionsAPI.submitWork({
  milestoneId: "milestone-uuid",
  submissionUrl: "https://github.com/freelancer/project",
  message: "Phase 1 completed. Please review."
});
```

### Company Releases Payment
```javascript
import { milestonePaymentAPI } from './api/contractPaymentAPI';

// 1. Create payment record
const payment = await milestonePaymentAPI.createPayment({
  milestoneId: "milestone-uuid",
  freelancerAuthId: "freelancer-auth-uuid",
  amount: 30000,
  currency: "INR",
  paymentStatus: "pending"
});

// 2. Release payment after approval
await milestonePaymentAPI.releasePayment(
  payment.id,
  "TXN123456789"
);
```

### Assign Freelancer to Project
```javascript
import { projectAssignmentsAPI } from './api/projectAPI';

await projectAssignmentsAPI.assignFreelancer({
  projectId: "project-uuid",
  freelancerAuthId: "freelancer-auth-uuid",
  assignmentStatus: "active"
});
```

## Field Name Mapping Reference

| Frontend (camelCase) | Backend (snake_case) |
|---------------------|----------------------|
| `companyName` | `company_name` |
| `profilePhoto` | `profile_photo` |
| `bannerPhoto` | `banner_photo` |
| `companySize` | `company_size` |
| `contactEmail` | `contact_email` |
| `phoneNumber` | `phone_number` |
| `phoneType` | `phone_type` |
| `websiteUrl` | `website_url` |
| `websiteType` | `website_type` |
| `projectName` | `project_name` |
| `totalBudget` | `total_budget` |
| `startDate` | `start_date` |
| `endDate` | `end_date` |
| `projectStatus` | `project_status` |
| `milestoneTitle` | `milestone_title` |
| `orderNo` | `order_no` |
| `milestoneStatus` | `milestone_status` |
| `freelancerAuthId` | `freelancer_auth_id` |
| `submissionUrl` | `submission_url` |
| `submittedAt` | `submitted_at` |
| `reviewedAt` | `reviewed_at` |
| `paymentStatus` | `payment_status` |
| `transactionReference` | `transaction_reference` |
| `paidAt` | `paid_at` |
| `assignmentStatus` | `assignment_status` |
| `assignedAt` | `assigned_at` |

## Status Values Reference

### Project Status
- `draft` - Not published yet
- `open` - Accepting applications
- `in_progress` - Work started
- `completed` - Finished
- `cancelled` - Cancelled

### Milestone Status
- `pending` - Not started
- `in_progress` - Work ongoing
- `submitted` - Work submitted by freelancer
- `approved` - Approved by company
- `paid` - Payment released
- `rejected` - Work rejected

### Payment Status
- `pending` - Not released
- `released` - Paid to freelancer
- `failed` - Payment failed

### Assignment Status
- `active` - Currently working
- `completed` - Work done
- `terminated` - Assignment ended

## Components That Need Updates

The following components should be updated to use the new API structure:

### High Priority
1. ✅ **Dashboard.jsx** - Already fixed navigation issue
2. ⚠️ **CreateProject.jsx** - Update to use new project fields and milestone API
3. ⚠️ **MyProjects.jsx** - Update to show project_status and milestones
4. ⚠️ **ProjectDetails.jsx** - Show milestones, submissions, payments
5. ⚠️ **Profile.jsx** - Update company profile fields

### Medium Priority
6. **Applications.jsx** - Use project assignments API
7. **Candidates.jsx** - Show freelancer assignments
8. **FindProjects.jsx** - Filter by project_status

## Testing Checklist

Before backend integration:
- [ ] All API calls use correct field names (snake_case)
- [ ] Status values match enum definitions
- [ ] UUIDs are used for all IDs
- [ ] Timestamps are ISO 8601 format
- [ ] Currency defaults to "INR"
- [ ] Error handling is consistent

## Next Steps for Development

1. **Backend Team**: Implement endpoints as documented in `API_DOCUMENTATION.md`
2. **Frontend Team**: Update components to use new API structure
3. **Both Teams**: Agree on error response format
4. **Testing**: Create integration tests for milestone workflow
5. **Deployment**: Set up proper environment variables for API URLs

## Important Notes

- All API methods convert camelCase to snake_case automatically
- Timestamps should be handled by backend (auto-set)
- File uploads return URLs (store in cloud storage)
- Consider implementing optimistic UI updates
- Add proper loading states for async operations
- Implement proper error boundaries

## Questions for Backend Team

1. Will you implement soft deletes or hard deletes?
2. What's the pagination format? (page/limit or cursor-based?)
3. How will you handle file uploads? (Direct upload or signed URLs?)
4. Will auth_user_id be extracted from JWT token automatically?
5. Do you need any additional validation rules?
6. Should we implement WebSocket for real-time notifications?

## Support

For questions or clarifications, refer to:
- `API_DOCUMENTATION.md` - Complete endpoint documentation
- `src/api/types.js` - Type definitions and interfaces
- Database schema document provided by backend team
