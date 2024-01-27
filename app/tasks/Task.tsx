"use client";

import { useContext, useEffect, useState } from "react";
import useTaskGoalActions from "../hooks/useTaskGoalActions";
import TextareaIndexChng from "../components/goalAndTask/TextareaIndexChng";
import { direction } from "direction";
import { SaveBtn } from "../components/goalAndTask/actionButtons";

interface Props {
  id?: number;
  title: string;
  done: boolean;
  index?: number;
  onSaved?: () => void;
}

const Task = ({ done, title, id, index, onSaved }: Props) => {
  const [text, setText] = useState(title);
  const [status, setStatus] = useState({ itsNew: false, itsEdited: false });

  return (
    <div>
      <TextareaIndexChng
        defaultValue={title}
        dir={direction(text)}
        done={done}
        onChange={setText}
        loading={{
          decrease: false,
          increase: false,
        }}
        onClick={{ decrease: () => {}, increase: () => {} }}
        className={id ? "rounded-bl-none" : ""}
      />
      <SaveBtn
        loading={false}
        display={status.itsEdited || status.itsNew}
        onClick={() => {}}
      />
    </div>
  );
};

export default Task;
