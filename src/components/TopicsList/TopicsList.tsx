import React from "react";
import { Badge } from "react-bootstrap";
import "./TopicsList.scss";
import AppIcons from "../AppIcons";
import IconButton from "components/IconButton/IconButton";

interface Props {
  topics: string[];
  onAdd: () => void;
  onDelete: (tIdx: number) => void;
  onEdit: (tIdx: number, topic: string) => void;
}

const TopicsList = (props: Props) => {
  return (
    <div className="topics-list-container">
      {props.topics.length === 0 && (
        <div className="topics-list-placeholder">
          <i>No topics yet.</i>
        </div>
      )}
      {props.topics.map((topic, idx) => (
        <Badge as="div" className="topics-list-item" pill variant="light">
          <input
            className="topics-list-item-input"
            value={topic}
            onChange={(e) => props.onEdit(idx, e.target.value)}
          />
          <IconButton
            icon={AppIcons.close}
            className="topics-remove-button"
            onClick={() => props.onDelete(idx)}
          />
        </Badge>
      ))}
      <IconButton icon={AppIcons.add} onClick={props.onAdd} />
    </div>
  );
};

export default TopicsList;
