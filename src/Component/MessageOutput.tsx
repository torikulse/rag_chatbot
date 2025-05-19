import type { MessageOutput } from "@/app/aqkel-text-bot/types/types";

export default function MessageOutput({ item }: { item: MessageOutput }) {
  return (
    <>
      <div className="self-end bg-gray-200 px-3 py-1 rounded max-w-11/12">
        {item.userPrompt}
      </div>
      <div className="self-start ">{item.aiAnswer}</div>
    </>
  );
}
