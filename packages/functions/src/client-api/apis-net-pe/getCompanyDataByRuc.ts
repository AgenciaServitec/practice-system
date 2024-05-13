import { get } from "./fetchApi";
import { environmentConfig } from "../../config";

type Response = CompanyDataApi;

interface Props {
  ruc: string;
}

const { token } = environmentConfig["apis-net-pe"];

export const getCompanyDataByRuc = async ({ ruc }: Props) => {
  const { data } = await get<Response>(`/ruc?numero=${ruc}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

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
