
import { compareTwoStrings } from "string-similarity";
import Blog from "../models/Blog.js";

const checkPlagiarism = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Content is required" });
    }

    const blogs = await Blog.find({}, "title description _id");

    if (blogs.length === 0) {
      return res.status(200).json({
        isPlagiarized: false,
        score: 0,
        matches: [],
        message: "No existing blogs to compare against.",
      });
    }

    const results = [];

    blogs.forEach((blog) => {
        const similarity = compareTwoStrings(
        content.toLowerCase(),
        blog.description.toLowerCase()
      );
      const percentage = Math.round(similarity * 100);
      if (percentage > 20) {
        results.push({
          blogId: blog._id,
          title: blog.title,
          similarityScore: percentage,
        });
      }
    });

    results.sort((a, b) => b.similarityScore - a.similarityScore);
    const highestScore = results.length > 0 ? results[0].similarityScore : 0;

    return res.status(200).json({
      isPlagiarized: highestScore >= 50,
      score: highestScore,
      matches: results,
      message:
        highestScore >= 50
          ? "⚠️ Plagiarism detected!"
          : highestScore > 20
          ? "Some similarity found but below threshold."
          : "✅ Content appears to be original.",
    });
  } catch (error) {
    console.error("Plagiarism check error:", error);
    res.status(500).json({ message: "Server error during plagiarism check" });
  }
};

export { checkPlagiarism };