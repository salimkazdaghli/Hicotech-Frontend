import { Badge, Col, Descriptions, Divider, Drawer, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import "./ShowSessionDetail.css";

const ShowSessionDetails = () => {
  const newLocal = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
  const DescriptionItem = newLocal;
  return (
    <>
      <Title>Détails séance</Title>
      <p className="site-description-item-profile-p">Les Infos Générales</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Nom Séance" content="Séance 1" />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Lieu d'entrainement"
            content="Mahdia ,Tunisia"
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Date Séance" content="February 2,1900" />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Etat Séance"
            content={<Badge status="error" text="Annuler" />}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem title="Joueur attribué" content="Marouene Ayoub" />
        </Col>
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">
        Le programme de la séance
      </p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Titre" content="Programme 1" />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Description"
            content="ceci est le programme de la séance 1 qui fait le ..."
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="Lien video du programme"
            content={
              <a href="http://github.com/ant-design/ant-design/">
                github.com/ant-design/ant-design/
              </a>
            }
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title="Skills"
            content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
          />
        </Col>
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">Contacts</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Email" content="AntDesign@example.com" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title="Github"
            content={
              <a href="http://github.com/ant-design/ant-design/">
                github.com/ant-design/ant-design/
              </a>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default ShowSessionDetails;
