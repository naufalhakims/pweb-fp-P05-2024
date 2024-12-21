import FeedbackController from "@/controllers/feedback.controller";
import { Router } from "express";

// Membuat router baru untuk feedback
const router: Router = Router();

// Mendapatkan semua feedback
router.get("/", FeedbackController.getFeedbacks);

// Mendapatkan feedback berdasarkan ID
router.get("/:id", FeedbackController.getFeedbackById);

// Menambahkan feedback baru
router.post("/", FeedbackController.addFeedback);

// Memperbarui feedback berdasarkan ID
router.patch("/:id", FeedbackController.modifyFeedback);

// Menghapus feedback berdasarkan ID
router.delete("/:id", FeedbackController.deleteFeedback);

// Export router untuk digunakan di file server
export default router;