"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useMetaStore } from "@/store/useMetaStore";
import { formatDateTimeLong } from "@/utils/Helpers";

export function useProjectHeader() {
  const lastUpdated = useMetaStore((s) => s.lastUpdated);
  const touch = useMetaStore((s) => s.touch);

  useEffect(() => {
    if (!lastUpdated) touch();
  }, [lastUpdated, touch]);

  const formattedLastUpdated = useMemo(
    () => formatDateTimeLong(lastUpdated ?? Date.now()),
    [lastUpdated]
  );

  const refreshLastUpdated = useCallback(() => {
    touch();
  }, [touch]);

  return { formattedLastUpdated, refreshLastUpdated };
}
