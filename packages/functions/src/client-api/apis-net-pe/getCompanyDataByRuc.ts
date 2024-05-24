import { get } from "./fetchApi";
import { environmentConfig } from "../../config";

type Response = CompanyDataApi;

interface Props {
  ruc: string;
}

const { token } = environmentConfig["apis-net-pe"];

export const getCompanyDataByRuc = async ({
  ruc,
}: Props): Promise<CompanyData | null> => {
  try {
    const { data } = await get<Response>(`/ruc?numero=${ruc}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });

    return mapCompanyData(data);
  } catch (e) {
    return null;
  }
};

const mapCompanyData = (companyData: CompanyDataApi): CompanyData => ({
  ruc: companyData?.numeroDocumento || "",
  socialReason: companyData?.razonSocial || "",
  ubigeo: companyData?.ubigeo || "",
  department: companyData?.departamento || "",
  province: companyData?.provincia || "",
  district: companyData?.distrito || "",
  address: companyData?.direccion || "",
  status: companyData?.estado || "",
});
