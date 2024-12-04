export default function DailyActivity({ text }: { text: string }) {
  return (
    <article className="min-w-[835px] w-full h-[320px] bg-gray-100 flex items-center justify-center">
      <p className="font-semibold text-3xl">{text}</p>
    </article>
  );
}
