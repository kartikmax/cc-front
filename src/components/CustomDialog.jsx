import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
} from "@mui/material";
import { addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

const CustomDialog = ({
  modalType,
  open,
  setOpenModal,
  id,
  data,
  fields,
  usersCollectionRef,
  setData,
}) => {
  const [formValues, setFormValues] = useState({});
  const exemptValues = ["id"];

  const handleClose = () => {
    setOpenModal(false);
  };

  const createUser = async () => {
    // setFormValues({})
    await addDoc(usersCollectionRef, formValues);
    const updatedData = await getDocs(usersCollectionRef);
    setData(updatedData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteUser = async (id) => {
    console.log(id);
    try {
      await deleteDoc(doc(usersCollectionRef, id));
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  useEffect(() => {
    if (data && id) {
      const selectedData = data.find((item) => item.id === id);
      if (selectedData) {
        setFormValues(selectedData);
      }
    }
  }, [data, id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (modalType === "update") {
      await updateUser(formValues, id);
    } else if (modalType === "delete") {
      await deleteUser(id);
    } else if (modalType === "add") {
      setFormValues({});
      await createUser();
    }

    handleClose();
    // console.log(formValues, id, "this data");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {modalType === "update"
          ? "Update"
          : modalType === "delete"
          ? "Delete"
          : "Add"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        {modalType !== "delete" && fields !== undefined ? (
          <DialogContent>
            {fields.map((field) => {
              if (exemptValues.includes(field)) {
                return null; // Exclude the field from rendering
              }

              if (field === "semester") {
                return (
                  <FormControl key={field} fullWidth>
                    <InputLabel>{field}</InputLabel>
                    <Select
                      name={field}
                      value={formValues[field] || ""}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="1">Semester 1</MenuItem>
                      <MenuItem value="2">Semester 2</MenuItem>
                      <MenuItem value="3">Semester 3</MenuItem>
                      <MenuItem value="4">Semester 4</MenuItem>
                      <MenuItem value="5">Semester 5</MenuItem>
                      <MenuItem value="6">Semester 6</MenuItem>
                    </Select>
                  </FormControl>
                );
              }

              if (field === "course") {
                return (
                  <FormControl key={field} fullWidth>
                    <InputLabel>{field}</InputLabel>
                    <Select
                      name={field}
                      value={formValues[field] || ""}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="BCA">BCA</MenuItem>
                      <MenuItem value="Bsc It">Bsc It</MenuItem>
                      <MenuItem value="BBA">BBA</MenuItem>
                      <MenuItem value="Bcom">Bcom</MenuItem>
                    </Select>
                  </FormControl>
                );
              }

              return (
                <TextField
                  key={field}
                  margin="dense"
                  label={field}
                  name={field}
                  value={formValues[field] || ""}
                  onChange={handleInputChange}
                  fullWidth
                />
              );
            })}
          </DialogContent>
        ) : (
          <DialogContent>
            <Typography>Are you sure you want to delete?</Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary">
            {modalType === "update"
              ? "Update"
              : modalType === "delete"
              ? "Delete"
              : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CustomDialog;
