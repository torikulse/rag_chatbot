export async function geminiModel(prompt: string, data: string[]) {
  const fetchData = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearar ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `here is your prompt: ${prompt}. You only answer from provided data in system propmt.`,
              },
            ],
          },
          {
            role: "system",
            content: [
              {
                type: "text",
                text: data,
              },
            ],
          },
        ],
      }),
    }
  );

  const response = await fetchData.json();
  return response;
}
