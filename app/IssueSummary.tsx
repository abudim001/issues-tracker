import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
    { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.value} size="4">
          <Flex gap="2" direction="column">
            <Link
              className="text-sm font-medium"
              href={`./issues/list?status=${container.status}`}
            >
              {container.label}{" "}
            </Link>
            <Text align="center" size="6" className="font-medium">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
