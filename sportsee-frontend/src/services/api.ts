const IS_MOCK = true;

export const API_URL = IS_MOCK
  ? "/src/mocks/data.json"
  : "http://localhost:3000";

export async function fetchUserMainData(userId: number): Promise<UserData> {
  const endpoint = IS_MOCK ? API_URL : `${API_URL}/user/${userId}`;

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Failed to fetch user data");

  const jsonData = await response.json();

  if (IS_MOCK) {
    const userData = jsonData.USER_MAIN_DATA as UserData[];
    const user = userData.find((u) => u.id === userId);
    if (!user) throw new Error("User not found in mock data");
    return user;
  }

  return jsonData.data;
}

export async function fetchUserActivity(userId: number): Promise<UserActivity> {
  const endpoint = IS_MOCK ? API_URL : `${API_URL}/user/${userId}/activity`;

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Failed to fetch user activity");

  const jsonData = await response.json();

  if (IS_MOCK) {
    const userActivity = jsonData.USER_ACTIVITY as UserActivity[];
    const activity = userActivity.find(
      (activity) => activity.userId === userId
    );
    if (!activity) throw new Error("User activity not found in mock data");
    return activity;
  }

  return jsonData.data;
}

export async function fetchUserPerformance(
  userId: number
): Promise<UserPerformance> {
  const endpoint = IS_MOCK ? API_URL : `${API_URL}/user/${userId}/performance`;

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Failed to fetch user performance");

  const jsonData = await response.json();

  if (IS_MOCK) {
    const userPerformance = jsonData.USER_PERFORMANCE as UserPerformance[];
    const performance = userPerformance.find((p) => p.userId === userId);
    if (!performance)
      throw new Error("User performance not found in mock data");
    return performance;
  }

  return jsonData.data;
}

export async function fetchUserAverageSessions(
  userId: number
): Promise<UserAverageSessions> {
  const endpoint = IS_MOCK
    ? API_URL
    : `${API_URL}/user/${userId}/average-sessions`;

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Failed to fetch user average sessions");

  const jsonData = await response.json();

  if (IS_MOCK) {
    const userAverageSessions =
      jsonData.USER_AVERAGE_SESSIONS as UserAverageSessions[];
    const averageSessions = userAverageSessions.find(
      (session) => session.userId === userId
    );
    if (!averageSessions)
      throw new Error("User average sessions not found in mock data");
    return averageSessions;
  }

  return jsonData.data;
}
