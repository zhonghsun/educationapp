import React from "react";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./TermsPageListItem.module.scss";
import IconButton from "components/IconButton/IconButton";
import clsx from "clsx";
import { TermChallenge } from "models/TermChallenge";

interface Props {
  termChallenge: TermChallenge;
  onEdit: () => void;
  onDelete: () => void;
}

const TermsPageListItem = (props: Props) => {
  const handleClickEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    props.onEdit();
  };

  const handleClickDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    props.onDelete();
  };

  return (
    <LinkContainer
      key={props.termChallenge.id}
      to={`/challenge/${props.termChallenge.id}`}
      className="appcard hoverable mb-4"
    >
      <div className="border clickable d-flex align-items-center text-left py-4 px-5">
        <div className="flex-fill">{props.termChallenge.title}</div>
        <div className="mr-2">{format(props.termChallenge.date, "dd MMM yyyy h:mm a")}</div>
        <IconButton icon={faPen} onClick={handleClickEdit} className={clsx(styles.editButton, "mx-2")} />
        <IconButton
          icon={faTrash}
          onClick={handleClickDelete}
          className={clsx(styles.deleteButton, "mx-2")}
        />
      </div>
    </LinkContainer>
  );
};

export default React.memo(TermsPageListItem);
