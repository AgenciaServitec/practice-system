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
import { PracticesSheet10 } from "./PracticesSheet10";
import { PracticesSheet11 } from "./PracticesSheet11";

import { useNavigate, useParams } from "react-router";
import { useGlobalData } from "../../../../../providers";
import { practicesRef } from "../../../../../firebase/collections";
import { querySnapshotToArray } from "../../../../../firebase/firestore";
import { notification, Spinner } from "../../../../../components";
import { isEmpty } from "lodash";
import { useQuery } from "../../../../../hooks";
import styled, { css } from "styled-components";

export const Sheets = () => {
  const { practiceId } = useParams();
  const { annexNumber } = useQuery();
  const navigate = useNavigate();
  const { practices, users, companies } = useGlobalData();

  const [practice, setPractice] = useState({});
  const [company, setCompany] = useState({});
  const [practitioner, setPractitioner] = useState({});
  const [representativeCompany, setRepresentativeCompany] = useState({});
  const [supervisor, setSupervisor] = useState({});
  const [annexs, setAnnexs] = useState([]);
  const [loading, setLoading] = useState(false);

  const onGoBack = () => navigate(-1);

  useEffect(() => {
    (() => getSheetsData())();
  }, [practiceId]);

  useEffect(() => {
    setTimeout(() => {
      annexNumber && scrollToSheetItem();
    }, 300);
  }, [annexNumber]);

  const scrollToSheetItem = () => {
    const sheet = document.querySelector(`#${annexNumber}`);

    if (sheet) {
      return sheet.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const getSheetsData = () => {
    try {
      setLoading(true);

      const _practice = practices.find(
        (practice) => practice?.id === practiceId
      );
      if (!_practice) return onGoBack();

      const _company = companies.find(
        (company) => company?.id === _practice.companyId
      );

      (async () => {
        await practicesRef
          .doc(_practice?.id)
          .collection("annexs")
          .onSnapshot((snapshot) => {
            setAnnexs(querySnapshotToArray(snapshot));
          });
      })();

      setPractice(_practice);
      setCompany(_company);
      setPractitioner(
        users.find((user) => user?.id === _practice.practitionerId)
      );
      setRepresentativeCompany(
        users.find((user) => user?.id === _company.representativeId)
      );
      setSupervisor(
        users.find((user) => user?.id === _practice.academicSupervisorId)
      );
    } catch (e) {
      console.log("GetSheetsDataError: ", e);
      notification({ type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const [annex2, annex3, annex4, annex6] = annexs;

  if (loading || isEmpty(practice)) return <Spinner height="80vh" />;

  return (
    <Container annexNumber={annexNumber}>
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
            practitioner={practitioner}
            practice={practice}
            company={company}
            representativeCompany={representativeCompany}
          />
        </Sheet>
        <Sheet layout="portrait">
          <PracticesSheet3
            practitioner={practitioner}
            practice={practice}
            company={company}
            representativeCompany={representativeCompany}
            supervisor={supervisor}
            annex2={annex2}
            annexNumber={annexNumber}
          />
        </Sheet>
        <Sheet layout="portrait">
          <PracticesSheet4
            practitioner={practitioner}
            practice={practice}
            company={company}
            representativeCompany={representativeCompany}
            supervisor={supervisor}
            annex3={annex3}
            annexNumber={annexNumber}
          />
        </Sheet>
        <Sheet layout="portrait">
          <PracticesSheet5
            practice={practice}
            practitioner={practitioner}
            company={company}
            representativeCompany={representativeCompany}
            annexNumber={annexNumber}
          />
        </Sheet>
        <Sheet layout="portrait">
          <PracticesSheet6
            practice={practice}
            representativeCompany={representativeCompany}
            annex4={annex4}
          />
        </Sheet>
        <Sheet layout="portrait">
          <PracticesSheet7
            practice={practice}
            practitioner={practitioner}
            supervisor={supervisor}
            annexNumber={annexNumber}
          />
        </Sheet>
        <Sheet layout="portrait">
          <PracticesSheet8
            practice={practice}
            company={company}
            supervisor={supervisor}
            representativeCompany={representativeCompany}
          />
        </Sheet>
        <Sheet layout="portrait">
          <PracticesSheet9
            practice={practice}
            supervisor={supervisor}
            annex3={annex3}
          />
        </Sheet>
        {practitioner?.frontDniPhoto && practitioner?.backDniPhoto && (
          <Sheet layout="portrait">
            <PracticesSheet10 practitioner={practitioner} />
          </Sheet>
        )}
        {company?.address && (
          <Sheet layout="portrait">
            <PracticesSheet11 company={company} />
          </Sheet>
        )}
      </PDF>
    </Container>
  );
};

const Container = styled.div`
  ${({ annexNumber }) =>
    css`
      .${annexNumber}-title {
        text-decoration-line: underline;
        text-decoration-style: wavy;
        text-decoration-color: red;

        @media print {
          text-decoration: none;
        }
      }
    `};
`;
