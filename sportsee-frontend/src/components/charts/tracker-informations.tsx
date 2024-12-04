export default function TrackerInformations({ text }: { text: string }) {
  return (
    <article className="min-w-64 h-32 bg-gray-100 flex items-center justify-center rounded-lg">
      <p>{text}</p>
    </article>
  );
}
