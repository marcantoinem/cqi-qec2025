import { JSX, createSignal } from "solid-js"
import { locale, setLocale, t } from "../stores/locale"
import { A } from "@solidjs/router"
import PrefetchLink from "./PrefetchLink"
import closeMenuIcon from "../../assets/close.svg"
import menuIcon from "../../assets/menu.svg"

export default function NavHeader() {
    const [menuIsOpen, setMenuIsOpen] = createSignal(false);
    let hamburgerButton: HTMLButtonElement | undefined;
    let hamburgerMenu: HTMLDivElement | undefined;

    const links = () => {
        return [
            {
                to: "/about",
                file: "About",
                name: t("aboutPage.about"),
            },
            {
                to: "/competitions",
                file: "Competitions",
                name: t("competitionsPage.competitions"),
            },
            // {
            //     to: "/team",
            //     file: "Team",
            //     name: t("team"),
            // },
            // {
            //     to: "/partners",
            //     file: "Partners",
            //     name: t("partners"),
            // },
            // {
            //     to: "/documents",
            //     file: "Documents",
            //     name: t("documents"),
            // },
            // {
            //     to: "/login",
            //     file: "Login",
            //     name: t("login"),
            // },
        ]
    };

    const toggleLanguage = (): void => {
        if (locale() === "en") {
            localStorage.setItem("locale", "fr");
            setLocale("fr")
        } else {
            localStorage.setItem("locale", "en");
            setLocale("en")
        }
    }

    /**
     * Opens or closes the hamburger menu.
     */
    const toggleHamburgerMenu = (): void => {
        hamburgerButton?.classList.toggle("hidden");
        hamburgerMenu?.classList.toggle("hidden");

        setMenuIsOpen(!menuIsOpen);
    };

    const HamburgerMenu = (): JSX.Element => {
        return (
            <div ref={hamburgerMenu} class={menuIsOpen() ? "" : "hidden"}>
                <div class="absolute right-0 top-0 z-10 flex h-full w-full flex-col justify-center bg-light-primary bg-opacity-60 p-2 text-4xl font-bold backdrop-blur-xl dark:bg-dark-primary dark:bg-opacity-60">
                    <div class="flex items-center justify-between">
                        <button
                            onClick={toggleLanguage}
                            class="flex h-[48px] w-[48px] border-none bg-transparent"
                        >
                            {t("lang")}
                        </button>

                        <button
                            onClick={toggleHamburgerMenu}
                            class="flex self-end border-none bg-transparent"
                        >
                            <img
                                src={closeMenuIcon}
                                alt="close menu"
                                width="44px"
                                height="44px"
                            />
                        </button>
                    </div>

                    <ul class="flex grow flex-col justify-center gap-8">
                        {links().map((link) => {
                            return (
                                <li class="ml-4 flex h-fit w-fit">
                                    <PrefetchLink
                                        to={link.to}
                                        file={link.file}
                                        onClick={toggleHamburgerMenu}
                                    >
                                        {link.name}
                                    </PrefetchLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    }

    const StandardMenu = (): JSX.Element => {
        return (
            <ul class="hidden h-fit text-xl font-bold lg:flex">
                {links().map((link) => {
                    return (
                        <li class="ml-4 flex">
                            <PrefetchLink to={link.to} file={link.file}>
                                {link.name}
                            </PrefetchLink>
                        </li>
                    )
                })}

                <li class="ml-4 flex">
                    <button onClick={toggleLanguage} class="ml-4 flex border-none">
                        {t("lang")}
                    </button>
                </li>
            </ul>
        )
    }

    return (
        <header class="fixed top-0 flex w-full items-center justify-between p-4 backdrop-blur">
            <h1 class="text-3xl font-bold">
                <A href="/">{t("cqi") + " - 2025"}</A>
            </h1>

            <nav>
                <button
                    ref={hamburgerButton}
                    onClick={toggleHamburgerMenu}
                    class="lg:hidden"
                >
                    <img
                        src={menuIcon}
                        width="44px"
                        height="44px"
                        alt="open menu"
                    />
                </button>

                <HamburgerMenu />
                <StandardMenu />
            </nav>
        </header>
    )
}
