import React, { useState, useEffect } from "react";
import { createItem, updateItem } from "../api/itemApi";
import { TextField, Button, Box } from "@mui/material";

const ItemForm = ({ selectedItem, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItem) {
      await updateItem(selectedItem.id, formData);
    } else {
      await createItem(formData);
    }
    onSuccess();
    setFormData({ name: "", description: "", price: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "flex", gap: 2, flexDirection: "column", maxWidth: 400 }}>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField label="Description" name="description" value={formData.description} onChange={handleChange} />
      <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
      <Box>
        <Button type="submit" variant="contained" sx={{ mr: 1 }}>
          {selectedItem ? "Update" : "Create"}
        </Button>
        {selectedItem && (
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ItemForm;
