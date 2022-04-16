import { useEffect, useState } from "react";
import { Calendar, Badge, Modal, Row, Col } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Map, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;
const MyMarker = (props) => {
  const initMarker = (ref) => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };

  return <Marker ref={initMarker} {...props} />;
};

const ScheduledSessions = ({ sessionData = [] }) => {
  const [sessionDates, setsessionDates] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState({});
  useEffect(() => {
    setsessionDates(
      sessionData.map((session) => {
        const dateSeance = new Date(session.dateSeance);
        dateSeance.setHours(dateSeance.getHours() - 1);
        return { ...session, dateSeance };
      })
    );
  }, [sessionData]);
  const dateCellRender = (value) => {
    const session = sessionDates.find(
      (session) =>
        session?.dateSeance.toLocaleDateString() ===
        value._d.toLocaleDateString()
    );
    return (
      session && (
        <div
          key={uuidv4()}
          style={{ height: "100%" }}
          onClick={() => {
            setIsModalVisible(true);
            setSelectedSession(session);
          }}
        >
          <ul className="events">
            <li>
              <Badge
                status={
                  session?.sessionCancelled?.isCancelled ? "error" : "success"
                }
                text={`Séance : ${session?.seanceName}`}
              />
            </li>
          </ul>
        </div>
      )
    );
  };
  return (
    <>
      <Modal
        title="Détails de la séance"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        okText="Confirmer"
        cancelText="Annuler"
        footer={() => null}
      >
        <Row justify="space-between">
          <Col span={8}>
            <p>
              <strong>Séance</strong> : {selectedSession?.seanceName}
            </p>
            <strong>Séance annulé</strong> :
            {selectedSession?.sessionCancelled?.isCancelled ? " oui" : " non"}
          </Col>
          <Col span={8}>
            <div
              style={{
                color: "gray",
                fontWeight: "normal",
              }}
            >
              <CalendarOutlined />{" "}
              {selectedSession?.dateSeance?.toLocaleDateString()}
              <div style={{ marginBottom: 0 }}>
                <ClockCircleOutlined />{" "}
                {selectedSession?.dateSeance?.toLocaleTimeString()}
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <strong>Lieu : </strong>
        <br />
        <br />
        <Map
          className="markercluster-map"
          center={{ lat: 33.94944031898135, lng: 9.79101609438658 }}
          zoom={6}
          style={{ minHeight: "250px" }}
        >
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          {selectedSession?.trainingGround?.coordinates && (
            <MyMarker position={selectedSession?.trainingGround?.coordinates} />
          )}
        </Map>
      </Modal>
      <Calendar dateCellRender={dateCellRender} />
    </>
  );
};

export default ScheduledSessions;
