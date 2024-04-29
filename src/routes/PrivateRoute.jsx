import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import ProfileProvider from "../providers/ProfileProvider";
import PostProvider from "../providers/PostProvider";

export default function PrivateRoute() {
  const { auth } = useAuth();
  return (
    <>
      {auth.authToken ? (
        <>
          <PostProvider>
            <ProfileProvider>
              <Header />
              <main className="mx-auto max-w-screen-md pt-2 pb-8">
                <div className="container">
                  <Outlet />
                </div>
              </main>
            </ProfileProvider>
          </PostProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
