import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
// import TextEditor from "./views/admin/profile/components/TextEditor";
import Editor from "./views/admin/profile/components/TextEditor";
const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      {/* <Route path="rtl/*" element={<RtlLayout />} /> */}
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
  );
};

export default App;
