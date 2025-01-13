import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Props {
  count: number ;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginationRounded({ count, page, onChange }: Props) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
