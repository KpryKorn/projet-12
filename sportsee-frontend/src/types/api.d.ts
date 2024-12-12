interface UserInfos {
  firstName: string;
  lastName: string;
  age: number;
}

interface KeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

interface UserData {
  id: number;
  userInfos: UserInfos;
  todayScore?: number;
  score?: number;
  keyData: KeyData;
}

interface UserActivity {
  userId: number;
  sessions: {
    day: string;
    kilogram: number;
    calories: number;
  }[];
}

interface UserPerformance {
  userId: number;
  kind: {
    [key: number]: string;
  };
  data: {
    value: number;
    kind: number;
  }[];
}

interface UserAverageSessions {
  userId: number;
  sessions: {
    day: number;
    sessionLength: number;
  }[];
}
