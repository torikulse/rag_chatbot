import { deleteDocuments, similaritySearch, splitter } from "./ab";
import { geminiModel } from "./aiModel";
// GET request
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt");
  if (!prompt) {
    return Response.json({ message: "Please Enter prompt" });
  }

  const similarData = await similaritySearch(prompt);
  console.log(similarData);
  
  const response = await geminiModel(prompt, similarData);

  return Response.json({ answer: response.choices[0].message.content });
}

// POST request
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source");

  const body = await request.json();
  const { text_content } = body;

  if (!source || !text_content) {
    return Response.json({ message: "Source and text_content is required!" });
  }

  const response = await splitter(text_content, source);
  return Response.json({
    message: "uploaded successfully",
    documentIDs: response,
  });
}

// DELETE request
export async function DELETE() {
  const response = await deleteDocuments([""]);

  return Response.json({ output: response });
}
