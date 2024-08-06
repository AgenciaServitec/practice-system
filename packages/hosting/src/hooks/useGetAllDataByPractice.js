import { practicesRef } from "../firebase/collections";
import { querySnapshotToArray } from "../firebase/firestore";
import { useGlobalData } from "../providers";
import { useEffect, useState } from "react";

export const useGetAllDataByPractice = (practice) => {
  const { companies, users } = useGlobalData();
  const [annexs, setAnnexs] = useState([]);

  if (!practice) return {};

  useEffect(() => {
    (async () => {
      await practicesRef
        .doc(practice.id)
        .collection("annexs")
        .onSnapshot((snapshot) => {
          setAnnexs(querySnapshotToArray(snapshot));
        });
    })();
  }, [practice]);

  const company = companies.find(
    (company) => company.id === practice.companyId
  );
  const practitioner = users.find(
    (user) => user?.id === practice?.practitionerId
  );
  const representativeCompany = users.find(
    (user) => user?.id === company?.representativeId
  );
  const supervisor = users.find(
    (user) => user?.id === practice?.academicSupervisorId
  );

  return {
    annexs: annexs || [],
    company: company || {},
    practitioner: practitioner || {},
    representativeCompany: representativeCompany || {},
    supervisor: supervisor || {},
  };
};
