# Form Integration Guide - Frontend to Backend

## 🎯 Overview

All frontend forms have been updated to properly integrate with the database schema. This document outlines each form's structure, expected API endpoints, and data flow.

---

## 📝 Authentication Forms

### 1. Sign Up Form (`/signup`)

**File**: `src/pages/SignUp.jsx`

#### Form Fields
```javascript
{
  name: string,           // User's full name
  email: string,          // Email address
  password: string,       // Password
  confirmPassword: string, // Password confirmation (frontend only)
  user_type: string       // 'freelancer' or 'company'
}
```

#### API Endpoint
```http
POST /api/auth/signup
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "user_type": "freelancer"  // or "company"
}

Expected Response:
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user_type": "freelancer",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Frontend Logic
- Validates password match before submission
- Stores `token`, `userType`, and `userName` in localStorage
- Redirects to `/dashboard` on success
- Shows error alert on failure

#### Backend Requirements
- Create user in `auth_users` table
- Generate JWT token
- Return user details and token
- Hash password before storing

---

### 2. Sign In Form (`/signin`)

**File**: `src/pages/SignIn.jsx`

#### Form Fields
```javascript
{
  email: string,    // Email address
  password: string  // Password
}
```

#### API Endpoint
```http
POST /api/auth/signin
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}

Expected Response:
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user_type": "freelancer",  // or "company"
    "name": "John Doe",         // for freelancers
    "company_name": "TechCorp"  // for companies
  }
}
```

#### Frontend Logic
- Submits credentials to API
- Stores `token`, `userType`, and `userName` in localStorage
- Handles both `name` and `company_name` from response
- Redirects to `/dashboard` on success

#### Backend Requirements
- Verify credentials against `auth_users` table
- Check user type and get appropriate profile
- Generate JWT token
- Return token and user details

---

## 🏢 Company Profile Form (`/profile`)

**File**: `src/pages/Profile/Profile.jsx`

### For Company Users

#### Form Fields
```javascript
{
  companyName: string,      // Company name
  headline: string,         // Short tagline
  about: string,           // Company description
  industry: string,        // Business domain
  companySize: string,     // e.g., "11-50", "51-200"
  contactEmail: string,    // Contact email
  phoneNumber: string,     // Contact phone
  phoneType: string,       // 'work' | 'support' | 'other'
  address: string,         // Full address
  location: string,        // City/region
  profilePhoto: string,    // Logo URL (from upload)
  bannerPhoto: string      // Banner URL (from upload)
}
```

#### API Endpoints

**Get Profile**
```http
GET /api/companies/profile
Authorization: Bearer {token}

Expected Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "auth_user_id": "uuid",
    "company_name": "TechCorp",
    "headline": "Innovative Tech Solutions",
    "about": "We build amazing products",
    "profile_photo": "https://...",
    "banner_photo": "https://...",
    "industry": "Technology",
    "company_size": "11-50",
    "contact_email": "contact@techcorp.com",
    "phone_number": "+91 9876543210",
    "phone_type": "work",
    "address": "123 Tech Street",
    "location": "Mumbai, India",
    "created_at": "2026-01-15T10:00:00Z",
    "updated_at": "2026-01-18T12:30:00Z"
  }
}
```

**Update Profile**
```http
PUT /api/companies/profile
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "company_name": "TechCorp",
  "headline": "Innovative Tech Solutions",
  "about": "We build amazing products",
  "industry": "Technology",
  "company_size": "11-50",
  "contact_email": "contact@techcorp.com",
  "phone_number": "+91 9876543210",
  "phone_type": "work",
  "address": "123 Tech Street",
  "location": "Mumbai, India"
}

Expected Response:
{
  "success": true,
  "data": { /* updated company object */ },
  "message": "Profile updated successfully"
}
```

**Upload Logo**
```http
POST /api/companies/upload-logo
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- logo: File

Expected Response:
{
  "success": true,
  "data": {
    "profile_photo": "https://storage.example.com/logos/uuid.jpg"
  }
}
```

#### Frontend Logic
- Loads profile on component mount
- Enables/disables editing mode
- Converts camelCase to snake_case for API calls
- Handles file uploads for logo/banner
- Shows loading states during operations

#### Backend Requirements
- Extract `auth_user_id` from JWT token
- Find company by `auth_user_id`
- Validate all fields
- Handle file uploads (S3/cloud storage)
- Update `updated_at` timestamp
- Return updated profile

---

### For Freelancer Users

#### Form Fields
```javascript
{
  firstName: string,    // First name
  lastName: string,     // Last name
  email: string,        // Email (read-only)
  phone: string,        // Phone number
  bio: string,          // Professional bio
  location: string,     // Location
  profileImage: string, // Profile photo URL
  resume: File          // Resume file (optional)
}
```

#### API Endpoints

**Get Profile**
```http
GET /api/users/profile
Authorization: Bearer {token}

Expected Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "bio": "Full Stack Developer...",
    "location": "India",
    "profileImage": "https://...",
    "created_at": "2026-01-15T10:00:00Z"
  }
}
```

**Update Profile**
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91 9876543210",
  "bio": "Full Stack Developer...",
  "location": "India"
}
```

---

## 🚀 Create Project Form (`/create-project`)

**File**: `src/pages/CreateProject/CreateProject.jsx`

### Form Structure

#### Project Details
```javascript
{
  projectName: string,        // Project title
  projectDescription: string, // Full description
  totalBudget: number,        // Total budget amount
  currency: string,           // Currency code (default: 'INR')
  startDate: string,          // ISO date string
  endDate: string,            // ISO date string
  projectStatus: string,      // 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled'
  skills: string,             // Comma-separated skills (frontend only)
  projectCategory: string     // Category (frontend only)
}
```

#### Milestones Array
```javascript
milestones: [
  {
    name: string,              // Milestone title
    description: string,       // Milestone description
    tokenAllocation: number,   // Amount for this milestone
    order: number              // Execution order
  }
]
```

### API Flow

**Step 1: Create Project**
```http
POST /api/projects
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "project_name": "E-commerce Platform",
  "description": "Build full-stack e-commerce platform with React and Node.js",
  "total_budget": 100000,
  "currency": "INR",
  "start_date": "2026-02-01",
  "end_date": "2026-06-01",
  "project_status": "draft"
}

Expected Response:
{
  "success": true,
  "data": {
    "id": "project-uuid",
    "company_id": "company-uuid",
    "project_name": "E-commerce Platform",
    "description": "...",
    "total_budget": 100000,
    "currency": "INR",
    "start_date": "2026-02-01",
    "end_date": "2026-06-01",
    "project_status": "draft",
    "created_at": "2026-01-18T10:00:00Z",
    "updated_at": "2026-01-18T10:00:00Z"
  }
}
```

**Step 2: Create Milestones (Multiple calls)**
```http
POST /api/projects/milestones
Authorization: Bearer {token}
Content-Type: application/json

Request Body (for each milestone):
{
  "project_id": "project-uuid",
  "milestone_title": "Frontend Development",
  "description": "Build React frontend with responsive design",
  "amount": 30000,
  "order_no": 1,
  "start_date": "2026-02-01",
  "end_date": "2026-03-01",
  "milestone_status": "pending"
}

Expected Response:
{
  "success": true,
  "data": {
    "id": "milestone-uuid",
    "project_id": "project-uuid",
    "milestone_title": "Frontend Development",
    "description": "...",
    "amount": 30000,
    "order_no": 1,
    "start_date": "2026-02-01",
    "end_date": "2026-03-01",
    "milestone_status": "pending",
    "created_at": "2026-01-18T10:00:00Z"
  }
}
```

### Frontend Logic

1. **Validation**
   - All required fields filled
   - Budget > 0
   - End date > Start date
   - Each milestone has name and amount
   - Total milestone amounts = total budget

2. **Submission Flow**
   - Create project first
   - Extract project ID from response
   - Create all milestones in parallel using `Promise.all()`
   - Show success message
   - Redirect to `/my-projects`

3. **Error Handling**
   - Catch API errors
   - Show user-friendly error messages
   - Don't redirect on error
   - Keep form data for retry

### Backend Requirements

**For Project Creation**
- Extract `company_id` from `auth_user_id` → `companies` table
- Validate user is company type
- Validate dates (end_date > start_date)
- Auto-set `created_at` and `updated_at`
- Return created project with all fields

**For Milestone Creation**
- Verify project exists and belongs to requesting company
- Validate `order_no` is unique within project
- Validate sum of milestone amounts ≤ project total_budget
- Validate dates are within project date range
- Auto-set `created_at` and `updated_at`
- Set default `milestone_status` to 'pending'

---

## 🔄 Form Validation Rules

### Universal Rules
- All required fields must be filled
- Email must be valid format
- Phone numbers should follow pattern
- Dates must be valid ISO format
- URLs must be valid (for websites)

### Project-Specific Rules
```javascript
{
  projectName: {
    required: true,
    minLength: 3,
    maxLength: 200
  },
  projectDescription: {
    required: true,
    minLength: 50,
    maxLength: 5000
  },
  totalBudget: {
    required: true,
    min: 1,
    type: 'number'
  },
  startDate: {
    required: true,
    format: 'YYYY-MM-DD'
  },
  endDate: {
    required: true,
    format: 'YYYY-MM-DD',
    afterField: 'startDate'
  }
}
```

### Company Profile Rules
```javascript
{
  companyName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  companySize: {
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
  },
  phoneType: {
    enum: ['work', 'support', 'other']
  },
  contactEmail: {
    required: true,
    format: 'email'
  }
}
```

---

## 🎨 Frontend Form Patterns

### Loading States
```javascript
const [loading, setLoading] = useState(false);

// Show loading in button
<button disabled={loading}>
  {loading ? 'Saving...' : 'Save'}
</button>
```

### Error Handling
```javascript
try {
  await api.method();
  // Success
} catch (error) {
  console.error('Error:', error);
  alert(error.message || 'Operation failed');
}
```

### Form State Management
```javascript
const [formData, setFormData] = useState({ /* initial */ });
const [tempFormData, setTempFormData] = useState(formData);
const [errors, setErrors] = useState({});

// Edit mode: use tempFormData
// Save: copy tempFormData to formData
// Cancel: reset tempFormData from formData
```

---

## 🔐 Security Considerations

### Frontend
- Validate all inputs before submission
- Sanitize user inputs
- Don't store sensitive data in localStorage
- Use HTTPS for all API calls
- Clear tokens on logout

### Backend
- Verify JWT token on all protected routes
- Validate all inputs server-side
- Check user permissions (company vs freelancer)
- Hash passwords with bcrypt
- Sanitize SQL queries (use parameterized queries)
- Rate limit API endpoints
- Validate file uploads (type, size)

---

## 📊 Data Flow Diagram

```
┌─────────────┐
│   User      │
│   Input     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Frontend   │
│  Validation │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Format    │ (camelCase → snake_case)
│   Data      │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   API Call  │ (with JWT token)
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Backend   │
│   Receives  │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Verify    │ (JWT, permissions)
│   Auth      │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Validate  │ (data, business rules)
│   Input     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Database   │ (INSERT/UPDATE)
│  Operation  │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Format    │ (snake_case → camelCase)
│   Response  │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Return    │ (JSON response)
│   to Client │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Frontend  │
│   Updates   │
└─────────────┘
```

---

## ✅ Backend Implementation Checklist

### Authentication Endpoints
- [ ] POST /api/auth/signup - Create user account
- [ ] POST /api/auth/signin - Login user
- [ ] GET /api/auth/verify - Verify JWT token
- [ ] POST /api/auth/logout - Logout user

### Company Profile Endpoints
- [ ] GET /api/companies/profile - Get company profile
- [ ] PUT /api/companies/profile - Update company profile
- [ ] POST /api/companies/upload-logo - Upload logo
- [ ] POST /api/companies/upload-banner - Upload banner

### User Profile Endpoints
- [ ] GET /api/users/profile - Get user profile
- [ ] PUT /api/users/profile - Update user profile
- [ ] POST /api/users/upload-profile-picture - Upload photo

### Project Endpoints
- [ ] POST /api/projects - Create project
- [ ] GET /api/projects/:id - Get project details
- [ ] PUT /api/projects/:id - Update project
- [ ] DELETE /api/projects/:id - Delete project

### Milestone Endpoints
- [ ] POST /api/projects/milestones - Create milestone
- [ ] GET /api/projects/:projectId/milestones - Get project milestones
- [ ] PUT /api/projects/milestones/:id - Update milestone
- [ ] DELETE /api/projects/milestones/:id - Delete milestone

---

## 🐛 Common Issues & Solutions

### Issue: Field names don't match
**Solution**: Backend must accept snake_case, frontend sends camelCase. Use converters in API layer.

### Issue: Auth token not sent
**Solution**: Check axios interceptor in `axiosConfig.js` adds Bearer token.

### Issue: CORS errors
**Solution**: Configure CORS in backend to allow frontend origin.

### Issue: File uploads fail
**Solution**: Ensure `Content-Type: multipart/form-data` and backend accepts files.

### Issue: Dates are invalid
**Solution**: Use ISO format (YYYY-MM-DD) consistently.

---

## 📚 Testing Forms

### Manual Testing Checklist

**Sign Up Form**
- [ ] Submit with valid data
- [ ] Try mismatched passwords
- [ ] Try duplicate email
- [ ] Check freelancer type
- [ ] Check company type

**Sign In Form**
- [ ] Login with valid credentials
- [ ] Try wrong password
- [ ] Try non-existent email
- [ ] Check token storage
- [ ] Check redirect to dashboard

**Create Project Form**
- [ ] Create with single milestone
- [ ] Create with multiple milestones
- [ ] Validate budget allocation
- [ ] Check date validation
- [ ] Test auto-distribute feature
- [ ] Verify API calls order

**Profile Forms**
- [ ] Load existing profile
- [ ] Update all fields
- [ ] Upload profile photo
- [ ] Test cancel button
- [ ] Verify save confirmation

---

**All forms are now integrated with the database schema and ready for backend implementation!** 🎉
