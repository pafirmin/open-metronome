import { ReactNode, useEffect, useMemo, useState } from "react";
import { UserSettings } from "../../common/interfaces/user-settings.interface";
import ConfigContext from "./config.context";

interface Props {
  children: ReactNode;
}

const ConfigProvider = ({ children }: Props) => {
  const MIN_TEMPO = useMemo(() => parseInt(import.meta.env.VITE_MIN_TEMPO), []);
  const MAX_TEMPO = useMemo(() => parseInt(import.meta.env.VITE_MAX_TEMPO), []);

  const [userSettings, setUserSettings] = useState<UserSettings>({
    display: "pendulum",
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("config");

    if (!savedSettings) {
      return;
    }

    const parsedSettings = JSON.parse(savedSettings) as UserSettings;
    setUserSettings((prev) => ({ ...prev, ...parsedSettings }));
  }, []);

  return (
    <ConfigContext.Provider
      value={[{ MAX_TEMPO, MIN_TEMPO, ...userSettings }, setUserSettings]}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
