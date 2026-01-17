# Resume Parsing API Testing Guide

## API Endpoints

### 1. Test API Connection
**URL:** `GET http://localhost:5000/api/resume/test-connection`
**Description:** Test if the Affinda API key is working correctly

**Example:**
```
GET http://localhost:5000/api/resume/test-connection
```

### 2. Parse Resume from URL
**URL:** `POST http://localhost:5000/api/resume/parse-url`
**Description:** Parse a resume from a publicly accessible URL

**Example JSON:**
```json
{
  "resumeUrl": "https://example.com/path/to/resume.pdf"
}
```

### 3. Parse Resume from File Upload
**URL:** `POST http://localhost:5000/api/resume/parse-file`
**Description:** Upload and parse a resume file (PDF, DOC, DOCX)
**Note:** Requires multer middleware (coming soon)

---

## Testing Steps

### Step 1: Test API Connection
```
GET http://localhost:5000/api/resume/test-connection
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Affinda API connection successful",
  "apiKey": "aff_cc185b...",
  "organization": "Your Organization Name"
}
```

### Step 2: Parse Sample Resume from URL
```
POST http://localhost:5000/api/resume/parse-url
Content-Type: application/json

{
  "resumeUrl": "https://affinda-assets.s3-ap-southeast-2.amazonaws.com/docs/sample_resumes/resume_en.pdf"
}
```

**Expected Response Structure:**
```json
{
  "success": true,
  "message": "Resume parsed successfully",
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "location": "San Francisco, CA",
    "summary": "Experienced software engineer...",
    "skills": [
      "JavaScript",
      "React",
      "Node.js",
      "Python"
    ],
    "education": [
      {
        "degree": "Bachelor of Science",
        "institution": "University Name",
        "dates": {
          "start": "2015-09-01",
          "end": "2019-05-31"
        }
      }
    ],
    "experience": [
      {
        "title": "Senior Software Engineer",
        "company": "Tech Company",
        "dates": {
          "start": "2019-06-01",
          "end": null
        },
        "description": "Led development of..."
      }
    ],
    "totalYearsExperience": 5,
    "languages": ["English", "Spanish"],
    "certifications": []
  }
}
```

---

## Sample Resume URLs for Testing

You can use these public sample resumes for testing:

1. **Affinda Sample Resume:**
   ```
   https://affinda-assets.s3-ap-southeast-2.amazonaws.com/docs/sample_resumes/resume_en.pdf
   ```

2. **Or use any publicly accessible resume URL from:**
   - Google Drive (make sure it's publicly accessible)
   - Dropbox (public link)
   - GitHub raw files
   - Your own hosting

---

## Thunder Client Test Examples

### Test 1: Connection Test
```
GET http://localhost:5000/api/resume/test-connection
```

### Test 2: Parse Resume
```
POST http://localhost:5000/api/resume/parse-url
Content-Type: application/json

{
  "resumeUrl": "https://affinda-assets.s3-ap-southeast-2.amazonaws.com/docs/sample_resumes/resume_en.pdf"
}
```

---

## Error Handling

### Possible Errors:

**1. Invalid API Key:**
```json
{
  "success": false,
  "message": "Failed to connect to Affinda API",
  "error": "Invalid authentication credentials"
}
```

**2. Invalid URL:**
```json
{
  "success": false,
  "message": "Resume URL is required"
}
```

**3. Resume Not Accessible:**
```json
{
  "success": false,
  "message": "Unable to access resume URL",
  "error": "Failed to download resume"
}
```

---

## Integration with User Profile

After successfully parsing a resume, you can use the returned data to populate:
- User model (email)
- UserProfile model (name, summary)
- Education model (education history)
- Experience model (work experience)
- Project model (if extracted)
- Website model (if URLs found)

---

## Next Steps

1. Test the API connection first
2. Try parsing a sample resume
3. Integrate parsed data with your user profile creation
4. Add file upload capability with multer
5. Create a complete user registration flow with resume parsing
