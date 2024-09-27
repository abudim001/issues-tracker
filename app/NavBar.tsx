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
import { Skeleton } from "@/app/Components";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues/list" },
];
const NavBar = () => {
  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      {/* <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>

          <Flex gap="3" align="center">
            <ToggleDarkMode />
            <AuthStatus />
          </Flex>
        </Flex>
      </Container> */}

      {/* ----------------------------------------------------------------- */}
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href="/">
            <AiFillBug />
          </Link>
          <NavLinks />
        </Flex>

        <Flex gap="3" align="center">
          <ToggleDarkMode />
          <AuthStatus />
        </Flex>
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className="flex space-x-6 ">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-links": true,
              "!text-violet-400": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const ToggleDarkMode = () => {
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
    <div>
      <Button className="space-x-20" onClick={toggleDarkMode}>
        <CiDark />
      </Button>{" "}
    </div>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated") {
    return (
      <Link href="/api/auth/signin" className="nav-links">
        Sign In
      </Link>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>{session!.user?.email}</DropdownMenu.Label>
          <DropdownMenu.Item>
            {" "}
            <Link href="/api/auth/signout">Sign out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
