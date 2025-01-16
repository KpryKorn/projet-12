import SportseeLogo from "../assets/logo.svg";

export default function Header() {
  const ROUTES = ["Accueil", "Profil", "Réglage", "Communauté"];
  return (
    <header className="p-4 xl:p-6 text-white bg-noir-sportsee text-2xl">
      <nav>
        <ul className="flex items-center justify-between w-full pr-12">
          <li>
            <img
              src={SportseeLogo}
              alt="Logo Sportsee"
              className="h-12 xl:h-16"
            />
          </li>
          {ROUTES.map((route, idx) => (
            <li key={idx} className="font-medium">
              <a
                href="#"
                className={
                  route === "Profil"
                    ? "text-rouge-sportsee underline underline-offset-8"
                    : ""
                }
              >
                {route}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
