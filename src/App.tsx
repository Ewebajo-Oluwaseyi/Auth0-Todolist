import React, { Suspense } from "react";
import "./style/main.css";
import Container from "./components/Container";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Spinner from "./components/Spinner";
import Auth from "./components/Auth";
import PageTransition from "./components/PageTransition";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user }: any = useAuth0();

  return (
    <Suspense fallback={<Spinner />}>
      <div className="page-container">
        <Toaster
          position="top-center"
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#ffffff",
              color: "#3A4374",
            },
            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#4661E6",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#D73737",
                secondary: "#ffffff",
              },
            },
          }}
        />
        <Router>
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/todo">
              {({ location, history }: any) => {
                return (
                  <PageTransition
                    uniqueKey={location.key ?? "home"}
                    action={history.action}
                  >
                    <Container user={user} />
                  </PageTransition>
                );
              }}
            </Route>
            <Redirect exact from="/" to="/auth" />
          </Switch>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
