import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "../_components/DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

import { auth } from "@/auth"; // Import the auth function to check for the session
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const FetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await FetchUser(parseInt(params.id));

  if (!issue) notFound(); // If the issue is not found, trigger a 404 response

  const session = await auth(); // Check for an active session

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Flex direction="column" gap="4">
        {/* <EditIssueButton issueId={issue.id} /> */}
        {session ? ( // Conditionally render the buttons based on the session
          <>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </>
        ) : (
          <div>You must be logged in to edit or delete this issue.</div> // Optional message for unauthenticated users
        )}
      </Flex>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await FetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailsPage;
