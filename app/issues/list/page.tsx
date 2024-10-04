import Pagination from "@/app/Components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueTable, { columnNames, IssueQuery } from "../_components/IssueTable";
import IssuesToolBar from "./IssuesToolBar";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesSize = await prisma.issue.count({ where });

  // await delay(4000);
  return (
    <Flex gap="3" direction="column">
      <IssuesToolBar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="center">
        <Pagination
          currentPage={page}
          pageSize={pageSize}
          itemCount={issuesSize}
        />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";
// export const recalidate = 0;

export default IssuesPage;
