export async function POST(req: Request) {
  const { q } = await req.json();

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
                text: q,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await fetchData.json();
  return Response.json(data);
}
