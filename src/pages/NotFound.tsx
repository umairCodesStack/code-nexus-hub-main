import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="colorful-page flex min-h-screen items-center justify-center px-6">
      <div className="card-3d colorful-card text-center px-8 py-10 md:px-12 md:py-12 max-w-xl w-full">
        <h1 className="mb-4 text-5xl font-display font-extrabold colorful-title">404</h1>
        <p className="mb-4 text-xl font-display text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="btn-3d btn-neon inline-flex px-6 py-2 font-display text-sm">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
