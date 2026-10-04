const GITHUB_USERNAME = 'Shairazahmad';

export const GITHUB_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Assembly: '#6E4C13',
  HTML: '#e34c26',
  CSS: '#563d7c',
  C: '#555555',
  'C++': '#f34b7d',
  Dart: '#00B4AB',
};

export const fetchGithubProjects = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) throw new Error(`GitHub API HTTP error! status: ${response.status}`);

    const repos = await response.json();

    return repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        _id: repo.id.toString(),
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
        description: repo.description || 'No description provided.',
        images: [
          `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
        ],
        githubLink: repo.html_url,
        liveLink: repo.homepage || repo.html_url,
        language: repo.language,
        topics: repo.topics || [],
        featured: repo.stargazers_count > 0 || repo.topics?.includes('featured'),
      }));
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
};

export const fetchLanguageSummary = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
    );

    if (!response.ok) throw new Error(`GitHub API HTTP error! status: ${response.status}`);

    const repos = await response.json();
    const languageTotals = {};
    let totalBytes = 0;

    // Fetch detailed byte breakdown for every repo to include HTML, CSS, etc.
    const langPromises = repos
      .filter((repo) => !repo.fork)
      .map(async (repo) => {
        try {
          const res = await fetch(repo.languages_url);
          if (res.ok) {
            const languages = await res.json();
            Object.entries(languages).forEach(([lang, bytes]) => {
              languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
              totalBytes += bytes;
            });
          }
        } catch (e) {
          console.error(`Failed fetching languages for ${repo.name}:`, e);
        }
      });

    await Promise.all(langPromises);

    if (totalBytes === 0) {
      return { data: { languages: [] } };
    }

    const languagesArray = Object.entries(languageTotals)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Number(((bytes / totalBytes) * 100).toFixed(1)),
        color: GITHUB_COLORS[name] || '#94a3b8',
      }))
      .filter((lang) => lang.percentage > 0)
      .sort((a, b) => b.bytes - a.bytes);

    return { data: { languages: languagesArray } };
  } catch (error) {
    console.error('Error fetching language summary:', error);
    return { data: { languages: [] } };
  }
};