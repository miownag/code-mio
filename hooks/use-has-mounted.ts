import { useSyncExternalStore } from "react";

function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default useHasMounted;
