/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Radio } from "antd";
import Title from "antd/lib/typography/Title";
import "./PayMembership.css";

const PayMembership = () => (
  <>
    <Title>Payer Abonnement</Title>
    <Title level={4}>sélectionner le type d'abonnement :</Title>
    <Radio.Group defaultValue="Free" buttonStyle="solid">
      <Radio.Button className="radioItem" value="Free">
        Free
      </Radio.Button>
      <Radio.Button className="radioItem" value="Basic">
        Basic
      </Radio.Button>
      <Radio.Button className="radioItem" value="Premium">
        Premium
      </Radio.Button>
    </Radio.Group>
  </>
);

export default PayMembership;
