import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  FormHelperText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import CustomDialog from "./CustomDialog";
import "./ListRender.css";

const ListRender = ({ type, data, setData, usersCollectionRef }) => {
  const [delModal, setDelModal] = useState(false);
  const [modalType, setModalType] = useState("update");
  const [currentId, setCurrentId] = useState("");
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false); // New state for addModal
  const [fieldsName, setFieldsName] = useState([]);

  const handleOpen = () => {
    setAddModal(true);
  };

  useEffect(() => {
    if (data) {
      setFieldsName(getFieldNames(data));
    }
  }, [data]);

  function handleDeleteStudent(id) {
    setDelModal(true);
    setModalType("delete");
    setCurrentId(id);
  }

  function handleEditStudent(id) {
    setModal(true);
    setModalType("update");
    setCurrentId(id);
  }

  function getFieldNames(obj) {
    if (Array.isArray(obj) && obj.length > 0) {
      const keys = Object.keys(obj[0]);
      const fields = keys.filter((key) => !Array.isArray(obj[0][key]));
      return fields;
    } else {
      const keys = Object.keys(obj);
      const fields = keys.filter((key) => !Array.isArray(obj[key]));
      return fields;
    }
  }

  console.log(data)

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Add Users
      </Button>
      <div style={{margin:"5px"}}/>

      {(modal || delModal || addModal) && ( // Add the condition for addModal
        <CustomDialog
          modalType={modal ? "update" : delModal ? "delete" : "add"} // Update the modalType condition
          setOpenModal={modal ? setModal : delModal ? setDelModal : setAddModal} // Update the setOpenModal condition
          open={modal || delModal || addModal} // Update the open condition
          setData={setData}
          data={data}
          fields={fieldsName}
          id={currentId}
          usersCollectionRef={usersCollectionRef}
        />
      )}
      {data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="lead-header">
              <TableRow className="#">
                <TableCell align="center" className="lead-header">
                  Serial No.
                </TableCell>
                {fieldsName.map((field) => (
                  <TableCell className="lead-header" key={field} align="center">
                    {field}
                  </TableCell>
                ))}
                {type !== "img" && (
                  <TableCell align="center" className="lead-header">
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((student, i) => (
                <TableRow
                  key={i}
                  className={
                    i % 2 === 0
                      ? "lead-table-contents-light-gray"
                      : "lead-table-contents-light-blue"
                  } // Add class names for alternating row colors
                >
                  <TableCell align="center">
                    {type === "img" ? (
                      <AccountCircleIcon fontSize="large" />
                    ) : (
                      i + 1
                    )}
                  </TableCell>
                  {fieldsName.map((field) => (
                    <TableCell key={`${student.id}-${field}`} align="center">
                      {student[field]}
                    </TableCell>
                  ))}
                  {type !== "img" && (
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handleEditStudent(student.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No data found</Typography>
      )}
    </>
  );
};

export default ListRender;
