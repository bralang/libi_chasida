import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "@/components/RequireAuth";
import Layout from "@/components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <RequireAuth>
              <Layout>
                <Dashboard />
              </Layout>
            </RequireAuth>
          } />
          <Route path="/clients" element={
            <RequireAuth>
              <Layout>
                <Clients />
              </Layout>
            </RequireAuth>
          } />
          <Route path="/tasks" element={
            <RequireAuth>
              <Layout>
                <Tasks />
              </Layout>
            </RequireAuth>
          } />
          <Route path="/reports" element={
            <RequireAuth>
              <Layout>
                <div className="container mx-auto p-6">
                  <h1 className="text-3xl font-bold">דוחות</h1>
                  <p className="text-muted-foreground mt-2">בקרוב...</p>
                </div>
              </Layout>
            </RequireAuth>
          } />
          <Route path="/settings" element={
            <RequireAuth>
              <Layout>
                <div className="container mx-auto p-6">
                  <h1 className="text-3xl font-bold">הגדרות</h1>
                  <p className="text-muted-foreground mt-2">בקרוב...</p>
                </div>
              </Layout>
            </RequireAuth>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
