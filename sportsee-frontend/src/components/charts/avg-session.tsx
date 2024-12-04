export default function AvgSession({ text }: { text: string }) {
  return (
    <article className="aspect-square w-64 h-64 bg-gray-100 flex items-center justify-center rounded-lg">
      <p className="tetx-xl">{text}</p>
    </article>
  );
}
