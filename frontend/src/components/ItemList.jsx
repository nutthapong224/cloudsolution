import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../api/itemApi";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ItemList = ({ onEdit }) => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(item)} variant="contained" sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(item.id)} variant="outlined" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemList;
