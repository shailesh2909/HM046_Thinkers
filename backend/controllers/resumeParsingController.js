const axios = require('axios');
const FormData = require('form-data');

const AFFINDA_API_KEY = process.env.AFFINDA_API_KEY;
const AFFINDA_BASE_URL = 'https://api.affinda.com/v3';

/**
 * Get workspace identifier
 */
async function getWorkspaceIdentifier() {
  try {
    const response = await axios.get(
      `${AFFINDA_BASE_URL}/workspaces`,
      {
        headers: {
          'Authorization': `Bearer ${AFFINDA_API_KEY}`
        }
      }
    );
    return response.data.results?.[0]?.identifier || null;
  } catch (error) {
    console.error('Error getting workspace:', error.message);
    return null;
  }
}

/**
 * Parse resume from URL
 */
exports.parseResumeFromUrl = async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    if (!resumeUrl) {
      return res.status(400).json({
        success: false,
        message: 'Resume URL is required'
      });
    }

    // Get workspace identifier
    const workspace = await getWorkspaceIdentifier();
    
    if (!workspace) {
      return res.status(500).json({
        success: false,
        message: 'Unable to get workspace. Check API key.'
      });
    }

    // Make request to Affinda API
    const response = await axios.post(
      `${AFFINDA_BASE_URL}/documents`,
      {
        url: resumeUrl,
        workspace: workspace,
        wait: true
      },
      {
        headers: {
          'Authorization': `Bearer ${AFFINDA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract relevant information
    const parsedData = {
      name: response.data.data?.name?.raw || null,
      email: response.data.data?.emails?.[0] || null,
      phone: response.data.data?.phoneNumbers?.[0] || null,
      location: response.data.data?.location?.formatted || null,
      summary: response.data.data?.summary || null,
      skills: response.data.data?.skills?.map(skill => skill.name) || [],
      education: response.data.data?.education?.map(edu => ({
        degree: edu.accreditation?.education || null,
        institution: edu.organization || null,
        dates: {
          start: edu.dates?.startDate || null,
          end: edu.dates?.completionDate || null
        }
      })) || [],
      experience: response.data.data?.workExperience?.map(exp => ({
        title: exp.jobTitle || null,
        company: exp.organization || null,
        dates: {
          start: exp.dates?.startDate || null,
          end: exp.dates?.endDate || null
        },
        description: exp.jobDescription || null
      })) || [],
      totalYearsExperience: response.data.data?.totalYearsExperience || 0,
      languages: response.data.data?.languages || [],
      certifications: response.data.data?.certifications || [],
      rawData: response.data.data // Full parsed data
    };

    res.status(200).json({
      success: true,
      message: 'Resume parsed successfully',
      data: parsedData
    });
  } catch (error) {
    console.error('Error parsing resume:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
      error: error.response?.data || error.message
    });
  }
};

/**
 * Parse resume from file upload
 */
exports.parseResumeFromFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required'
      });
    }

    // Get workspace identifier
    const workspace = await getWorkspaceIdentifier();
    
    if (!workspace) {
      return res.status(500).json({
        success: false,
        message: 'Unable to get workspace. Check API key.'
      });
    }

    // Create form data
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });
    formData.append('wait', 'true');
    formData.append('workspace', workspace);

    // Make request to Affinda API
    const response = await axios.post(
      `${AFFINDA_BASE_URL}/resumes`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${AFFINDA_API_KEY}`,
          ...formData.getHeaders()
        },
        params: {
          workspace: AFFINDA_WORKSPACE,
          wait: true
        }
      }
    );

    // Extract relevant information
    const parsedData = {
      name: response.data.data?.name?.raw || null,
      email: response.data.data?.emails?.[0] || null,
      phone: response.data.data?.phoneNumbers?.[0] || null,
      location: response.data.data?.location?.formatted || null,
      summary: response.data.data?.summary || null,
      skills: response.data.data?.skills?.map(skill => skill.name) || [],
      education: response.data.data?.education?.map(edu => ({
        degree: edu.accreditation?.education || null,
        institution: edu.organization || null,
        dates: {
          start: edu.dates?.startDate || null,
          end: edu.dates?.completionDate || null
        }
      })) || [],
      experience: response.data.data?.workExperience?.map(exp => ({
        title: exp.jobTitle || null,
        company: exp.organization || null,
        dates: {
          start: exp.dates?.startDate || null,
          end: exp.dates?.endDate || null
        },
        description: exp.jobDescription || null
      })) || [],
      totalYearsExperience: response.data.data?.totalYearsExperience || 0,
      languages: response.data.data?.languages || [],
      certifications: response.data.data?.certifications || [],
      rawData: response.data.data // Full parsed data
    };

    res.status(200).json({
      success: true,
      message: 'Resume parsed successfully',
      data: parsedData
    });
  } catch (error) {
    console.error('Error parsing resume:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
      error: error.response?.data || error.message
    });
  }
};

/**
 * Test API connection
 */
exports.testApiConnection = async (req, res) => {
  try {
    if (!AFFINDA_API_KEY) {
      return res.status(400).json({
        success: false,
        message: 'AFFINDA_API_KEY not configured in .env file'
      });
    }

    // Test with a simple API call to get workspaces
    const response = await axios.get(
      `${AFFINDA_BASE_URL}/workspaces`,
      {
        headers: {
          'Authorization': `Bearer ${AFFINDA_API_KEY}`
        }
      }
    );

    res.status(200).json({
      success: true,
      message: 'Affinda API connection successful',
      apiKey: `${AFFINDA_API_KEY.substring(0, 15)}...`,
      workspaces: response.data.results?.map(w => ({ 
        identifier: w.identifier, 
        name: w.name 
      })) || [],
      rawResponse: response.data
    });
  } catch (error) {
    console.error('API connection error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to connect to Affinda API',
      error: error.response?.data || error.message,
      statusCode: error.response?.status,
      apiKey: AFFINDA_API_KEY ? `${AFFINDA_API_KEY.substring(0, 15)}... (${AFFINDA_API_KEY.length} chars)` : 'Not configured',
      url: `${AFFINDA_BASE_URL}/workspaces`
    });
  }
};
