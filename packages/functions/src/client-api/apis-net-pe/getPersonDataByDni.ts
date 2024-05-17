import { get } from "./fetchApi";
import { environmentConfig } from "../../config";

type Response = PersonDataApi;

interface Props {
  dni: string;
}

const { token } = environmentConfig["apis-net-pe"];

export const getPersonDataByDni = async ({
  dni,
}: Props): Promise<PersonData | null> => {
  try {
    const { data } = await get<Response>(`/dni?numero=${dni}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });

    return mapPersonData(data);
  } catch (e) {
    return null;
  }
};

const mapPersonData = (personData: PersonDataApi): PersonData => ({
  documentNumber: personData?.numeroDocumento || "",
  firstName: personData?.nombres || "",
  paternalSurname: personData?.apellidoPaterno || "",
  maternalSurname: personData?.apellidoMaterno || "",
});
