interface IconeSidebarProps {
  icone: string;
}

export default function IconeSidebar({ icone }: IconeSidebarProps) {
  return (
    <div className="w-8 xl:w-16 h-8 xl:h-16 rounded-lg bg-white inline-flex items-center justify-center">
      <img src={icone} alt="icone" className="w-5 h-5 xl:w-9 xl:h-9" />
    </div>
  );
}
