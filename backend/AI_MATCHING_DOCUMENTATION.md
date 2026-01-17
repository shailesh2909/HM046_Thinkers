# AI Applicant Matching System Documentation

## Overview
The AI Applicant Matching System helps companies find the perfect top N applicants for their projects based on skills, experience, education, and location matching.

**API Key:** `aff_cc185b9c5c263568b44c01674591e2b8ae5c171b`

---

## API Endpoints

### 1. Find Top N Applicants

**Endpoint:** `POST /api/matching/find-top-applicants`

Find the top N applicants matching specific job requirements.

**Request Body:**
```json
{
  "requiredSkills": ["JavaScript", "React", "Node.js", "PostgreSQL"],
  "minYearsExperience": 3,
  "educationLevel": "bachelor",
  "location": "San Francisco",
  "topN": 10
}
```

**Response:**
```json
{
  "success": true,
  "message": "Found top 10 matching applicants",
  "data": {
    "jobRequirements": {
      "requiredSkills": ["JavaScript", "React", "Node.js", "PostgreSQL"],
      "minYearsExperience": 3,
      "educationLevel": "bachelor",
      "location": "San Francisco"
    },
    "totalApplicants": 50,
    "topApplicants": [
      {
        "userId": 1,
        "email": "john@example.com",
        "profileName": "John Doe",
        "headline": "Senior Full Stack Developer",
        "currentPosition": "Lead Developer at Tech Corp",
        "location": "San Francisco, CA",
        "totalExperience": 5.2,
        "skills": ["JavaScript", "React", "Node.js", "PostgreSQL", "AWS"],
        "matchScore": 95,
        "matchDetails": {
          "matchedSkills": ["JavaScript", "React", "Node.js", "PostgreSQL"],
          "missingSkills": [],
          "experienceMatch": true,
          "locationMatch": true
        }
      }
    ]
  }
}
```

---

### 2. Find Applicants for Specific Project

**Endpoint:** `POST /api/matching/project/:projectId/find-applicants`

Find top applicants for a specific company project.

**URL Parameters:**
- `projectId` - UUID of the company project

**Request Body:**
```json
{
  "requiredSkills": ["Python", "Machine Learning", "TensorFlow"],
  "minYearsExperience": 2,
  "educationLevel": "master",
  "location": "remote",
  "topN": 20
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "project": {
      "id": "uuid-here",
      "name": "AI Model Development",
      "description": "Build ML models for customer segmentation"
    },
    "requirements": {
      "requiredSkills": ["Python", "Machine Learning", "TensorFlow"],
      "minYearsExperience": 2,
      "educationLevel": "master",
      "location": "remote"
    },
    "topApplicants": [...]
  }
}
```

---

### 3. Rank Specific Applicants

**Endpoint:** `POST /api/matching/rank-applicants`

Rank a specific list of applicants based on job requirements.

**Request Body:**
```json
{
  "userIds": [1, 2, 3, 4, 5],
  "jobRequirements": {
    "requiredSkills": ["Java", "Spring Boot", "Microservices"],
    "minYearsExperience": 4,
    "educationLevel": "bachelor",
    "location": "New York"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "userId": 3,
      "matchScore": 92,
      "matchDetails": {...}
    },
    {
      "userId": 1,
      "matchScore": 85,
      "matchDetails": {...}
    }
  ]
}
```

---

## Matching Algorithm

The system uses a weighted scoring algorithm to match applicants:

### Scoring Weights:
- **Skills Matching: 40%** - Matches required skills with applicant skills
- **Experience: 30%** - Compares years of experience
- **Education: 20%** - Matches education level
- **Location: 10%** - Matches location preferences

### Match Score Calculation:

**Total Score = 100 (maximum)**

1. **Skills Score (0-40 points)**
   - Calculates percentage of required skills matched
   - Formula: `(matched_skills / required_skills) * 40`

2. **Experience Score (0-30 points)**
   - Compares actual experience vs minimum required
   - Formula: `min(actual_years / required_years, 1.5) * 30`
   - Caps at 1.5x to reward extra experience but not excessively

3. **Education Score (0-20 points)**
   - Matches education level (High School → PhD)
   - Full points if meets or exceeds requirement
   - Half points if below requirement

4. **Location Score (0-10 points)**
   - Full points for exact match or "remote"
   - Half points for different location

---

## Match Details

Each applicant result includes detailed match information:

```json
{
  "matchedSkills": ["JavaScript", "React", "Node.js"],
  "missingSkills": ["PostgreSQL"],
  "experienceMatch": true,
  "locationMatch": true
}
```

---

## Usage Examples

### Example 1: Find Top 10 Web Developers

```bash
POST http://localhost:5000/api/matching/find-top-applicants
Content-Type: application/json

{
  "requiredSkills": ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
  "minYearsExperience": 2,
  "educationLevel": "bachelor",
  "location": "remote",
  "topN": 10
}
```

### Example 2: Find Applicants for AI Project

```bash
POST http://localhost:5000/api/matching/project/uuid-123/find-applicants
Content-Type: application/json

{
  "requiredSkills": ["Python", "TensorFlow", "PyTorch", "NLP"],
  "minYearsExperience": 3,
  "educationLevel": "master",
  "location": "remote",
  "topN": 15
}
```

### Example 3: Rank Shortlisted Candidates

```bash
POST http://localhost:5000/api/matching/rank-applicants
Content-Type: application/json

{
  "userIds": [1, 5, 8, 12, 15, 20],
  "jobRequirements": {
    "requiredSkills": ["DevOps", "Docker", "Kubernetes", "AWS"],
    "minYearsExperience": 4,
    "educationLevel": "bachelor",
    "location": "remote"
  }
}
```

---

## Integration with Affinda API

The system is configured to use Affinda API for advanced resume parsing:

### Resume Parsing (Future Feature)
```javascript
// Parse single resume
const parsed = await applicantMatchingService.parseResume(resumeFile);

// Batch parse multiple resumes
const parsed = await applicantMatchingService.batchParseResumes([file1, file2, file3]);
```

---

## Field Descriptions

### Required Fields:

**requiredSkills** (Array of Strings)
- List of technical skills required for the job
- Example: `["JavaScript", "React", "Node.js"]`

**minYearsExperience** (Number)
- Minimum years of experience required
- Example: `3`

**educationLevel** (String)
- Minimum education level required
- Options: `"high school"`, `"associate"`, `"bachelor"`, `"master"`, `"phd"`

**location** (String)
- Job location or "remote"
- Example: `"San Francisco"` or `"remote"`

**topN** (Number, optional)
- Number of top applicants to return
- Default: `10`

---

## Response Fields

### Applicant Object:

```javascript
{
  userId: 1,                    // User ID
  email: "user@example.com",    // Email address
  profileName: "John Doe",      // Full name
  headline: "...",              // Professional headline
  currentPosition: "...",       // Current job title
  location: "...",              // Location
  totalExperience: 5.2,         // Years of experience
  skills: [...],                // Array of skills
  education: [...],             // Education history
  experiences: [...],           // Work experience
  projects: [...],              // Project portfolio
  matchScore: 95,               // Match score (0-100)
  matchDetails: {...}           // Detailed match info
}
```

---

## Best Practices

1. **Be Specific with Skills**
   - Use exact technology names
   - Include both required and preferred skills

2. **Set Realistic Experience Requirements**
   - Consider that 1-2 years is junior
   - 3-5 years is mid-level
   - 5+ years is senior

3. **Use Appropriate topN Values**
   - 10-20 for initial screening
   - 5-10 for final shortlist

4. **Consider Location Flexibility**
   - Use "remote" for remote positions
   - Be specific for on-site roles

5. **Review Match Details**
   - Check `missingSkills` to understand gaps
   - Use `matchScore` as a guide, not absolute

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `400` - Bad Request (missing/invalid parameters)
- `404` - Not Found (project doesn't exist)
- `500` - Server Error

---

## Performance Considerations

- The system processes all applicants in memory
- For large datasets (1000+ applicants), consider pagination
- Matching is fast but scales linearly with applicant count
- Consider caching for frequently used searches

---

## Future Enhancements

- [ ] Machine learning-based scoring
- [ ] Resume parsing integration
- [ ] Semantic skill matching (e.g., "React" matches "React.js")
- [ ] Industry-specific scoring weights
- [ ] Candidate diversity scoring
- [ ] Interview scheduling integration
- [ ] Applicant tracking system (ATS) integration

---

## API Key Management

**Current API Key:** `aff_cc185b9c5c263568b44c01674591e2b8ae5c171b`

The API key is stored in `.env` file:
```
AFFINDA_API_KEY=aff_cc185b9c5c263568b44c01674591e2b8ae5c171b
```

**Security Note:** Never commit the `.env` file to version control.

---

## Testing

Test the endpoints using Thunder Client, Postman, or curl:

```bash
curl -X POST http://localhost:5000/api/matching/find-top-applicants \
  -H "Content-Type: application/json" \
  -d '{
    "requiredSkills": ["JavaScript", "React"],
    "minYearsExperience": 2,
    "educationLevel": "bachelor",
    "location": "remote",
    "topN": 5
  }'
```

---

## Support

For issues or questions about the applicant matching system:
1. Check the error message in the response
2. Verify all required fields are provided
3. Ensure applicants have complete profiles
4. Review match scores and details for insights
