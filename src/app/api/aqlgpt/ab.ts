import { NomicEmbeddings } from "@langchain/nomic";
import { Document } from "@langchain/core/documents";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const splitterr = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 80,
});
const embeddings = new NomicEmbeddings({
  apiKey: process.env.NOMIC_API_KEY,
  modelName: "nomic-embed-text-v1.5",
});

const vectorStore = new Chroma(embeddings, {
  url: "http://localhost:8001",
  collectionName: "aqlgpt",
});

export async function splitter(text_content: string) {
  const allSplit = await splitterr.splitText(text_content);

  const documents = allSplit.map((item) => {
    const doc = new Document({
      pageContent: item,
      metadata: { source: "text" },
    });
    return doc;
  });
  const response = await vectorStore.addDocuments(documents);
  return response;
}

export async function similaritySearch(propmt: string) {
  const response = await vectorStore.similaritySearch(propmt, 2);
  return response;
}

export async function deleteDocuments(ids: string[]) {
  const response = await vectorStore.delete({ ids: ids });
  return response;
}
