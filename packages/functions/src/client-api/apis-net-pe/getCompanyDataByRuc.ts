import { get } from "./fetchApi";
import { environmentConfig } from "../../config";
import { isEmpty } from "lodash";

type Response = CompanyDataApi;

interface Props {
  ruc: string;
}

const { token } = environmentConfig["apis-net-pe"];

export const getCompanyDataByRuc = async ({
  ruc,
}: Props): Promise<CompanyData | null> => {
  const { data } = await get<Response | undefined>(`/ruc?numero=${ruc}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  if (isEmpty(data)) return null;

  return mapCompanyData(data);
};

const mapCompanyData = (companyData: CompanyDataApi): CompanyData => ({
  socialReason: companyData?.razonSocial || "",
  ubigeo: companyData?.ubigeo || "",
  department: companyData?.departamento || "",
  province: companyData?.provincia || "",
  district: companyData?.distrito || "",
  address: companyData?.direccion || "",
  status: companyData?.estado || "",
});
