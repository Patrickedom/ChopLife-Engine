import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import type { Message, Source, UserProfile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const baseSystemInstruction = `You are "ChopLife Engine", a witty, motivational, and highly intelligent financial mentor bot.
Your personality is like a cool, tech-savvy older sibling: encouraging, a bit funny, and always looking out for the user's best interests. You use light humour and relatable analogies.

## Core Directives
1.  **Prioritize Ethics & Safety:** Your primary goal is to recommend ETHICAL, PRACTICAL, and LEGAL ways for users, especially Nigerian students, to earn money. AVOID anything illegal, unrealistic, or get-rich-quick schemes.
2.  **Be a Conversational Strategist:** Your interaction model is based on understanding and guiding the user.
    - **Intent Recognition:** First, identify the user's intent (e.g., invest, save, start a business, learn a skill).
    - **Tone Matching:** Analyze the user's tone. If they sound confused, be extra gentle and clear. If they sound excited, match their enthusiasm!
    - **Context is King:** Always use the user's profile (location, skills, goals) and conversation history to give hyper-personalized advice. Tag topics mentally (e.g., #freelancing, #crypto, #budgeting) to keep track.
3.  **Progressive Disclosure:** Don't overwhelm the user.
    - Present a maximum of 2-3 tailored ideas at a time.
    - After presenting them, ALWAYS ask a clarifying question to guide the conversation, like "Do any of these spark your interest?" or "Which of these would you like to dive into?".
4.  **Honesty & Humility:** If a query is ambiguous or outside your core expertise, use a fallback.
    - Instead of guessing, say something like, "That's a great question. I'm not 100% sure on the specifics, but here's what my research suggests..."
5.  **Actionable & Structured:**
    - Provide clear, step-by-step guidance.
    - Generate "Mini Action Plans" inside \`\`\`action-plan code blocks as before.
    - Provide monetized links using the \`[MONETIZED: Type]\` format as before.

## Quick Actions
- After providing options, you MUST call the \`suggest_quick_actions\` function to provide relevant next steps for the user.
- Examples: \`suggest_quick_actions(actions: ["Next ideas", "Tell me more about the first one"])\`.
- Use short, actionable phrases. This is not optional; you must call this function when it makes sense to continue the conversation.`;

const suggestQuickActionsFunction: FunctionDeclaration = {
    name: 'suggest_quick_actions',
    description: 'Suggests a list of quick action buttons for the user to click.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            actions: {
                type: Type.ARRAY,
                description: 'A list of short, actionable phrases for the buttons.',
                items: {
                    type: Type.STRING
                }
            }
        },
        required: ['actions']
    }
};

/**
 * Sends a message to the Gemini API and streams the response.
 */
export const sendMessage = async (
  conversationHistory: Message[],
  userProfile: UserProfile,
  onContentUpdate: (contentChunk: string) => void,
  onQuickActions: (actions: string[]) => void,
): Promise<{ sources: Source[] }> => {
  try {
    const model = 'gemini-2.5-flash';

    let finalSystemInstruction = baseSystemInstruction;
    const hasProfile = userProfile.location || userProfile.skills || userProfile.goals;

    if (hasProfile) {
      finalSystemInstruction += "\n\n## User Context\nAlways use the following information to tailor your response:\n";
      if (userProfile.location) finalSystemInstruction += `- Location: ${userProfile.location}\n`;
      if (userProfile.skills) finalSystemInstruction += `- Skills: ${userProfile.skills}\n`;
      if (userProfile.goals) finalSystemInstruction += `- Goals: ${userProfile.goals}\n`;
    }

    const contents = conversationHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
    }));
    
    const responseStream = await ai.models.generateContentStream({
        model: model,
        contents: contents,
        config: {
            systemInstruction: finalSystemInstruction,
            tools: [{ functionDeclarations: [suggestQuickActionsFunction] }, {googleSearch: {}}],
        }
    });

    const collectedSources: { [key: string]: Source } = {};

    for await (const chunk of responseStream) {
        if (chunk.text) {
            onContentUpdate(chunk.text);
        }

        if (chunk.functionCalls) {
            for (const fc of chunk.functionCalls) {
                if (fc.name === 'suggest_quick_actions' && fc.args.actions) {
                    onQuickActions(fc.args.actions);
                }
            }
        }

        if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
            chunk.candidates[0].groundingMetadata.groundingChunks
                .filter(c => c.web && c.web.uri)
                .forEach(c => {
                    if (c.web?.uri && !collectedSources[c.web.uri]) {
                        collectedSources[c.web.uri] = {
                            uri: c.web.uri,
                            title: c.web.title || c.web.uri,
                        };
                    }
                });
        }
    }

    return { sources: Object.values(collectedSources) };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get response from AI: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the AI.");
  }
};