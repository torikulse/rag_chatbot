export default function DisplayUerPrompt({ content }: { content: String }) {
  return (
    <div className="self-end bg-gray-200 px-3 py-1 rounded max-w-11/12">
      {content}
    </div>
  );
}
