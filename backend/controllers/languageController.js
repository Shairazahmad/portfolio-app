const Project = require('../models/Project');

// @desc    Get aggregated language totals and percentage distribution
// @route   GET /api/languages/summary
// @access  Public
const getLanguageSummary = async (req, res) => {
  try {
    const projects = await Project.find({}, 'languages');

    const languageTotals = {};
    let totalBytesSum = 0;

    // Aggregate language bytes across all projects
    projects.forEach((project) => {
      if (project.languages) {
        // Convert Map or Object
        const langMap = project.languages instanceof Map 
          ? Object.fromEntries(project.languages) 
          : project.languages;

        for (const [lang, bytes] of Object.entries(langMap)) {
          languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
          totalBytesSum += bytes;
        }
      }
    });

    if (totalBytesSum === 0) {
      return res.json({ totalBytes: 0, languages: [] });
    }

    // Convert to percentage breakdown sorted from highest to lowest
    const languageBreakdown = Object.entries(languageTotals)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Number(((bytes / totalBytesSum) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.bytes - a.bytes);

    res.json({
      totalBytes: totalBytesSum,
      languages: languageBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getLanguageSummary };