import React from "react";
import Card from "../Card";

function CardList({ champs, refChamp, difficulty }) {
  return (
    Object.entries(champs).map(([key, value]) => (
      <Card
        key={key}
        {...value}
        refChamp={refChamp}
        apiName={key}
        difficulty={difficulty}
      />
    ))
  );
}

export default CardList;
