const IS_MOCK = true;

export const API_URL = IS_MOCK
  ? "/src/mocks/data.json"
  : "http://localhost:3000";

export async function fetchUserData(userId: number): Promise<UserData> {
  const endpoint = IS_MOCK ? API_URL : `${API_URL}/user/${userId}`;

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Failed to fetch user data");

  const { data }: Data = await response.json();

  if (IS_MOCK) {
    const user = data.find((u: UserData) => u.id === userId);
    if (!user) throw new Error("User not found");
    return user;
  }

  return data[0];
}
