import React from "react";
import { List, Rate, Card } from "antd";
import { v4 as uuidv4 } from "uuid";

const Skills = () => {
  const data = [
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
    {
      title: "Title 5",
    },
    {
      title: "Title 6",
    },
    {
      title: "Title 7",
    },
  ];
  return (
    <List
      grid={{
        gutter: [30, 25],
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={uuidv4()}>
          <Card type="inner" title={item.title}>
            <b>Rating :</b> <Rate disabled defaultValue={2} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Skills;
