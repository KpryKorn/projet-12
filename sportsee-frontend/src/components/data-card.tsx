const DataCard = ({
  label,
  value,
  icone,
  bgColor,
}: {
  label: string;
  value: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icone: any;
  bgColor: string;
}) => (
  <article className="xl:min-w-[258px] h-[90px] xl:h-[124px] bg-gray-100 flex items-center justify-center rounded-lg gap-6">
    <div
      className={`w-14 h-14 rounded-lg ${bgColor} inline-flex items-center justify-center`}
    >
      <img src={icone} alt="icone" className="w-5 h-5" />
    </div>
    <div className="flex flex-col items-center justify-center">
      {label === "Calories" ? (
        <p className="text-lg font-bold text-gray-900">{value}kcal</p>
      ) : (
        <p className="text-lg font-bold text-gray-900">{value}g</p>
      )}
      <h3 className="text-sm text-gray-500">{label}</h3>
    </div>
  </article>
);

export default DataCard;
