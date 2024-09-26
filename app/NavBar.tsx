"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiFillBug } from "react-icons/ai";
import { CiDark } from "react-icons/ci";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues/list" },
];
const NavBar = () => {
  const currentPath = usePathname();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { status, data: session } = useSession();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            {" "}
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6 ">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-violet-400": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Flex gap="3" align="center">
            <Button className="space-x-20" onClick={toggleDarkMode}>
              <CiDark />
            </Button>{" "}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
                  <DropdownMenu.Item>
                    {" "}
                    <Link href="/api/auth/signout">Sign out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Sign In</Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
