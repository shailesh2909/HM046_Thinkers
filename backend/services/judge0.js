const axios = require('axios');

const executeCode = async (sourceCode, languageId, stdin) => {
  // Mapping Judge0 IDs to Piston Names
  const langMap = {
    71: { name: "python", version: "3.10.0" },
    62: { name: "java", version: "15.0.2" },
    54: { name: "cpp", version: "10.2.0" },
    63: { name: "javascript", version: "18.15.0" }
  };

  const selectedLang = langMap[languageId] || { name: "python", version: "3.10.0" };

  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: selectedLang.name,
      version: selectedLang.version,
      files: [{ content: sourceCode }],
      stdin: stdin || ""
    });

    const run = response.data.run;

    // Piston doesn't give exact memory, so we provide defaults or estimates
    return {
      stdout: run.stdout,
      stderr: run.stderr,
      // Piston provides time in the 'run' object, usually in milliseconds or as a string
      // We convert it to a double precision number for your DB
      executionTime: run.time || 0.0, 
      memoryUsed: 0, // Piston Public API does not provide memory usage
      language: selectedLang.name,
      status: run.code === 0 ? "Accepted" : "Runtime Error"
    };
  } catch (error) {
    console.error("Piston API Error:", error.response?.data || error.message);
    throw new Error("Execution Failed");
  }
};

module.exports = { executeCode };