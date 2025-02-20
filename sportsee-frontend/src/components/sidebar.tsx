import IconeSidebar from "./icone-sidebar";
import bicycleIcon from "../assets/bicycle.svg";
import liftingIcon from "../assets/lifting.svg";
import meditateIcon from "../assets/meditate.svg";
import swimIcon from "../assets/swim.svg";

export default function Sidebar() {
  return (
    <aside className="fixed bg-noir-sportsee w-16 xl:w-[117px] sidebar px-8 flex flex-col items-center justify-center border-black border">
      <div className="flex flex-col space-y-4 -mt-32">
        <IconeSidebar icone={meditateIcon} />
        <IconeSidebar icone={swimIcon} />
        <IconeSidebar icone={bicycleIcon} />
        <IconeSidebar icone={liftingIcon} />
      </div>

      <p className="mt-40 text-white -rotate-90 text-nowrap text-sm">
        Copyright, SportSee 2020
      </p>
    </aside>
  );
}
