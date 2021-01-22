import React from 'react';
import { Table } from 'react-bootstrap';
import StudentEntry, { StudentEntryHeaders } from './models/StudentEntry';

interface Props {
  students: StudentEntry[];
}

const StudentsTable = (props: Props) => {
  if (!props.students) {
    return <p>Loading student data...</p>;
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No.</th>
          {StudentEntryHeaders.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.students.map((user, idx) => (
          <tr>
            <td>{idx + 1}</td>
            <td>{user.name}</td>
            <td>{user.schoolId}</td>
            <td>{user.class}</td>
            <td>{user.username}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentsTable;
