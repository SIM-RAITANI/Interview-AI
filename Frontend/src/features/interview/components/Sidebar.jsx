import React from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { handleLogout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

 const onLogout = () => {
    toast((t) => (
      <div className="confirm-toast">
        <span className="confirm-toast__message">
          Are you sure you want to <b>Logout</b>?
        </span>
        <div className="confirm-toast__actions">
          <button
            className="confirm-toast__btn confirm-toast__btn--confirm"
            onClick={async () => {
              toast.dismiss(t.id);
              await handleLogout();
              navigate("/login");
            }}
          >
            Logout
          </button>
          <button
            className="confirm-toast__btn confirm-toast__btn--cancel"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), { 
      duration: 5000,
      position: "top-center" 
    });
};

  const navItems = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: "reports",
      label: "History",
      path: "#recent-reports",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="logo-icon">AI</div>
        <h2>
          Interview<span>AI</span>
        </h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${location.pathname === item.path ? "active" : ""}`}
            onClick={() =>
              item.path.startsWith("#")
                ? document
                    .getElementById(item.path.substring(1))
                    ?.scrollIntoView({ behavior: "smooth" })
                : navigate(item.path)
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <p>{user?.username}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
