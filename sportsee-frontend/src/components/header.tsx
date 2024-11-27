import SportseeLogo from "../assets/logo.svg";

export default function Header() {
  const ROUTES = ["Accueil", "Profil", "Réglage", "Communauté"];
  return (
    <header className="p-8 text-white bg-noir-sportsee text-2xl">
      <nav>
        <ul className="flex items-center justify-between w-full">
          <li>
            <img src={SportseeLogo} alt="Logo Sportsee" />
          </li>
          {ROUTES.map((route, idx) => (
            <li key={idx}>
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
