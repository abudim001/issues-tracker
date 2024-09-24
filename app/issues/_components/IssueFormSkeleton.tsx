import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/Components/Skeleton";

const IssueFormSkeleton = () => {
  return (
    <div>
      <Box className="max-w-xl">
        <Skeleton height="2rem" />
        <Skeleton height="20rem" />
      </Box>
    </div>
  );
};

export default IssueFormSkeleton;
