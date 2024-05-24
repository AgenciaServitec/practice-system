import React, { useEffect, useState } from "react";
import { PDF } from "./PDF";
import { PracticesSheet1 } from "./PracticesSheet1";
import { Sheet } from "./Sheet";
import { PracticesSheet2 } from "./PracticesSheet2";
import { PracticesSheet3 } from "./PracticesSheet3";
import { PracticesSheet4 } from "./PracticesSheet4";
import { PracticesSheet5 } from "./PracticesSheet5";
import { PracticesSheet6 } from "./PracticesSheet6";
import { PracticesSheet7 } from "./PracticesSheet7";
import { PracticesSheet8 } from "./PracticesSheet8";
import { PracticesSheet9 } from "./PracticesSheet9";
import { useNavigate, useParams } from "react-router";
import { useGlobalData } from "../../../../../providers";
import { practicesRef } from "../../../../../firebase/collections";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../../../firebase";
import { querySnapshotToArray } from "../../../../../firebase/firestore";

export const Sheets = () => {
  const { practiceId } = useParams();
  const navigate = useNavigate();

  const { practices, users, companies } = useGlobalData();
  const [practice, setPractice] = useState({});
  const [company, setCompany] = useState({});
  const [practitioner, setPractitioner] = useState({});
  const [representativeCompany, setRepresentativeCompany] = useState({});
  const [annexs, setAnnexs] = useState([]);

  const onGoBack = () => navigate(-1);

  useEffect(() => {
    const _practice = practices.find((practice) => practice.id === practiceId);

    if (!_practice) return onGoBack();

    const _company = companies.find(
      (company) => company.id === _practice.companyId
    );

    const _practitioner = users.find(
      (user) => user.id === _practice.practitionerId
    );

    const _representativeCompany = users.find(
      (user) => user.id === _company.representativeId
    );

    (async () => {
      await practicesRef
        .doc(_practice.id)
        .collection("annexs")
        .onSnapshot((snapshot) => {
          setAnnexs(querySnapshotToArray(snapshot));
        });
    })();

    setPractice(_practice);
    setCompany(_company);
    setPractitioner(_practitioner);
    setRepresentativeCompany(_representativeCompany);
  }, [practiceId]);

  const [annex2, annex3, annex4, annex6] = annexs;

  return (
    <PDF>
      <Sheet layout="portrait">
        <PracticesSheet1
          practice={practice}
          company={company}
          practitioner={practitioner}
        />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet2
          practice={practice}
          practitioner={practitioner}
          company={company}
          representativeCompany={representativeCompany}
        />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet3
          practice={practice}
          practitioner={practitioner}
          company={company}
        />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet4
          practice={practice}
          practitioner={practitioner}
          company={company}
          annex3={annex3}
        />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet5
          practice={practice}
          practitioner={practitioner}
          company={company}
        />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet6
          practice={practice}
          practitioner={practitioner}
          company={company}
        />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet7
          practice={practice}
          practitioner={practitioner}
          company={company}
        />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet8
          practice={practice}
          practitioner={practitioner}
          company={company}
        />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet9
          practice={practice}
          practitioner={practitioner}
          company={company}
        />
      </Sheet>
    </PDF>
  );
};
