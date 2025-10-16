import Header from "@/components/Header";
import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">Made with ❤️ by me</p>
          <p>
            Credits to <b>RoadsideCoder</b>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
