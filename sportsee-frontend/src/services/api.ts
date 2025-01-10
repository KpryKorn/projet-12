/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
class ApiClient {
  private isMock: boolean;
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    this.isMock = false;
    this.checkApiAvailability();
  }

  private async checkApiAvailability() {
    try {
      const response = await fetch(this.apiUrl);
      if (response.ok) {
        this.isMock = false;
      } else {
        this.isMock = true;
      }
    } catch (error) {
      this.isMock = true;
    }
  }

  public async fetchData(endpoint?: string): Promise<any> {
    const url = this.isMock
      ? "/src/mocks/data.json"
      : `${this.apiUrl}${endpoint ? `/${endpoint}` : ""}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json();
  }

  public getIsMock(): boolean {
    return this.isMock;
  }
}

abstract class BaseService<T> {
  constructor(public client: ApiClient) {}

  protected async fetchData(endpoint?: string): Promise<T[]> {
    const jsonData = await this.client.fetchData(endpoint);
    return this.extractData(jsonData);
  }

  protected abstract extractData(jsonData: any): T[];
}

class UserService extends BaseService<UserData> {
  protected extractData(jsonData: any): UserData[] {
    return this.client.getIsMock() ? jsonData.USER_MAIN_DATA : jsonData.data;
  }

  async getUserMainData(userId: number): Promise<UserData> {
    const data = await this.fetchData(`user/${userId}`);
    if (this.client.getIsMock()) {
      const user = data.find((u) => u.id === userId);
      if (!user) throw new Error("User not found");
      return user;
    }

    if (!data) throw new Error("User not found");
    return data;
  }
}

class ActivityService extends BaseService<UserActivity> {
  protected extractData(jsonData: any): UserActivity[] {
    return this.client.getIsMock() ? jsonData.USER_ACTIVITY : jsonData.data;
  }

  async getUserActivity(userId: number): Promise<UserActivity> {
    const data = await this.fetchData(`user/${userId}/activity`);
    if (this.client.getIsMock()) {
      const activity = data.find((a) => a.userId === userId);
      if (!activity) throw new Error("User not found");
      return activity;
    }

    if (!data) throw new Error("Activity not found");
    return data;
  }
}

class PerformanceService extends BaseService<UserPerformance> {
  protected extractData(jsonData: any): UserPerformance[] {
    return this.client.getIsMock() ? jsonData.USER_PERFORMANCE : jsonData.data;
  }

  async getUserPerformance(userId: number): Promise<UserPerformance> {
    const data = await this.fetchData(`user/${userId}/performance`);
    if (this.client.getIsMock()) {
      const performance = data.find((p) => p.userId === userId);
      if (!performance) throw new Error("User not found");
      return performance;
    }

    if (!data) throw new Error("Performance not found");
    return data;
  }
}

class AverageSessionService extends BaseService<UserAverageSessions> {
  protected extractData(jsonData: any): UserAverageSessions[] {
    return this.client.getIsMock()
      ? jsonData.USER_AVERAGE_SESSIONS
      : jsonData.data;
  }

  async getUserAverageSessions(userId: number): Promise<UserAverageSessions> {
    const data = await this.fetchData(`user/${userId}/average-sessions`);
    if (this.client.getIsMock()) {
      const sessions = data.find((s) => s.userId === userId);
      if (!sessions) throw new Error("User not found");
      return sessions;
    }

    if (!data) throw new Error("Average sessions not found");
    return data;
  }
}

const apiClient = new ApiClient("http://localhost:3000");

export const userService = new UserService(apiClient);
export const activityService = new ActivityService(apiClient);
export const performanceService = new PerformanceService(apiClient);
export const averageSessionService = new AverageSessionService(apiClient);
