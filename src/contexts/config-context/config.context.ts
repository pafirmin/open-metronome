import React from "react";
import { UserSettings } from "../../common/interfaces/user-settings.interface";

type ConfigContextValue =
  | [
      (
        | {
            MAX_TEMPO: number;
            MIN_TEMPO: number;
          } & UserSettings
      ),
      React.Dispatch<React.SetStateAction<UserSettings>>
    ]
  | undefined;

const ConfigContext = React.createContext<ConfigContextValue>(undefined);

export default ConfigContext;
