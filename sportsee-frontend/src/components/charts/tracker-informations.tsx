export default function TrackerInformations({ text }: { text: string }) {
  return (
    <article className="min-w-[258px] h-[124px] bg-gray-100 flex items-center justify-center rounded-lg">
      <p>{text}</p>
    </article>
  );
}
