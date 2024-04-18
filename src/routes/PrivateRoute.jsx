import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { auth } = useAuth();
  return (
    <>
      {auth.user ? (
        <>
          <Header />
          <main className="mx-auto max-w-screen-2xl pt-2 pb-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
