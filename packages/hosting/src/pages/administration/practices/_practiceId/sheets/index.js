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

export const Sheets = () => {
  const { practiceId } = useParams();
  const navigate = useNavigate();

  const { practices, users, companies } = useGlobalData();
  const [practice, setPractice] = useState({});
  const [practitioner, setPractitioner] = useState({});
  const [company, setCompany] = useState({});

  const onGoBack = () => navigate(-1);

  useEffect(() => {
    const _practice = practices.find((practice) => practice.id === practiceId);

    if (!_practice) return onGoBack();

    const _practitioner = users.find(
      (user) => user.id === _practice.practitionerId
    );

    const _company = companies.find(
      (company) => company.id === _practice.companyId
    );

    setPractice(_practice);
    setPractitioner(_practitioner);
    setCompany(_company);
  }, [practiceId]);

  return (
    <PDF>
      <Sheet layout="portrait">
        <PracticesSheet1
          practice={practice}
          practitioner={practitioner}
          company={company}
        />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet2
          practice={practice}
          practitioner={practitioner}
          company={company}
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
