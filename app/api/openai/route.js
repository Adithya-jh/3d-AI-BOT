import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
  const { userText } = await request.json();

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: userText }],
  });

  const aiMessage = completion.data.choices[0].message;

  console.log(aiMessage?.content);
  return new Response({ message: aiMessage?.content }, { status: 200 });
}
