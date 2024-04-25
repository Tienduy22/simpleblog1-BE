import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure the URL is constructed properly
        const url = `https://5mq2rc-8080.csb.app/api/post/${slug}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch post.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // Add slug as a dependency to refetch if it changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  // Destructuring after ensuring post is not null
  const { title, description } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
