import { Button, Flex } from "@radix-ui/themes";
import Pagination from "./Components/Pagination";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <Flex>
      <Pagination itemCount={100} pageSize={10} currentPage={10} />
    </Flex>
  );
}
