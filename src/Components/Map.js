/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Modal } from "antd";

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

const Location = ({
  center = { lat: 33.94944031898135, lng: 9.79101609438658 },
  zoom = 6,
  form,
  initialPosition = null,
  visible = false,
  setvisibility = () => {},
}) => {
  const [position, setPosition] = useState(initialPosition);
  const handleClick = (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
  };
  const handleOk = () => {
    form.setFieldsValue({
      coordinates: position,
    });
    setvisibility(false);
  };

  const handleCancel = () => {
    setvisibility(false);
  };
  return (
    <div>
      <Modal
        title="Veuillez sélectionner l'emplacement."
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirmer"
        cancelText="Annuler"
      >
        <Map
          className="markercluster-map"
          center={center}
          zoom={zoom}
          style={{ minHeight: "300px" }}
          onClick={handleClick}
        >
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          {position && <MyMarker position={position} />}
        </Map>
      </Modal>
    </div>
  );
};

export default Location;
