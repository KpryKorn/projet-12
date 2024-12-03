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

interface Data {
  data: UserData[];
}
