# User Profile Management API Documentation

## Database Models

### 1. User
Base user authentication model
- email (String, unique, required)
- password (String, required)

### 2. UserProfile (One-to-One with User)
- profilePhoto (String)
- profileName (String)
- headline (String)
- currentPosition (String)
- address (Text)
- birthDate (Date - YYYY-MM-DD)
- userBanner (String)
- aboutSection (Text)

### 3. Education (One-to-Many with User)
- school (String, required)
- degree (String)
- fieldOfStudy (String)
- startDate (Date)
- endDate (Date)
- grade (String)
- description (Text)

### 4. ContactInfo (One-to-Many with User)
- phoneNumber (String, required)
- phoneType (Enum: 'home', 'work', 'mobile')

### 5. Website (One-to-Many with User)
- websiteUrl (String, required, URL validation)
- websiteType (Enum: 'personal', 'blog', 'portfolio', 'company', 'other')

### 6. Experience (One-to-Many with User)
- title (String, required)
- employmentType (Enum: 'full-time', 'part-time', 'self-employed', 'freelance', 'contract', 'internship')
- companyOrganization (String, required)
- startDate (Date, required)
- endDate (Date)
- location (String)
- locationType (Enum: 'onsite', 'hybrid', 'remote')
- description (Text)
- skills (Array of Strings)
- media (Array of Strings - URLs)

### 7. Project (One-to-Many with User)
- projectName (String, required)
- description (Text)
- media (Array of Strings - URLs)
- startDate (Date)
- endDate (Date)
- associatedWith (String - company name)
- projectUrl (String)
- skills (Array of Strings)

---

## API Endpoints

### User Profile Routes

#### Create/Update User Profile
```
POST/PUT /api/profile/:userId
Body: {
  "profilePhoto": "url",
  "profileName": "John Doe",
  "headline": "Software Engineer",
  "currentPosition": "Senior Developer at ABC Corp",
  "address": "123 Main St, City, Country",
  "birthDate": "1990-05-15",
  "userBanner": "banner-url",
  "aboutSection": "Passionate developer with 5+ years experience..."
}
```

#### Get User Profile
```
GET /api/profile/:userId
```

#### Delete User Profile
```
DELETE /api/profile/:userId
```

---

### Education Routes

#### Create Education
```
POST /api/education/:userId
Body: {
  "school": "University Name",
  "degree": "Bachelor's",
  "fieldOfStudy": "Computer Science",
  "startDate": "2015-09-01",
  "endDate": "2019-06-01",
  "grade": "3.8 GPA",
  "description": "Focused on AI and Machine Learning"
}
```

#### Get All Education for User
```
GET /api/education/:userId
```

#### Get Single Education
```
GET /api/education/single/:id
```

#### Update Education
```
PUT /api/education/:id
Body: { /* fields to update */ }
```

#### Delete Education
```
DELETE /api/education/:id
```

---

### Contact Info Routes

#### Create Contact Info
```
POST /api/contact/:userId
Body: {
  "phoneNumber": "+1234567890",
  "phoneType": "mobile"
}
```

#### Get All Contact Info for User
```
GET /api/contact/:userId
```

#### Get Single Contact Info
```
GET /api/contact/single/:id
```

#### Update Contact Info
```
PUT /api/contact/:id
Body: { /* fields to update */ }
```

#### Delete Contact Info
```
DELETE /api/contact/:id
```

---

### Website Routes

#### Create Website
```
POST /api/website/:userId
Body: {
  "websiteUrl": "https://example.com",
  "websiteType": "portfolio"
}
```

#### Get All Websites for User
```
GET /api/website/:userId
```

#### Get Single Website
```
GET /api/website/single/:id
```

#### Update Website
```
PUT /api/website/:id
Body: { /* fields to update */ }
```

#### Delete Website
```
DELETE /api/website/:id
```

---

### Experience Routes

#### Create Experience
```
POST /api/experience/:userId
Body: {
  "title": "Senior Software Engineer",
  "employmentType": "full-time",
  "companyOrganization": "Tech Corp",
  "startDate": "2020-01-01",
  "endDate": "2023-12-31",
  "location": "San Francisco, CA",
  "locationType": "hybrid",
  "description": "Led a team of 5 developers...",
  "skills": ["JavaScript", "React", "Node.js"],
  "media": ["image-url-1", "image-url-2"]
}
```

#### Get All Experiences for User
```
GET /api/experience/:userId
```

#### Get Single Experience
```
GET /api/experience/single/:id
```

#### Update Experience
```
PUT /api/experience/:id
Body: { /* fields to update */ }
```

#### Delete Experience
```
DELETE /api/experience/:id
```

---

### Project Routes

#### Create Project
```
POST /api/project/:userId
Body: {
  "projectName": "E-commerce Platform",
  "description": "Built a full-stack e-commerce solution",
  "media": ["screenshot-1.jpg", "demo-video.mp4"],
  "startDate": "2023-01-01",
  "endDate": "2023-06-01",
  "associatedWith": "Tech Corp",
  "projectUrl": "https://project.example.com",
  "skills": ["React", "Node.js", "MongoDB"]
}
```

#### Get All Projects for User
```
GET /api/project/:userId
```

#### Get Single Project
```
GET /api/project/single/:id
```

#### Update Project
```
PUT /api/project/:id
Body: { /* fields to update */ }
```

#### Delete Project
```
DELETE /api/project/:id
```

---

### Complete Profile Routes

#### Get Complete User Profile (with all relationships)
```
GET /api/user/:userId/complete
Returns: {
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "UserProfile": { /* profile data */ },
    "Educations": [ /* array of education */ ],
    "ContactInfos": [ /* array of contacts */ ],
    "Websites": [ /* array of websites */ ],
    "Experiences": [ /* array of experiences */ ],
    "Projects": [ /* array of projects */ ]
  }
}
```

#### Get Profile Statistics
```
GET /api/user/:userId/stats
Returns: {
  "success": true,
  "data": {
    "education": 2,
    "experience": 3,
    "projects": 5,
    "websites": 2,
    "contacts": 2
  }
}
```

#### Delete Complete Profile
```
DELETE /api/user/:userId/complete
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

## Database Setup

The application uses Sequelize ORM with PostgreSQL. Tables are automatically created/updated on server start using `sequelize.sync({ alter: true })`.

### Relationships
- User → UserProfile (One-to-One)
- User → Education (One-to-Many)
- User → ContactInfo (One-to-Many)
- User → Website (One-to-Many)
- User → Experience (One-to-Many)
- User → Project (One-to-Many)

All relationships use CASCADE delete, so deleting a user will automatically delete all related data.

---

## Environment Variables Required

Create a `.env` file in the backend directory:

```
EXTERNAL_DB_URL=postgresql://username:password@host:port/database
PORT=5000
```

---

## Running the Server

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Production mode
npm start
```

The server will run on http://localhost:5000 (or your specified PORT)
