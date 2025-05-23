//import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

//Router
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AuthContextProvider, UserAuth } from "./components/auth/AuthContext";

//Query
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  trailingSlash:"always",
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
    queryClient
  },
});
// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = UserAuth();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ auth, queryClient }} />
      </QueryClientProvider>
    </>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <InnerApp />
    </AuthContextProvider>
  );
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    //<StrictMode>
      <App />
    //</StrictMode>
  );
}
