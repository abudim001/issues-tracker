"use client";

import { Button } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiFillBug } from "react-icons/ai";
import { CiDark } from "react-icons/ci";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];
const NavBar = () => {
  const currentPath = usePathname();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6 flex-grow">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              "text-violet-400": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
      <Button className="space-x-20" onClick={toggleDarkMode}>
        <CiDark />
      </Button>
    </nav>
  );
};

export default NavBar;
