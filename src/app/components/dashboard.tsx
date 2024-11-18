import React, { useEffect, useState } from 'react';
import { createPost, fetchProfile, logout } from '~/lib/api';

interface DashboardProps {
    sessionDetails: any;
    onLogout: (session: any) => void; // Callback to pass session details

}

const Dashboard: React.FC<DashboardProps> = ({ sessionDetails, onLogout }) => {

    const [loading, setLoading] = useState(false);
    const [postMessage, setPostMessage] = useState("");
    const [postContent, setPostContent] = useState(""); // State for the post input field
    const [userProfile, setUserProfile] = useState<any>(null); // Correct type to allow null or Response

    const fetchUserProfile = async () => {

        if (sessionDetails != null) {
            console.log("Fetch frofile of : ", sessionDetails.data.handle)

            const profile = await fetchProfile(sessionDetails.data.handle)
            setUserProfile(profile)
        }


    }

    useEffect(() => {
        fetchUserProfile()
    }, [userProfile])

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
            setPostContent(""); // Clear input field
        } catch (error) {
            setPostMessage("Failed to create post. Check console for details.");
            console.error("Post Creation Error:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleLogout = async () => {
        try {
            await logout();
            onLogout(null); // Clear session details on logout
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="container mx-auto max-w-3xl">
                {/* Conditional rendering based on userProfile */}
                {!userProfile ? (
                    <p>Loading...</p> // This will display while the profile is being fetched
                ) : (
                    <>
                        <h1 className="font-bold text-2xl mb-4 text-gray-800">
                            Welcome, {userProfile.data.displayName}
                        </h1>



                        <div className="mb-6">
                            <label
                                htmlFor="postContent"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Enter Post Content:
                            </label>
                            <textarea
                                id="postContent"
                                rows={3}
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                                className="mt-1 block w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-gray-800"
                                placeholder="Write your post here..."
                            ></textarea>
                        </div>

                        <div>
                            <button
                                onClick={handleCreatePost}
                                className="py-2 px-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                disabled={loading}
                            >
                                {loading ? "Publishing..." : "Publish"}
                            </button>

                            <button
                                onClick={handleLogout}
                                className="ml-12 py-2 px-4 bg-red-800 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Logout
                            </button>
                        </div>

                        {postMessage && <p className="mt-4 text-green-500">{postMessage}</p>}
                    </>
                )}
            </div>
        </div>
    );

};

export default Dashboard;
