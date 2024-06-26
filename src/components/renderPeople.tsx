import React, { useState } from "react";

import PersonIcon from "@mui/icons-material/Person";

interface Person {
  name: string;
  state: boolean;
}

interface RenderPeopleProps {
  people: Person[];
}

const RenderPeople: React.FC<RenderPeopleProps> = ({ people }) => {
  const [selectedPeople, setSelectedPeople] = useState<number[]>([]);

  const handleSelect = (personIndex: number) => {
    setSelectedPeople((prevSelectedPeople) => {
      if (prevSelectedPeople.includes(personIndex)) {
        // If the person is already selected, deselect them
        return prevSelectedPeople.filter((index) => index !== personIndex);
      } else {
        // Otherwise, add them to the selected list
        return [...prevSelectedPeople, personIndex];
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {people.map((person, personIndex) => (
        <button
          key={personIndex}
          onClick={() => handleSelect(personIndex)}
          className={`flex flex-col items-center ${
            personIndex % 2 === 1 ? "mt-16" : "mt-0"
          }  ${person.state ? "cursor-pointer" : "cursor-not-allowed"}`}
          disabled={!person.state} // Disable button if person is not available
        >
          <PersonIcon
            style={{
              color: person.state
                ? selectedPeople.includes(personIndex)
                  ? "#EF42B4"
                  : "#8E91A5"
                : "#EF42B4",
              border: selectedPeople.includes(personIndex)
                ? "2px solid #EF42B4"
                : "none",
              fontSize: 40,
            }}
          />
          <span>{person.name}</span>
        </button>
      ))}
    </div>
  );
};

export default RenderPeople;
