const IS_MOCK = true;

// todo : créer un wrapper qui permet de vérifier si l'API est lancée ou non -> MOCK

export const API_URL = IS_MOCK
  ? "/src/mocks/data.json"
  : "http://localhost:3000";

class ApiClient {
  private isMock: boolean;
  private apiUrl: string;

  constructor(isMock: boolean, apiUrl: string) {
    this.isMock = isMock;
    this.apiUrl = apiUrl;
  }

  public async fetchData(endpoint?: string): Promise<any> {
    const url = this.isMock
      ? this.apiUrl
      : `${this.apiUrl}${endpoint ? `/${endpoint}` : ""}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json();
  }
}

abstract class BaseService<T> {
  constructor(private client: ApiClient) {}

  protected async fetchData(endpoint?: string): Promise<T[]> {
    const jsonData = await this.client.fetchData(endpoint);
    return this.extractData(jsonData);
  }

  protected abstract extractData(jsonData: any): T[];
}

class UserService extends BaseService<UserData> {
  protected extractData(jsonData: any): UserData[] {
    return IS_MOCK ? jsonData.USER_MAIN_DATA : jsonData.data;
  }

  async getUserMainData(userId: number): Promise<UserData> {
    const data = await this.fetchData();
    const user = data.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    return user;
  }
}

class ActivityService extends BaseService<UserActivity> {
  protected extractData(jsonData: any): UserActivity[] {
    return IS_MOCK ? jsonData.USER_ACTIVITY : jsonData.data;
  }

  async getUserActivity(userId: number): Promise<UserActivity> {
    const data = await this.fetchData();
    const activity = data.find((a) => a.userId === userId);
    if (!activity) throw new Error("Activity not found");
    return activity;
  }
}

class PerformanceService extends BaseService<UserPerformance> {
  protected extractData(jsonData: any): UserPerformance[] {
    return IS_MOCK ? jsonData.USER_PERFORMANCE : jsonData.data;
  }

  async getUserPerformance(userId: number): Promise<UserPerformance> {
    const data = await this.fetchData();
    const performance = data.find((p) => p.userId === userId);
    if (!performance) throw new Error("Performance not found");
    return performance;
  }
}

class AverageSessionService extends BaseService<UserAverageSessions> {
  protected extractData(jsonData: any): UserAverageSessions[] {
    return IS_MOCK ? jsonData.USER_AVERAGE_SESSIONS : jsonData.data;
  }

  async getUserAverageSessions(userId: number): Promise<UserAverageSessions> {
    const data = await this.fetchData();
    const sessions = data.find((s) => s.userId === userId);
    if (!sessions) throw new Error("Average sessions not found");
    return sessions;
  }
}

const apiClient = new ApiClient(IS_MOCK, API_URL);

export const userService = new UserService(apiClient);
export const activityService = new ActivityService(apiClient);
export const performanceService = new PerformanceService(apiClient);
export const averageSessionService = new AverageSessionService(apiClient);
