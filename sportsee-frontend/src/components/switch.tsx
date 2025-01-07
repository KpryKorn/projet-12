interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

export default function Switch({ isOn, handleToggle }: SwitchProps) {
  return (
    <div
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
        isOn ? "bg-red-500" : "bg-gray-300"
      }`}
      onClick={handleToggle}
      style={{ backgroundColor: isOn ? "#000" : "#FF0101" }}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
          isOn ? "translate-x-6" : ""
        }`}
      ></div>
    </div>
  );
}
