import React, { useState } from "react";
import { DEFAULT_CARDS } from "../dataJson";
import { FaFire } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        headingColor="text-neutral-500"
        column="backlog"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Todo"
        headingColor="text-yellow-200"
        column="todo"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="InProgress"
        headingColor="text-blue-200"
        column="doing"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Completed"
        headingColor="text-emerald-200"
        column="done"
        cards={cards}
        setCards={setCards}
      />
      <BurnBurrel setCards={setCards} />
    </div>
  );
};

const Column = ({ title, headingColor, column, cards, setCards }) => {
  const [active, setActive] = useState(false);
  const filteredCards = cards.filter((card) => card.column === column);
  return (
    <div className="w-56 shrink-0">
      <div className="mb-2 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}> {title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        className={`h-full w-full transation-colors ${
          !active ? "bg-neutral-800/50" : "bg-newtral-400/0"
        }`}
      >
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      <DropIndicator beforeId="-1" column={column} />
    </div>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const Card = ({ title, id, column }) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable
        className="cursor-grab rounded border border-neutral-700 p-3 bg-neutral-800 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
};

const BurnBurrel = ({ setCards }) => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`mt-30 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "bg-neutral-500/200 text-neutral-500 border-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FaTrash />}
    </div>
  );
};

const NotionDemo = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

export default NotionDemo;
