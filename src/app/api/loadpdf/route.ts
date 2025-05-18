import { NomicEmbeddings } from "@langchain/nomic";
import { docs, textSpliter } from "./textSpliter";
import { Chroma } from "@langchain/community/vectorstores/chroma";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let query = searchParams.get("query");
  if (!query) {
    query = "";
  }
  // const allSplits = await textSpliter("public/pdf/cow.pdf");

  const nomicEmbeddings = new NomicEmbeddings({
    apiKey: process.env.NOMIC_API_KEY,
    modelName: "nomic-embed-text-v1.5",
  });

  const vectorStore = new Chroma(nomicEmbeddings, {
    collectionName: "loadpdf",
    url: "http://localhost:8001",
    collectionMetadata: {
      "hnsw:space": "cosine",
    },
  });

  // const response = await vectorStore.addDocuments(docs);
  const result1 = await vectorStore.similaritySearchWithScore(query);

  return Response.json({ output: result1 });
}
