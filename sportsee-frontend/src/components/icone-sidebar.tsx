interface IconeSidebarProps {
  icone: string;
}

export default function IconeSidebar({ icone }: IconeSidebarProps) {
  return (
    <div className="w-16 h-16 rounded-lg bg-white inline-flex items-center justify-center">
      <img src={icone} alt="icone" className="w-9 h-9" />
    </div>
  );
}
