"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  return (
    <Flex gap="3" align="center">
      <Text size="2">
        page {currentPage} of {pageCount}
      </Text>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
