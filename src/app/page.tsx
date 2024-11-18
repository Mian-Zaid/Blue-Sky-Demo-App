"use client";
import { useState } from "react";
import { createPost, logout } from "~/lib/api";
import LoginForm from "./components/login";
import Dashboard from "./components/dashboard";

export default function Homepage() {
  const [sessionDetails, setSessionDetails] = useState<any>(null); // Manage session details

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {!sessionDetails ? (
        // Show LoginForm and pass setSessionDetails to update state
        <LoginForm onLoginSuccess={setSessionDetails} />
      ) : (

        <Dashboard sessionDetails={sessionDetails} onLogout={setSessionDetails} />

      )}
    </div>
  );
}
