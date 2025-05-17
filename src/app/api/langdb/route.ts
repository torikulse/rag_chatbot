import { Chroma } from "@langchain/community/vectorstores/chroma";
import { Document } from "@langchain/core/documents";
import { NomicEmbeddings } from "@langchain/nomic";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let similaritySearch = searchParams.get("similaritySearch");
  if (!similaritySearch) {
    similaritySearch = "";
  }

  const nomicEmbeddings = new NomicEmbeddings({
    apiKey: process.env.NOMIC_API_KEY,
    modelName: "nomic-embed-text-v1.5",
  });

  const vectorStore = new Chroma(nomicEmbeddings, {
    collectionName: "test1",
    url: "http://localhost:8001",
    collectionMetadata: {
      "hnsw:space": "cosine",
    },
  });

  const results1 = await vectorStore.similaritySearch(similaritySearch, 1);

  // const documents = [
  //   new Document({
  //     pageContent: "cow",
  //     metadata: { source: "kfasl" },
  //   }),
  // ];

  // const response = await vectorStore.addDocuments(documents);

  return Response.json({ output: results1 });
}
