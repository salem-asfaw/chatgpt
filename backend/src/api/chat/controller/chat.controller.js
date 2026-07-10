import {
  createConversationService,
  getConversationsService,
} from "../service/chat.service.js";
// // Gemini client

export async function createConversationController(req, res) {
  try {
    const { question } = req.body;
    const result = await createConversationService(question);
    res.status(201).json({
      success: true,
      message: "converstion posted successfully",
      data: result,
    });
  } catch (error) {
    throw error;
  }
}
export async function getConversationController(req, res) {
  try {
    // const { question } = req.body;
    const result = await getConversationsService(100);
    res.status(200).json({
      success: true,
      message: "converstion posted successfully",
      data: result,
    });
  } catch (error) {
    throw error;
  }
}