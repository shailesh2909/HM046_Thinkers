# Backend Quick Reference - Frontend API Requirements

## 🎯 Summary for Backend Team

The frontend has been updated to align with your PostgreSQL schema. All API calls now use **snake_case** field names matching your database exactly.

## 📋 Critical Information

### Authentication
- JWT token sent in `Authorization: Bearer {token}` header
- Extract `auth_user_id` from token for all authenticated requests
- User type: `freelancer` or `company` stored in token claims

### Response Format Expected
```json
{
  "success": true,
  "data": { /* your data */ },
  "message": "Optional success message"
}
```

### Error Format Expected
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

## 🚀 Quick Start Endpoints (Priority Order)

### Phase 1: Core Functionality
1. `POST /projects` - Create project
2. `POST /projects/milestones` - Create milestone
3. `GET /projects/:projectId` - Get project details
4. `GET /projects/:projectId/milestones` - Get project milestones

### Phase 2: Work Submission
5. `POST /projects/milestones/submissions` - Submit work
6. `PUT /projects/milestones/submissions/:id/review` - Review submission
7. `PATCH /projects/milestones/:id/status` - Update milestone status

### Phase 3: Payments
8. `POST /payments/milestones` - Create payment
9. `PUT /payments/:id/release` - Release payment
10. `GET /payments/freelancer/:id` - Get freelancer payments

### Phase 4: Companies & Profiles
11. `GET /companies/profile` - Get company profile
12. `PUT /companies/profile` - Update company profile
13. `POST /companies/websites` - Add website

## 📊 Database Tables → API Endpoints

| Table | Endpoint Base | Key Fields |
|-------|--------------|------------|
| `companies` | `/companies` | company_name, industry, company_size |
| `company_websites` | `/companies/websites` | website_url, website_type |
| `projects` | `/projects` | project_name, total_budget, project_status |
| `project_milestones` | `/projects/milestones` | milestone_title, amount, milestone_status |
| `milestone_submissions` | `/projects/milestones/submissions` | submission_url, submitted_at |
| `milestone_payments` | `/payments/milestones` | amount, payment_status, paid_at |
| `project_assignments` | `/projects/assignments` | assignment_status, assigned_at |

## 🔑 Field Conversions (Frontend → Backend)

Frontend sends **camelCase**, backend expects **snake_case**:

```javascript
// Frontend sends:
{
  "projectName": "My Project",
  "totalBudget": 100000,
  "startDate": "2026-02-01"
}

// Backend expects:
{
  "project_name": "My Project",
  "total_budget": 100000,
  "start_date": "2026-02-01"
}
```

**All field mappings are documented in `API_DOCUMENTATION.md`**

## 📝 Status Enums (EXACT VALUES REQUIRED)

### project_status
```
'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled'
```

### milestone_status
```
'pending' | 'in_progress' | 'submitted' | 'approved' | 'paid' | 'rejected'
```

### payment_status
```
'pending' | 'released' | 'failed'
```

### assignment_status
```
'active' | 'completed' | 'terminated'
```

### phone_type
```
'work' | 'support' | 'other'
```

### website_type
```
'official' | 'blog' | 'portfolio' | 'product'
```

## 🔄 Typical Workflow Example

### Creating a Project with Milestones

1. **Company creates project**
```http
POST /projects
Content-Type: application/json
Authorization: Bearer {token}

{
  "project_name": "E-commerce Platform",
  "description": "Build full-stack e-commerce",
  "total_budget": 100000,
  "currency": "INR",
  "start_date": "2026-02-01",
  "end_date": "2026-06-01",
  "project_status": "open"
}
```

2. **Add milestones to project**
```http
POST /projects/milestones

{
  "project_id": "{project_uuid}",
  "milestone_title": "Frontend Development",
  "description": "Build React frontend",
  "amount": 30000,
  "order_no": 1,
  "start_date": "2026-02-01",
  "end_date": "2026-03-01",
  "milestone_status": "pending"
}
```

3. **Assign freelancer**
```http
POST /projects/assignments

{
  "project_id": "{project_uuid}",
  "freelancer_auth_id": "{freelancer_uuid}",
  "assignment_status": "active"
}
```

4. **Freelancer submits work**
```http
POST /projects/milestones/submissions

{
  "milestone_id": "{milestone_uuid}",
  "submission_url": "https://github.com/user/repo",
  "message": "Completed Phase 1"
}
```
*Note: Backend auto-sets `freelancer_auth_id` from JWT, `submitted_at` to current time*

5. **Company reviews submission**
```http
PUT /projects/milestones/submissions/{submission_id}/review

{
  "reviewed_at": "2026-03-01T10:00:00Z",
  "status": "approved",
  "feedback": "Great work!"
}
```

6. **Update milestone status**
```http
PATCH /projects/milestones/{milestone_id}/status

{
  "milestone_status": "approved"
}
```

7. **Create payment record**
```http
POST /payments/milestones

{
  "milestone_id": "{milestone_uuid}",
  "freelancer_auth_id": "{freelancer_uuid}",
  "amount": 30000,
  "currency": "INR",
  "payment_status": "pending"
}
```

8. **Release payment**
```http
PUT /payments/{payment_id}/release

{
  "payment_status": "released",
  "transaction_reference": "TXN123456",
  "paid_at": "2026-03-01T15:00:00Z"
}
```

9. **Update milestone to paid**
```http
PATCH /projects/milestones/{milestone_id}/status

{
  "milestone_status": "paid"
}
```

## 🔐 Authentication & Authorization

### Token Claims Required
```json
{
  "user_id": "uuid",  // auth_user_id
  "user_type": "company|freelancer",
  "email": "user@example.com"
}
```

### Permission Checks
- **Company endpoints**: Verify `user_type === 'company'`
- **Freelancer endpoints**: Verify `user_type === 'freelancer'`
- **Project access**: Check if user owns/is assigned to project
- **Milestone actions**: Check project ownership/assignment

## 📦 Pagination Support

Frontend expects:
```json
{
  "data": [],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

Query params: `?page=1&limit=10`

## 🗄️ Auto-Generated Fields

Backend should auto-set:
- `id` - UUID primary key
- `created_at` - Current timestamp on INSERT
- `updated_at` - Current timestamp on UPDATE
- `submitted_at` - When freelancer submits work
- `assigned_at` - When freelancer is assigned
- `reviewed_at` - When company reviews submission
- `paid_at` - When payment is released
- `auth_user_id` - From JWT token
- `freelancer_auth_id` - From JWT token (on submissions)
- `company_id` - From auth_user_id → companies.auth_user_id

## ⚠️ Important Notes

1. **Currency**: Default to `"INR"` if not provided
2. **UUIDs**: All IDs should be UUIDs, not integers
3. **Foreign Keys**: Validate existence before INSERT
4. **Cascade**: Handle deletes (soft delete recommended)
5. **Validation**: Check enum values match exactly
6. **Transactions**: Use for multi-step operations (especially payments)

## 🐛 Common Issues to Avoid

❌ **Wrong**: Using integers for IDs
✅ **Right**: Using UUIDs

❌ **Wrong**: `project_status: "OPEN"`
✅ **Right**: `project_status: "open"` (lowercase)

❌ **Wrong**: Returning `null` for empty lists
✅ **Right**: Returning `[]` for empty lists

❌ **Wrong**: Different error formats per endpoint
✅ **Right**: Consistent error format across all endpoints

## 📞 Integration Checklist

- [ ] JWT authentication working
- [ ] All enum values match exactly (lowercase)
- [ ] Field names are snake_case in database
- [ ] UUIDs used for all IDs
- [ ] Timestamps are ISO 8601
- [ ] Pagination implemented
- [ ] Error format consistent
- [ ] CORS configured for frontend origin
- [ ] File upload endpoints working (if applicable)
- [ ] Cascade deletes configured

## 📚 Full Documentation

See `API_DOCUMENTATION.md` for:
- Complete endpoint list
- All request/response formats
- Detailed field descriptions
- Additional examples

## 🤝 Communication

If you need:
- Field name clarifications → Check `MIGRATION_GUIDE.md`
- Type definitions → Check `src/api/types.js`
- Endpoint details → Check `API_DOCUMENTATION.md`
- Schema questions → Refer to your database schema doc

## 🎯 Testing Endpoints

Sample CURL commands:

```bash
# Create project
curl -X POST https://api.example.com/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "project_name": "Test Project",
    "description": "Testing",
    "total_budget": 50000,
    "currency": "INR",
    "start_date": "2026-02-01",
    "end_date": "2026-03-01",
    "project_status": "draft"
  }'

# Get projects
curl https://api.example.com/projects?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

**Ready to integrate!** 🚀

Frontend is configured and waiting for your endpoints. All field names, status values, and data structures match your PostgreSQL schema exactly.
