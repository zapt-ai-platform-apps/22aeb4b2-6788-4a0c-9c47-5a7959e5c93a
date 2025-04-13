import OpenAI from 'openai';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Received history generation request:', JSON.stringify(req.body));

  try {
    const { region, period, interests } = req.body;

    if (!region || !period || !interests || !interests.length) {
      return res.status(400).json({
        error: 'Missing required fields: region, period, and at least one interest are required'
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const interestsStr = interests.join(', ');
    
    const prompt = `Generate a comprehensive historical overview about ${region} during the ${period} period, 
focusing specifically on these areas: ${interestsStr}. 

For each area of interest, provide:
1. Key figures and their contributions
2. Major works, inventions, or movements
3. How they were influenced by the historical context
4. Their lasting impact

Structure the response with clear headings for each area of interest and provide a brief historical 
context section at the beginning to set the stage for the specific developments.

The response should be formatted in markdown with appropriate headings, lists, and paragraphs.`;

    console.log('Sending prompt to OpenAI:', prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          "role": "system", 
          "content": "You are a professional historian specializing in cultural and intellectual history. Provide accurate, detailed information about historical periods, focusing on cultural, artistic, scientific and intellectual achievements." 
        },
        { 
          "role": "user", 
          "content": prompt 
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0].message.content;
    console.log('Received response from OpenAI, length:', content.length);

    res.status(200).json({ content });
  } catch (error) {
    console.error('Error generating history:', error);
    Sentry.captureException(error);
    res.status(500).json({ 
      error: 'Failed to generate historical content',
      message: error.message
    });
  }
}