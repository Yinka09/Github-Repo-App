import React, { useEffect, useState } from "react";
import { fetchRepositories } from "../utils/api";
import { Link } from "react-router-dom";

const RepositoriesList = ({ username }) => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const data = await fetchRepositories(username, page);
        setRepositories(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, page]);

  const filteredRepos = repositories.filter((repo) => {
    return (
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLanguage ? repo.language === filterLanguage : true)
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Repositories List</h2>
      <input
        type="text"
        placeholder="Search Repositories"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <select
        value={filterLanguage}
        onChange={(e) => setFilterLanguage(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">All Languages</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
        <option value="Ruby">Ruby</option>
        {/* Add more languages as needed */}
      </select>
      <ul className="list-none">
        {filteredRepos.map((repo) => (
          <li key={repo.id} className="mb-2">
            <Link
              to={`/repos/${repo.full_name}`}
              className="text-blue-500 hover:underline"
            >
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Previous Page
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default RepositoriesList;
