# User Profile Management System - Backend

A comprehensive Node.js/Express backend API for managing user profiles with PostgreSQL database using Sequelize ORM.

## Features

- ✅ Complete user profile management
- ✅ Multiple education entries per user
- ✅ Multiple contact numbers with types
- ✅ Multiple websites with categories
- ✅ Work experience tracking
- ✅ Project portfolio management
- ✅ RESTful API architecture
- ✅ PostgreSQL database with Sequelize ORM
- ✅ Data validation and relationships
- ✅ Cascade delete operations

## Project Structure

```
backend/
├── config/
│   └── database.js           # Sequelize configuration
├── models/
│   ├── index.js              # Model relationships
│   ├── User.js               # Base user model
│   ├── UserProfile.js        # User profile details
│   ├── Education.js          # Education records
│   ├── ContactInfo.js        # Contact information
│   ├── Website.js            # Website links
│   ├── Experience.js         # Work experience
│   └── Project.js            # Project portfolio
├── controllers/
│   ├── userController.js
│   ├── profileController.js
│   ├── educationController.js
│   ├── contactController.js
│   ├── websiteController.js
│   ├── experienceController.js
│   ├── projectController.js
│   └── completeProfileController.js
├── routes/
│   ├── userRoutes.js
│   ├── profileRoutes.js
│   ├── educationRoutes.js
│   ├── contactRoutes.js
│   ├── websiteRoutes.js
│   ├── experienceRoutes.js
│   ├── projectRoutes.js
│   └── completeProfileRoutes.js
├── server.js                  # Main application file
├── package.json
├── .env.example              # Environment variables template
├── API_DOCUMENTATION.md      # Complete API documentation
└── test-requests.http        # HTTP client test requests
```

## Database Schema

### Models and Relationships

1. **User** (Base authentication)
   - id, email, password

2. **UserProfile** (1:1 with User)
   - Profile photo, name, headline, current position
   - Address, birth date, banner, about section

3. **Education** (1:Many with User)
   - School, degree, field of study
   - Start/end dates, grade, description

4. **ContactInfo** (1:Many with User)
   - Phone number, phone type (home/work/mobile)

5. **Website** (1:Many with User)
   - Website URL, type (personal/blog/portfolio/company/other)

6. **Experience** (1:Many with User)
   - Title, employment type, company
   - Start/end dates, location, location type
   - Description, skills, media

7. **Project** (1:Many with User)
   - Project name, description, media
   - Start/end dates, associated company
   - Project URL, skills

## Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your PostgreSQL connection string
   EXTERNAL_DB_URL=postgresql://username:password@host:port/database
   PORT=5000
   ```

4. **Run the server**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints Overview

### Profile Management
- `POST/PUT /api/profile/:userId` - Create/Update profile
- `GET /api/profile/:userId` - Get profile
- `DELETE /api/profile/:userId` - Delete profile

### Education
- `POST /api/education/:userId` - Add education
- `GET /api/education/:userId` - Get all education
- `GET /api/education/single/:id` - Get one education
- `PUT /api/education/:id` - Update education
- `DELETE /api/education/:id` - Delete education

### Contact Info
- `POST /api/contact/:userId` - Add contact
- `GET /api/contact/:userId` - Get all contacts
- `GET /api/contact/single/:id` - Get one contact
- `PUT /api/contact/:id` - Update contact
- `DELETE /api/contact/:id` - Delete contact

### Websites
- `POST /api/website/:userId` - Add website
- `GET /api/website/:userId` - Get all websites
- `GET /api/website/single/:id` - Get one website
- `PUT /api/website/:id` - Update website
- `DELETE /api/website/:id` - Delete website

### Experience
- `POST /api/experience/:userId` - Add experience
- `GET /api/experience/:userId` - Get all experiences
- `GET /api/experience/single/:id` - Get one experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

### Projects
- `POST /api/project/:userId` - Add project
- `GET /api/project/:userId` - Get all projects
- `GET /api/project/single/:id` - Get one project
- `PUT /api/project/:id` - Update project
- `DELETE /api/project/:id` - Delete project

### Complete Profile
- `GET /api/user/:userId/complete` - Get full profile with all data
- `GET /api/user/:userId/stats` - Get profile statistics
- `DELETE /api/user/:userId/complete` - Delete entire profile

## Testing

Use the provided `test-requests.http` file with REST Client extension in VS Code, or import into Postman/Insomnia.

## Database Sync

The application automatically creates/updates database tables on startup using:
```javascript
sequelize.sync({ alter: true })
```

**Note:** In production, consider using migrations instead of `alter: true`.

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Deployment

This backend is configured for deployment on platforms like:
- Render
- Heroku
- Railway
- Any Node.js hosting service

Database is configured to work with PostgreSQL on Render with SSL support.

## Error Handling

All endpoints return consistent response format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## Future Enhancements

- [ ] Authentication middleware (JWT)
- [ ] File upload for images
- [ ] Input validation middleware
- [ ] Rate limiting
- [ ] API versioning
- [ ] Pagination for list endpoints
- [ ] Search and filtering
- [ ] Database migrations
- [ ] Unit and integration tests

## License

ISC

## Contributors

HM046_Thinkers Team
