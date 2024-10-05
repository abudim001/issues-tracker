import { Flex } from "@radix-ui/themes";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const Open = await prisma.issue.count({ where: { status: "OPEN" } });
  const Closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const InProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    // <LatestIssue />
    <IssueSummary open={Open} closed={Closed} inProgress={InProgress} />
  );
}
