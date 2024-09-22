import { Skeleton } from "@/app/Components";
import { Box } from "@radix-ui/themes";

const NewIssuesLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default NewIssuesLoadingPage;
