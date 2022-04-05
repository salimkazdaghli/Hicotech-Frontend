import { Avatar, List, Skeleton, Spin } from "antd";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

const PleyersListItems = ({ data, loading }) => {
  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
  const history = useHistory();
  const goToPlayerProfile = (item) => {
    history.push("/dashboard/modifier/profileJoueur", { ...item });
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <Spin spinning={loading}>
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={uuidv4()} onClick={() => goToPlayerProfile(item)}>
              <Skeleton loading={loading} avatar>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        color: "white",
                        backgroundColor:
                          ColorList[
                            Math.floor(Math.random() * ColorList.length)
                          ],
                      }}
                    >
                      {item.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={`${item.firstName} ${item.lastName}`}
                  description={item.email}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
};

export default PleyersListItems;
