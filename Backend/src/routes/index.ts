import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller';
import { optimizeCode, chatWithAssistant, generateQuiz } from '../controllers/ai.controller';
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'DevAI Backend is healthy' });
});

// Authentication endpoints
router.post('/auth/signup', registerUser);
router.post('/auth/login', loginUser);

// Profile endpoints
router.get('/profiles/:id', getProfile);
router.put('/profiles/:id', updateProfile);

// AI workflow endpoints
router.post('/ai/optimize', optimizeCode);
router.post('/ai/chat', chatWithAssistant);
router.post('/ai/quiz', generateQuiz);

export default router;
