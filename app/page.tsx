import { Flex, Grid } from "@radix-ui/themes";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

export default async function Home() {
  const Open = await prisma.issue.count({ where: { status: "OPEN" } });
  const Closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const InProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Grid gap="5" columns={{ initial: "1", md: "2" }}>
      <Flex gap="5" direction="column">
        <IssueSummary open={Open} closed={Closed} inProgress={InProgress} />
        <IssueChart open={Open} closed={Closed} inProgress={InProgress} />
      </Flex>
      <LatestIssue />
    </Grid>
    // <div>test</div>
  );
}
