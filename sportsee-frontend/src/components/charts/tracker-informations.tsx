import { useEffect, useState } from "react";
import DataCard from "../data-card";
import { userService } from "../../services/api";
import fire from "../../assets/fire.svg";
import apple from "../../assets/apple.svg";
import poulet from "../../assets/poulet.svg";
import cheeseburger from "../../assets/cheeseburger.svg";

export default function TrackerInformations({ userId }: { userId: number }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await userService.getUserMainData(userId);
        setUserData(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      }
    }

    loadData();
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <>
      {userData.keyData.calorieCount ? (
        <DataCard
          icone={fire}
          label="Calories"
          value={userData.keyData.calorieCount}
          bgColor="bg-[#FF0000]/10"
        />
      ) : (
        <div>Aucune donnée.</div>
      )}
      {userData.keyData.proteinCount ? (
        <DataCard
          icone={poulet}
          label="Proteines"
          value={userData.keyData.proteinCount}
          bgColor="bg-[#4AB8FF]/10"
        />
      ) : (
        <div>Aucune donnée.</div>
      )}
      {userData.keyData.carbohydrateCount ? (
        <DataCard
          icone={apple}
          label="Glucides"
          value={userData.keyData.carbohydrateCount}
          bgColor="bg-[#F9CE23]/10"
        />
      ) : (
        <div>Aucune donnée.</div>
      )}
      {userData.keyData.lipidCount ? (
        <DataCard
          icone={cheeseburger}
          label="Lipides"
          value={userData.keyData.lipidCount}
          bgColor="bg-[#FD5181]/10"
        />
      ) : (
        <div>Aucune donnée.</div>
      )}
    </>
  );
}
