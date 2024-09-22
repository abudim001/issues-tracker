import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statuesMap: Record<
  Status,
  { label: String; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <div>
      <Badge color={statuesMap[status].color}>{statuesMap[status].label}</Badge>
    </div>
  );
};

export default IssueStatusBadge;
