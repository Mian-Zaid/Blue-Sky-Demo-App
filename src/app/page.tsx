"use client"; // Ensure this file is treated as a client-side component
import { useEffect, useState } from "react";
import { createPost, createSession, logout } from "~/lib/api";

export default function Homepage() {
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [postMessage, setPostMessage] = useState("");
  const [postContent, setPostContent] = useState(""); // State for input field

  const initializeSession = async () => {
    try {
      const sessionResponse = await createSession(
        process.env.NEXT_PUBLIC_BSKY_HANDLE || "",
        process.env.NEXT_PUBLIC_BSKY_PASS || "" // Use environment variable accessible on the client
      );
      setSessionDetails(sessionResponse);
    } catch (error) {
      console.error("Failed to initialize session:", error);
    }
  };

  useEffect(() => {
    initializeSession();
  }, []);

  const handleCreatePost = async () => {

    if (!postContent.trim()) {
      setPostMessage("Post content cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await createPost(postContent);
      setPostMessage("Post created successfully!");
      console.log("Post Response:", response);
      setPostContent("");
    } catch (error) {
      setPostMessage("Failed to create post. Check console for details.");
      console.error("Post Creation Error:", error);

      useEffect(() => {
        initializeSession();
      }, []);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const res = await logout();
  }

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-xl my-4">Session Details</h1>
      <div>
        {sessionDetails ? (
          <div>
            <pre className="text-sm">
              Session Logged in
              {/* {JSON.stringify(sessionDetails, null, 2)} */}
            </pre>

            {/* <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600" onClick={handleLogout}>Logout</button> */}

          </div>

        ) : (
          <p>Loading session details...</p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="postContent" className="block text-sm font-medium ">
          Enter Post Content:
        </label>
        <textarea
          id="postContent"
          rows={3}
          value={postContent}
          onChange={(e) => {
            setPostContent(e.target.value)

          }
          }
          className="mt-1 block w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          placeholder="Write your post here..."
        ></textarea>
      </div>

      <button
        onClick={handleCreatePost}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Creating Post..." : "Create Post"}
      </button>

      {postMessage && <p className="mt-4 text-green-500">{postMessage}</p>}
    </div>
  );
}
