import SubmissionModel from "../models/submission.model.js";
import AssignmentModel from "../models/assignment.model.js";
import StudentModel from "../models/student.model.js";
import FacultyModel from "../models/faculty.model.js";

const submissionController = {
    // Student submits an assignment
    createSubmission: async (req, res) => {
        try {
            const { assignmentId } = req.body;

            if (!assignmentId) {
                return res.status(400).json({ message: "Assignment ID is required" });
            }

            if (!req.file || !req.file.path) {
                return res.status(400).json({ message: "File is required" });
            }

            // Ensure student is logged in
            const student = await StudentModel.findOne({ userId: req.user._id });
            if (!student) {
                return res.status(403).json({ message: "Only students can submit assignments" });
            }

            // Ensure assignment exists
            const assignment = await AssignmentModel.findById(assignmentId);
            if (!assignment) {
                return res.status(404).json({ message: "Assignment not found" });
            }

            // Prevent multiple submissions (optional, can allow resubmissions)
            const existing = await SubmissionModel.findOne({ assignmentId, studentId: student._id });
            if (existing) {
                return res.status(400).json({ message: "You have already submitted this assignment" });
            }

            const submission = await SubmissionModel.create({
                assignmentId,
                studentId: student._id,
                filePath: req.file.path,
                plagiarismScore: null, // run later by external service
                grade: null,
                status: "submitted"
            });

            res.status(201).json({
                success: true,
                message: "Submission created successfully",
                data: submission
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Faculty reviews/grades a submission
    gradeSubmission: async (req, res) => {
        try {
            const { id } = req.params; // submissionId
            const { grade, status, feedback, rejectionReason } = req.body;

            const submission = await SubmissionModel.findById(id).populate("assignmentId");
            if (!submission) {
                return res.status(404).json({ message: "Submission not found" });
            }

            // Faculty ownership check
            const faculty = await FacultyModel.findOne({ userId: req.user._id });
            if (!faculty) {
                return res.status(403).json({ message: "Only faculty can grade submissions" });
            }

            if (submission.assignmentId.createdBy.toString() !== faculty._id.toString()) {
                return res.status(403).json({ message: "Unauthorized to grade this submission" });
            }

            submission.grade = grade ?? submission.grade;
            submission.status = status || submission.status;
            submission.feedback = feedback || submission.feedback;
            submission.rejectionReason = rejectionReason || submission.rejectionReason;

            await submission.save();

            res.status(200).json({
                success: true,
                message: "Submission graded successfully",
                data: submission
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all submissions for an assignment (faculty)
    getSubmissionsForAssignment: async (req, res) => {
        try {
            const { assignmentId } = req.params;

            const assignment = await AssignmentModel.findById(assignmentId);
            if (!assignment) {
                return res.status(404).json({ message: "Assignment not found" });
            }

            // Faculty ownership check
            const faculty = await FacultyModel.findOne({ userId: req.user._id });
            if (!faculty || assignment.createdBy.toString() !== faculty._id.toString()) {
                return res.status(403).json({ message: "Unauthorized to view submissions for this assignment" });
            }

            const submissions = await SubmissionModel.find({ assignmentId })
                .populate("studentId", "rollNumber batch branch");

            res.status(200).json({
                success: true,
                count: submissions.length,
                data: submissions
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get my submission (student)
    getMySubmission: async (req, res) => {
        try {
            const { assignmentId } = req.params;

            const student = await StudentModel.findOne({ userId: req.user._id });
            if (!student) {
                return res.status(403).json({ message: "Only students can view their submission" });
            }

            const submission = await SubmissionModel.findOne({ assignmentId, studentId: student._id });
            if (!submission) {
                return res.status(404).json({ message: "No submission found for this assignment" });
            }

            res.status(200).json({
                success: true,
                data: submission
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default submissionController;