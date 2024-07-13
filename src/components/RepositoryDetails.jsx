import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRepository } from "../utils/api";

const RepositoryDetails = () => {
  const { username, repoName } = useParams();
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        setLoading(true);
        const data = await fetchRepository(username, repoName);
        setRepository(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRepo();
  }, [username, repoName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Repository Details</h2>
      {repository && (
        <div>
          <h3 className="text-lg font-semibold">{repository.full_name}</h3>
          <p>{repository.description}</p>
          <p>Stars: {repository.stargazers_count}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default RepositoryDetails;
