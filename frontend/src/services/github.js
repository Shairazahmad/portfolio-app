// src/services/github.js
const GITHUB_USERNAME = "Shairazahmad";

export const fetchGithubProjects = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );
    if (!response.ok) throw new Error("Failed to fetch repositories");

    const repos = await response.json();

    // Filter out forks if you only want original projects
    const myRepos = repos.filter((repo) => !repo.fork);

    // Map GitHub repo data into your portfolio card format
    return myRepos.map((repo) => {
      // Determines image: uses repo website if set, otherwise falls back to a GitHub social preview image
      const previewImage = repo.homepage && repo.homepage.match(/\.(jpeg|jpg|gif|png|webp)$/i)
        ? repo.homepage
        : `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;

      return {
        id: repo.id,
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '), // Clean name (e.g. portfolio-app -> portfolio app)
        description: repo.description || "No description provided.",
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || repo.html_url,
        image: previewImage,
        language: repo.language,
        topics: repo.topics || [], // Useful for tags like 'web', 'app', 'react', etc.
        updatedAt: repo.updated_at,
        stars: repo.stargazers_count,
      };
    });
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
};