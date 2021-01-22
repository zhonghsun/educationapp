import React from "react";
import { Venue } from "models/Venue";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./VenuePageListItem.module.scss";
import IconButton from "components/IconButton/IconButton";
import clsx from "clsx";

interface Props {
  venue: Venue;
  onEdit: () => void;
  onDelete: () => void;
}

const VenuePageListItem = (props: Props) => {
  const handleClickEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    props.onEdit();
  }

  const handleClickDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    props.onDelete();
  }

  return (
    <LinkContainer key={props.venue.id} to={`/venue/${props.venue.id}`} className="appcard hoverable mb-4">
      <div className="border clickable d-flex align-items-center text-left py-4 px-5">
        <div className="flex-fill">{props.venue.title}</div>
        <div className="mr-2">{format(props.venue.date, "dd MMM yyyy h:mm a")}</div>
        <IconButton icon={faPen} onClick={handleClickEdit} className={clsx(styles.editButton, "mx-2")} />
        <IconButton icon={faTrash} onClick={handleClickDelete} className={clsx(styles.deleteButton, "mx-2")} />
      </div>
    </LinkContainer>
  );
};

export default React.memo(VenuePageListItem);
