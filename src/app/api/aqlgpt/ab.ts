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

export async function splitter(text_content: string, source: string) {
  const allSplit = await splitterr.splitText(text_content);

  const documents = allSplit.map((item) => {
    const doc = new Document({
      pageContent: item,
      metadata: { source: source },
    });
    return doc;
  });
  const response = await vectorStore.addDocuments(documents);
  return response;
}

export async function similaritySearch(propmt: string) {
  const similarData = await vectorStore.similaritySearch(propmt, 1);
  const response = similarData.map((item) => {
    return item.pageContent;
  });
  return response;
}

export async function deleteDocuments(ids: string[]) {
  const response = await vectorStore.delete({ ids: ids });
  return response;
}
