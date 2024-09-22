import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const ErrorMessages = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <div>
      <Text color="red" as="p">
        {children}
      </Text>
    </div>
  );
};

export default ErrorMessages;
