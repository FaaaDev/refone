import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import { useState } from "react";
import { LoginDialog } from "@/components/login_dialog";

export default function Layout() {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        onLogin={() => {
          setOpenLogin(true);
        }}
      />
      <main className="p-4">
        <Outlet />
      </main>
      <LoginDialog open={openLogin} onOpenChange={setOpenLogin} />
    </div>
  );
}
