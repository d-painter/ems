import { useIsFetching } from "@tanstack/react-query";

export default function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();

  return isFetching ? (
    <div>Queries are fetching in the background...</div>
  ) : <p>not fetching</p>;
}
