const axios = require('axios');

/**
 * Extracts "owner" and "repo" from a GitHub URL.
 * Example: "https://github.com/octocat/Hello-World" -> { owner: "octocat", repo: "Hello-World" }
 */
const parseGithubUrl = (url) => {
  try {
    const cleanedUrl = url.trim().replace(/\.git$/, '');
    const urlObj = new URL(cleanedUrl);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);

    if (pathParts.length < 2) {
      return null;
    }

    return {
      owner: pathParts[0],
      repo: pathParts[1],
    };
  } catch (error) {
    return null;
  }
};

/**
 * Fetches language byte distribution for a specific GitHub repository.
 * Returns an object with language byte counts e.g., { JavaScript: 45000, CSS: 12000 }
 */
const fetchRepoLanguages = async (githubUrl) => {
  const repoData = parseGithubUrl(githubUrl);

  if (!repoData) {
    console.warn(`Invalid GitHub URL provided: ${githubUrl}`);
    return {};
  }

  const { owner, repo } = repoData;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/languages`;

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App',
  };

  // Attach token if provided in .env to prevent rate-limiting (60/hr -> 5000/hr)
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await axios.get(apiUrl, { headers });
    return response.data || {};
  } catch (error) {
    console.error(
      `Failed to fetch languages for ${owner}/${repo}:`,
      error.response?.data?.message || error.message
    );
    // Return empty object on error so project save/update doesn't crash completely
    return {};
  }
};

module.exports = {
  fetchRepoLanguages,
};