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

  const results1 = await vectorStore.similaritySearchWithScore(
    similaritySearch,
    3
  );

  const documents = [
    new Document({
      pageContent: `"Mike and Morris lived in the same village. While Morris owned the largest jewelry shop in the village, Mike was a poor farmer. Both had large families with many sons, daughters-in-law and grandchildren. One fine day, Mike, tired of not being able to feed his family, decided to leave the village and move to the city where he was certain to earn enough to feed everyone. Along with his family, he left the village for the city. At night, they stopped under a large tree. There was a stream running nearby where they could freshen up themselves. He told his sons to clear the area below the tree, he told his wife to fetch water and he instructed his daughters-in-law to make up the fire and started cutting wood from the tree himself. They didn't know that in the branches of the tree, there was a thief hiding. He watched as Mike's family worked together and also noticed that they had nothing to cook. Mike's wife also thought the same and asked her husband "Everything is ready but what shall we eat?". Mike raised his hands to heaven and said " Don't worry. He is watching all of this from above. He will help us." The thief got worried as he had seen that the family was large and worked well together. Taking advantage of the fact that they did not know he was hiding in the branches, he decided to make a quick escape. He climbed down safely when they were not looking and ran for his life. But, he left behind the bundle of stolen jewels and money which dropped into Mike's lap. Mike opened it and jumped with joy when he saw the contents. The family gathered all their belongings and returned to the village. There was great excitement when they told everyone how they got rich. Morris thought that the tree was miraculous and this was a nice and quick way to earn some money. He ordered his family to pack some clothes and they set off as if on a journey. They also stopped under the same tree and Morris started commanding everyone as Mike had done. But no one in his family was willing to obey his orders. Being a rich family, they were used to having servants all around. So, the one who went to the river to fetch water enjoyed a nice bath. The one who went to get wood for fire went off to sleep. Morris's wife said " Everything is ready but what shall we eat ?" Morris raised his hands and said, " Don't worry. He is watching all of this from above. He will help us." As soon as he finished saying, the thief jumped down from the tree with a knife in hand. Seeing him, everyone started running around to save their lives. The thief stole everything they had and Morris and his family had to return to the village empty handed, having lost all their valuables that they had taken with them.   "`,
      metadata: { source: "aa" },
    }),
  ];

  // const response = await vectorStore.addDocuments(documents);

  return Response.json({ output: results1 });
}
