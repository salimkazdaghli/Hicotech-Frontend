import React, { useState } from "react";
import { List, Avatar } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
import Title from "antd/lib/typography/Title";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

const DisplayPlayers = () => {
  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  const inintialPlayersList = [
    {
      firstName: "sara",
      lastName: "Ayoub",
      email: "sara.ayoub@yahoo.fr",
      city: "Mahdia",
      password: "123456",
      sexe: "Femme",
      dateOfBirth: "1998-03-28",
      weight: 60,
      height: 1.8,
      role: "joueur",
    },
    {
      firstName: "Marouene",
      lastName: "Ayoub",
      email: "marwen.ayoub@yahoo.fr",
      city: "Mahdia",
      password: "123456",
      sexe: "Homme",
      dateOfBirth: "1998-07-20",
      weight: 63,
      height: 1.75,
      role: "joueur",
    },
  ];
  //   const [loading, setLoading] = useState(false);
  const [data] = useState(inintialPlayersList);
  const history = useHistory();
  const goToPlayerProfile = (item) => {
    history.push("/dashboard/modifier/profileJoueur", { ...item });
  };

  //   const loadMoreData = () => {
  //     if (loading) {
  //       return;
  //     }
  //     setLoading(true);
  //     fetch(
  //       "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
  //     )
  //       .then((res) => res.json())
  //       .then((body) => {
  //         setData([...data, ...body.results]);
  //         setLoading(false);
  //       })
  //       .catch(() => {
  //         setLoading(false);
  //       });
  //   };

  //   useEffect(() => {
  //     loadMoreData();
  //   }, []);

  return (
    <>
      <Title>Modifier Joueur</Title>
      <Title level={4}>Selectionner un joueur :</Title>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={uuidv4()} onClick={() => goToPlayerProfile(item)}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      color: "white",
                      backgroundColor:
                        ColorList[Math.floor(Math.random() * ColorList.length)],
                    }}
                  >
                    {item.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={`${item.firstName} ${item.lastName}`}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default DisplayPlayers;
