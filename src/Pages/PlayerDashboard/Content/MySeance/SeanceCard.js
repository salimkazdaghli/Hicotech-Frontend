import React from "react";
import { Skeleton, Card, Avatar, Col } from "antd";

const SeanceCard = (props) => {
  const { Meta } = Card;
  const { seance, loading } = props;
  return (
    <Col span={8}>
      <Card style={{ marginTop: 16 }} actions={[]}>
        <Skeleton loading={!loading} avatar active>
          <Meta
            avatar={
              <Avatar style={{ color: "#fff", backgroundColor: "#36a2e1" }}>
                S
              </Avatar>
            }
            title={seance.seanceName}
          />
          <p> DateSeance : {seance.dateSeance} </p>
        </Skeleton>
      </Card>
    </Col>
  );
};
export default SeanceCard;
