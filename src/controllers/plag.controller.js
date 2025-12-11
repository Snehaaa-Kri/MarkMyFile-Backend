import { analyzePlagiarism } from "../services/plagService.js";

export const checkPlag = async (req, res) => {
    try {
        const files = req.body.files;

        if (!files || !Array.isArray(files)) {
            return res.status(400).json({ message: "files[] required" });
        }

        const results = await analyzePlagiarism(files);

        return res.status(200).json({
            status: "success",
            data: results,
        });

    } catch (error) {
        console.error("Plagiarism error:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};
