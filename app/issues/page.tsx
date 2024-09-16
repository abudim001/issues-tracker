import Link from "next/link";
import React from "react";
import { Button } from "@radix-ui/themes";

const IssuesPage = () => {
  return (
    <div>
      <Link href="/">
        <Button>New Issue</Button>{" "}
      </Link>
    </div>
  );
};

export default IssuesPage;
