import Link from "next/link";
import React from "react";
import { Button } from "@radix-ui/themes";

const IssuesPage = () => {
  return (
    <div>
      <Link href="/">
        <Button variant="classic">Edit profile</Button>{" "}
      </Link>
    </div>
  );
};

export default IssuesPage;
