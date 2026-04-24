// 认证工具模块 - 统一管理登录/注销逻辑
// 使用 localStorage 存储用户信息

const PLAYER_NAME_KEY = "player_name";
const HAS_VISITED_KEY = "world-play.hasVisited";

/** 获取当前登录用户名，未登录返回 null */
export const getPlayerName = (): string | null => {
  return localStorage.getItem(PLAYER_NAME_KEY);
};

/** 是否已登录 */
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem(PLAYER_NAME_KEY);
};

/** 是否首次访问（未看过 intro 动画） */
export const isFirstVisit = (): boolean => {
  return !localStorage.getItem(HAS_VISITED_KEY);
};

/** 标记已看过 intro 动画 */
export const markVisited = (): void => {
  localStorage.setItem(HAS_VISITED_KEY, "1");
};

/** 登录：保存用户名，标记已访问 */
export const login = (nickname: string): void => {
  localStorage.setItem(PLAYER_NAME_KEY, nickname || "无名旅人");
  markVisited();
};

/** 退出：仅清除登录状态，保留"已访问"标记（避免重走 intro） */
export const logout = (): void => {
  localStorage.removeItem(PLAYER_NAME_KEY);
  // 注意：不清除 HAS_VISITED_KEY，退出后直接去登录页而非 intro
};
