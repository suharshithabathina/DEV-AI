import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI client if API key is present
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn('[Backend] WARNING: GEMINI_API_KEY is missing or set to placeholder. Running in MOCK mode.');
}

// 1. Controller to optimize and analyze source code
export const optimizeCode = async (req: Request, res: Response) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'code string is required' });
    }

    const targetLanguage = language || 'typescript';

    // Fallback if running in Mock Mode
    if (!ai) {
      console.log('[Backend] GEMINI_API_KEY not set. Returning mock optimization reports.');
      
      const mockRefactoredCode = targetLanguage === 'typescript' || targetLanguage === 'javascript' 
        ? `// Optimized clean version with proper error boundaries & runtime safety
export async function fetchUserData(userId: string) {
  if (!userId) {
    throw new Error("Invalid User ID argument provided.");
  }
  
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error(\`Network response failed with status: \${response.status}\`);
    }
    const data = await response.json();
    return {
      id: data.id,
      name: data.name ?? "Anonymous User",
      email: data.email,
      syncedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("[User API Error]:", error);
    throw error;
  }
}`
        : `// Optimized version
def fetch_user_data(user_id):
    if not user_id:
        raise ValueError("Invalid user_id provided")
    try:
        response = requests.get(f"/api/users/{user_id}")
        response.raise_for_status()
        data = response.json()
        return {
            "id": data.get("id"),
            "name": data.get("name", "Anonymous User"),
            "email": data.get("email"),
            "synced_at": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"User API error: {e}")
        raise e
`;

      return res.status(200).json({
        mocked: true,
        score: 85,
        metrics: {
          syntax: "Clean (No warnings found)",
          performance: "Reduced execution latency by caching HTTP requests",
          security: "Validated user parameter boundaries"
        },
        bugs: [
          {
            title: "Unhandled Promise Rejection",
            description: "Direct async execution inside inline function is prone to uncaught errors.",
            severity: "HIGH"
          },
          {
            title: "Missing Parameter Validation",
            description: "No validation for empty userId boundaries.",
            severity: "MEDIUM"
          }
        ],
        refactored: mockRefactoredCode
      });
    }

    const optimizationSchema = {
      type: "OBJECT",
      properties: {
        score: { type: "INTEGER" },
        metrics: {
          type: "OBJECT",
          properties: {
            syntax: { type: "STRING" },
            performance: { type: "STRING" },
            security: { type: "STRING" }
          },
          required: ["syntax", "performance", "security"]
        },
        bugs: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              description: { type: "STRING" },
              severity: { type: "STRING", enum: ["LOW", "MEDIUM", "HIGH"] }
            },
            required: ["title", "description", "severity"]
          }
        },
        refactored: { type: "STRING" }
      },
      required: ["score", "metrics", "bugs", "refactored"]
    };

    const prompt = `You are an elite staff software engineer and code reviewer. Analyze the following ${targetLanguage} code block for bugs, safety vulnerabilities, performance bottlenecks, and style issues.
    
    Code to analyze:
    \`\`\`${targetLanguage}
    ${code}
    \`\`\`
    
    Return:
    1. Overall score from 0 to 100 representing code health and safety.
    2. Short summary metric messages for: syntax layout, performance speed, and security concerns.
    3. An array of found bugs containing: a descriptive title, deep warning details, and severity ("LOW", "MEDIUM", or "HIGH").
    4. A fully refactored, robust, clean, and optimized version of the code that resolves the issues.
    
    Ensure your reply is valid JSON matching the schema strictly.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: optimizationSchema,
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Received empty response from Gemini API');
    }

    const parsedData = JSON.parse(responseText);
    res.status(200).json(parsedData);
  } catch (error: any) {
    console.error('[Backend] Error in code optimizer:', error);
    res.status(500).json({ error: error.message || 'Error occurred while optimizing code' });
  }
};

// 2. Controller to chat with DevAI assistant mascot
export const chatWithAssistant = async (req: Request, res: Response) => {
  try {
    const { history } = req.body;

    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: 'history array is required' });
    }

    // Fallback if no AI client is initialized
    if (!ai) {
      console.log('[Backend] GEMINI_API_KEY not set. Returning mock assistant reply.');
      const lastMessage = history[history.length - 1]?.parts?.[0]?.text?.toLowerCase() || '';
      let reply = "I am DevAI, your developer productivity partner! I can help you review code, mock-interview, write clean functions, or set learning milestones.";

      if (lastMessage.includes('optimize') || lastMessage.includes('bug') || lastMessage.includes('slow')) {
        reply = "I recommend uploading your code to our Code Optimizer! I can trace variable declarations, find race conditions, check memory safety, and suggest standard clean structural code blocks.";
      } else if (lastMessage.includes('resume') || lastMessage.includes('career') || lastMessage.includes('job')) {
        reply = "To level up your career, we can try review cards! Let's optimize your resume keywords for technical roles, or perform a mock system design interview. What role are you preparing for?";
      } else if (lastMessage.includes('hello') || lastMessage.includes('hi')) {
        reply = "Hello! 🌟 I'm DevAI, your AI engineering partner. How is your sprint going today? Ready to review some code or run some practice quizzes?";
      } else if (lastMessage.includes('quiz') || lastMessage.includes('learn') || lastMessage.includes('challenge')) {
        reply = "Ready for a knowledge check? Try our quiz portal under the Learn tab. We have Beginner, Intermediate, and Advanced coding puzzles to keep your skills sharp!";
      }

      return res.status(200).json({ text: reply });
    }

    const systemInstruction = `You are DevAI, an expert AI developer productivity partner and coding assistant.
    Your goals are:
    1. Help developers write clean, maintainable, secure, and highly optimized code.
    2. Give helpful career progression advice, system design tips, and software architecture suggestions.
    3. Encourage developers to maintain healthy coding habits, take breaks, and learn daily algorithms or patterns.
    4. Keep your tone futuristic, friendly, tech-savvy, and encouraging. Use Geist/markdown-style code formatting when writing code snippets.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: history,
      config: {
        systemInstruction,
      }
    });

    res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error('[Backend] Error in AI Chat:', error);
    res.status(500).json({ error: error.message || 'Error occurred during AI chat' });
  }
};

// 3. Controller to dynamically generate 10 questions for a specific topic
export const generateQuiz = async (req: Request, res: Response) => {
  try {
    const { topic } = req.body;
    const targetTopic = topic || 'General Software Engineering';

    const mockQuizFallback = (t: string) => ({
      questions: Array.from({ length: 10 }, (_, i) => ({
        question: `Sandbox Practice: Question ${i + 1} regarding '${t}' - Which of the following statements is correct?`,
        options: [
          `Implementing standard architecture components handles ${t} operations.`,
          `Enabling proper security and lifecycle checks is standard in ${t}.`,
          `Writing decoupled units reduces optimization blockages for ${t}.`,
          `All of the above statements represent solid engineering practices.`
        ],
        correctAnswer: 3,
        explanation: `Under standard engineering design patterns, components for ${t} should implement robust architecture, proper lifecycle checks, and decoupling for clean execution.`
      }))
    });

    if (!ai) {
      console.log(`[Backend] GEMINI_API_KEY not set. Generating offline sandbox mock quiz on: ${targetTopic}`);
      return res.status(200).json(mockQuizFallback(targetTopic));
    }

    const quizSchema = {
      type: "OBJECT",
      properties: {
        questions: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              question: { type: "STRING" },
              options: {
                type: "ARRAY",
                items: { type: "STRING" }
              },
              correctAnswer: { type: "INTEGER" },
              explanation: { type: "STRING" }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      },
      required: ["questions"]
    };

    const prompt = `You are a technical interviewer and software engineering coach. 
    Generate exactly 10 challenging multiple-choice questions on the topic: "${targetTopic}".
    Ensure each question has exactly 4 options, a 0-indexed correctAnswer (0 to 3), and a detailed explanation explaining why that answer is correct.
    Ensure your response is valid JSON matching the schema strictly.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: quizSchema,
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Received empty response from Gemini API');
      }

      const parsedData = JSON.parse(responseText);
      res.status(200).json(parsedData);
    } catch (apiError: any) {
      console.warn(`[Backend] Gemini API call failed for quiz generation (${apiError.message}). Falling back to sandbox mock quiz.`);
      res.status(200).json(mockQuizFallback(targetTopic));
    }
  } catch (error: any) {
    console.error('[Backend] Error in quiz generation:', error);
    res.status(500).json({ error: error.message || 'Error occurred while generating quiz' });
  }
};
