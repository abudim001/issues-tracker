// This Link component is made to make any link uses radix ui Theme that is declared in the layout of this project.
// Theme of the entire project can be changed using ThemePanel in the Layout of this project.

import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
  href: string;
  children: string;
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
