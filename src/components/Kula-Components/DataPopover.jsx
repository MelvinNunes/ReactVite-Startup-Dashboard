import { Popover, Text, Button } from "@mantine/core";

export default function DataPopover({ opener, content }) {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>{opener}</Popover.Target>
      <Popover.Dropdown>{content}</Popover.Dropdown>
    </Popover>
  );
}
