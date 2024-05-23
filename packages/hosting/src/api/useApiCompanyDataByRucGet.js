import { useCallback } from "react";
import { useApi } from "./useApi";

// interface Return {
//   getSearch: () => Promise<unknown>;
//   getSearchLoading: boolean;
//   getSearchResponse: Res<string>;
// }

export const useApiCompanyDataByRucGet = () => {
  const { loading, get, response } = useApi("/consults/ruc");

  const getCompanyDataByRuc = useCallback(
    async (ruc = "") => {
      return await get(ruc);
    },
    [get]
  );

  return {
    getCompanyDataByRuc,
    getCompanyDataByRucLoading: loading,
    getCompanyDataByRucResponse: response,
  };
};
