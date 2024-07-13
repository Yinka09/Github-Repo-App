import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RepositoriesList from "./components/RepositoriesList";
import RepositoryDetails from "./components/RepositoryDetails";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<RepositoriesList username="Yinka09" />} />
          <Route
            path="/repos/:username/:repoName"
            element={<RepositoryDetails />}
          />
          <Route
            path="*"
            element={
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">404 - Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
