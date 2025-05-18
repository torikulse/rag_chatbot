import { deleteDocuments, similaritySearch, splitter } from "./ab";
// GET request
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt");
  if (!prompt) {
    return Response.json({ message: "Please Enter prompt" });
  }
  const response = await similaritySearch(prompt);
  return Response.json({ output: response });
}

// POST request
export async function POST(request: Request) {
  const body = await request.json();
  const { text_content } = body;
  if (!text_content) {
    return Response.json({ message: "text content is required!" });
  }
  const response = await splitter(text_content);
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
