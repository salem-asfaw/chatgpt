import {
  createConversationService,
  getConversationsService,
} from "../service/chat.service.js";


export async function createConversationController(req, res) {
  try {
    const { question } = req.body;

    const result = await createConversationService(question);

    res.status(201).json({
      success: true,
      message: "conversation posted successfully",
      data: result,
    });

  } catch (error) {
    console.error("Create conversation error:", error);

    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}


export async function getConversationController(req, res) {
  try {
    const result = await getConversationsService(100);

    res.status(200).json({
      success: true,
      message: "conversations fetched successfully",
      data: result,
    });

  } catch (error) {
    console.error("Get conversations error:", error);

    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}