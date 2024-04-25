import { useState } from "react";
import { useForm } from "react-hook-form";

function NewPost() {
  const [newPost, setNewPost] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const post = JSON.stringify(data);
    try {
      const response = await fetch("https://5mq2rc-8080.csb.app/api/post", {
        method: "POST", // Ensure method name is correctly capitalized
        headers: {
          Accept: "application/json", // Corrected the quote types and removed spaces
          "Content-Type": "application/json",
        },
        body: post,
      });
      if (response.ok) {
        setNewPost("Post created successfully!");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating data:", error);
      setNewPost("Post creation failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 10 }}>
        <br />
        <span>Slug:</span>
        <br />
        <input type="text" {...register("slug", { required: true })} />
        <br />
        {errors.slug && <div style={{ color: "red" }}>Slug is required</div>}
        <span>Title:</span>
        <br />
        <input type="text" {...register("title", { required: true })} />
        <br />
        {errors.title && <div style={{ color: "red" }}>Title is required</div>}
        <span>Description:</span>
        <br />
        <input type="text" {...register("description", { required: true })} />
        <br />
        {errors.description && (
          <div style={{ color: "red" }}>Description is required</div>
        )}
        <br />
        <button type="submit">Add New</button>
        <p>{newPost}</p>
      </div>
    </form>
  );
}

export default NewPost;
