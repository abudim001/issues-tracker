"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="Adem">Adem Hussen</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
