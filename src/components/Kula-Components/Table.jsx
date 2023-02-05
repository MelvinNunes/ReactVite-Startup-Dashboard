import { Table } from "@mantine/core";

export function TableData({ ths, rows }) {
  return (
    <Table withBorder>
      {/* {...rows} */}
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
