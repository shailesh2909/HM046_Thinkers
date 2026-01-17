# Company Management API Documentation

## Database Models

### 1. Company
Main company profile
- id (UUID, primary key)
- authUserId (UUID, reference to auth users)
- companyName (String, required)
- headline (String)
- about (Text)
- profilePhoto (Text URL)
- bannerPhoto (Text URL)
- industry (String)
- companySize (String)
- contactEmail (String, email validation)
- phoneNumber (String)
- phoneType (Enum: 'work', 'support', 'other')
- address (Text)
- location (String)

### 2. CompanyWebsite (One-to-Many with Company)
- id (UUID, primary key)
- companyId (UUID, foreign key)
- websiteUrl (Text, required, URL validation)
- websiteType (Enum: 'official', 'blog', 'portfolio', 'product')

### 3. CompanyProject (One-to-Many with Company)
- id (UUID, primary key)
- companyId (UUID, foreign key)
- projectName (String, required)
- description (Text, required)
- totalBudget (Decimal 12,2, required)
- currency (String, default 'INR')
- startDate (Date)
- endDate (Date)
- projectStatus (Enum: 'draft', 'open', 'in_progress', 'completed', 'cancelled')

### 4. ProjectMilestone (One-to-Many with CompanyProject)
- id (UUID, primary key)
- projectId (UUID, foreign key)
- milestoneTitle (String, required)
- description (Text)
- amount (Decimal 12,2, required)
- orderNo (Integer, required)
- startDate (Date)
- endDate (Date)
- milestoneStatus (Enum: 'pending', 'in_progress', 'submitted', 'approved', 'paid', 'rejected')

---

## API Endpoints

### Company Routes

#### Create Company
```
POST /api/company
Body: {
  "authUserId": "uuid-here",
  "companyName": "Tech Solutions Inc",
  "headline": "Leading Software Development Company",
  "about": "We provide innovative software solutions...",
  "profilePhoto": "https://example.com/logo.jpg",
  "bannerPhoto": "https://example.com/banner.jpg",
  "industry": "Information Technology",
  "companySize": "50-200",
  "contactEmail": "info@techsolutions.com",
  "phoneNumber": "+1-555-0100",
  "phoneType": "work",
  "address": "123 Tech Street, Silicon Valley",
  "location": "San Francisco, CA"
}
```

#### Get All Companies
```
GET /api/company
```

#### Get Company by ID
```
GET /api/company/:id
```

#### Update Company
```
PUT /api/company/:id
Body: { /* fields to update */ }
```

#### Delete Company
```
DELETE /api/company/:id
```

#### Get Companies by Auth User
```
GET /api/company/auth-user/:authUserId
```

---

### Company Website Routes

#### Create Company Website
```
POST /api/company-website/:companyId
Body: {
  "websiteUrl": "https://techsolutions.com",
  "websiteType": "official"
}
```

#### Get All Company Websites
```
GET /api/company-website/:companyId
```

#### Get Single Company Website
```
GET /api/company-website/single/:id
```

#### Update Company Website
```
PUT /api/company-website/:id
Body: { /* fields to update */ }
```

#### Delete Company Website
```
DELETE /api/company-website/:id
```

---

### Company Project Routes

#### Create Company Project
```
POST /api/company-project/:companyId
Body: {
  "projectName": "E-Commerce Platform Development",
  "description": "Build a complete e-commerce solution with inventory management",
  "totalBudget": 150000.00,
  "currency": "USD",
  "startDate": "2024-01-01",
  "endDate": "2024-06-30",
  "projectStatus": "open"
}
```

#### Get All Company Projects
```
GET /api/company-project/:companyId
```

#### Get Single Company Project
```
GET /api/company-project/single/:id
```

#### Update Company Project
```
PUT /api/company-project/:id
Body: { /* fields to update */ }
```

#### Delete Company Project
```
DELETE /api/company-project/:id
```

#### Get Projects by Status
```
GET /api/company-project/:companyId/status/:status
Status options: draft, open, in_progress, completed, cancelled
```

---

### Project Milestone Routes

#### Create Project Milestone
```
POST /api/milestone/:projectId
Body: {
  "milestoneTitle": "Phase 1: Database Design",
  "description": "Design and implement database schema",
  "amount": 30000.00,
  "orderNo": 1,
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "milestoneStatus": "pending"
}
```

#### Get All Project Milestones
```
GET /api/milestone/:projectId
Returns milestones ordered by order_no
```

#### Get Single Project Milestone
```
GET /api/milestone/single/:id
```

#### Update Project Milestone
```
PUT /api/milestone/:id
Body: { /* fields to update */ }
```

#### Delete Project Milestone
```
DELETE /api/milestone/:id
```

#### Update Milestone Status
```
PATCH /api/milestone/:id/status
Body: {
  "milestoneStatus": "approved"
}
Status options: pending, in_progress, submitted, approved, paid, rejected
```

#### Get Milestones by Status
```
GET /api/milestone/:projectId/status/:status
```

---

### Complete Company Routes

#### Get Complete Company Profile (with all relationships)
```
GET /api/complete-company/:companyId/complete
Returns: {
  "success": true,
  "data": {
    "id": "uuid",
    "companyName": "Tech Solutions Inc",
    "CompanyWebsites": [ /* array of websites */ ],
    "CompanyProjects": [
      {
        "id": "uuid",
        "projectName": "...",
        "ProjectMilestones": [ /* array of milestones */ ]
      }
    ]
  }
}
```

#### Get Company Statistics
```
GET /api/complete-company/:companyId/stats
Returns: {
  "success": true,
  "data": {
    "websites": 3,
    "totalProjects": 10,
    "activeProjects": 4,
    "completedProjects": 5,
    "totalBudget": "500000.00"
  }
}
```

#### Get Project with Milestones
```
GET /api/complete-company/project/:projectId/milestones
Returns project with all milestones and company details
```

#### Delete Complete Company Profile
```
DELETE /api/complete-company/:companyId/complete
Deletes company and all related data (CASCADE)
```

---

## Response Format

All endpoints return responses in the following format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Database Relationships

- Company → CompanyWebsite (One-to-Many)
- Company → CompanyProject (One-to-Many)
- CompanyProject → ProjectMilestone (One-to-Many)

All relationships use CASCADE delete, so deleting a company will automatically delete all websites, projects, and milestones.

---

## Field Validations

### Company
- contactEmail: Must be valid email format
- phoneType: Must be 'work', 'support', or 'other'

### CompanyWebsite
- websiteUrl: Must be valid URL format
- websiteType: Must be 'official', 'blog', 'portfolio', or 'product'

### CompanyProject
- projectStatus: Must be 'draft', 'open', 'in_progress', 'completed', or 'cancelled'
- totalBudget: Decimal with 2 decimal places

### ProjectMilestone
- milestoneStatus: Must be 'pending', 'in_progress', 'submitted', 'approved', 'paid', or 'rejected'
- amount: Decimal with 2 decimal places
- orderNo: Integer for milestone ordering

---

## UUID vs Integer IDs

**Company Management System uses UUID** for all primary keys:
- Provides better security (non-sequential)
- Globally unique across systems
- Better for distributed systems

**User Profile System uses INTEGER** for all primary keys:
- Sequential numbering
- Simpler for development
- Smaller storage size

---

## Example Usage Flow

1. **Create a Company**
   ```
   POST /api/company
   ```

2. **Add Company Websites**
   ```
   POST /api/company-website/:companyId
   ```

3. **Create a Project**
   ```
   POST /api/company-project/:companyId
   ```

4. **Add Project Milestones**
   ```
   POST /api/milestone/:projectId
   ```

5. **View Complete Company Profile**
   ```
   GET /api/complete-company/:companyId/complete
   ```

6. **Update Milestone Status**
   ```
   PATCH /api/milestone/:id/status
   ```

7. **Get Company Statistics**
   ```
   GET /api/complete-company/:companyId/stats
   ```

---

## Testing

Use the provided test files:
- `test-requests.http` for REST Client extension
- `postman-collection.json` for Postman

---

## Running the Server

```bash
# Start the server
npm run dev

# Server will run on port 5000 (or PORT from .env)
```

The server automatically syncs database tables on startup.
