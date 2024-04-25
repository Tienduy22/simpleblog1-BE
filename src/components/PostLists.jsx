import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PostLists() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Corrected quotes for the URL
        const response = await fetch("https://5mq2rc-8080.csb.app/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false); // Ensure loading is set to false both in case of success and error
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>; // Handling loading state
  if (error) return <p>{error}</p>; // Handling error state

  return (
    <ul>
      {data.map((d) => (
        <li key={d.slug}>
          <Link to={`/posts/${d.slug}`}>
            <h3>{d.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
