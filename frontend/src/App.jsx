import React, { useState } from "react";
import ItemList from "./components/ItemList";
import ItemForm from "./components/itemForm";
import { Container, Typography, Box } from "@mui/material";

function App() {
  const [editingItem, setEditingItem] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleEdit = (item) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: "smooth" }); // เลื่อนขึ้น top เวลา edit
  };

  const handleSuccess = () => {
    setEditingItem(null);
    setRefreshFlag(prev => !prev); // เปลี่ยนค่าเพื่อ trigger fetch ใหม่
  };

  return (
    <Container>
      <Typography variant="h4" mt={4} textAlign="center">
        FastAPI MongoDB CRUD
      </Typography>

      {/* ฟอร์มอยู่ตรงกลาง */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <ItemForm
          selectedItem={editingItem}
          onSuccess={handleSuccess}
          onCancel={() => setEditingItem(null)}
        />
      </Box>

      {/* List จะรีเฟรชทุกครั้งที่ refreshFlag เปลี่ยน */}
      <ItemList key={refreshFlag} onEdit={handleEdit} />
    </Container>
  );
}

export default App;
