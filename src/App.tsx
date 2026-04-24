import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./layouts/AppLayout";
import Today from "./pages/Today";
import Goals from "./pages/Goals";
import MapHub from "./pages/MapHub";
import Chronicle from "./pages/Chronicle";
import Records from "./pages/Records";
import Profile from "./pages/Profile";
import Codex from "./pages/Codex";
import QuestDetail from "./pages/QuestDetail";
import QuestRecord from "./pages/QuestRecord";
import Cover1 from "./pages/intro/Cover1";
import Cover2 from "./pages/intro/Cover2";
import Cover3 from "./pages/intro/Cover3";
import Letter from "./pages/intro/Letter";
import Login from "./pages/intro/Login";
import Tower from "./pages/intro/Tower";
import NotFound from "./pages/NotFound.tsx";
import { useEffect, useRef } from "react";

// 全局淡入淡出过渡：每次路由切换时触发
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "scale(1.015)";
    // 强制回流后开始过渡
    void el.offsetHeight;
    el.style.transition = "opacity 500ms ease, transform 500ms ease";
    el.style.opacity = "1";
    el.style.transform = "scale(1)";
    return () => {
      el.style.transition = "";
    };
  }, [location.pathname]);

  return (
    <div ref={ref} style={{ minHeight: "100%", willChange: "opacity, transform" }}>
      {children}
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        {/* 首次打开跳转到开场动画 */}
        <Route path="/" element={<Navigate to="/intro/1" replace />} />

        {/* 叙事入口 */}
        <Route path="/intro/1" element={<Cover1 />} />
        <Route path="/intro/2" element={<Cover2 />} />
        <Route path="/intro/3" element={<Cover3 />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tower" element={<Tower />} />

        {/* 主应用 */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Today />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/map" element={<MapHub />} />
          <Route path="/chronicle" element={<Chronicle />} />
          <Route path="/records" element={<Records />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/codex" element={<Codex />} />
          <Route path="/quest/:id" element={<QuestDetail />} />
          <Route path="/quest/:id/record" element={<QuestRecord />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
};

export default App;
