import styled from "@emotion/styled";
import { ChangeEvent } from "react";
import useConfig from "../../hooks/use-config";
import { Stack } from "../common";

const Wrapper = styled.div`
  text-align: center;
  max-width: 450px;
  margin: auto;
`;

const SettingsField = styled(Stack)`
  padding: 1rem;
  border-top: ${(props) => `1px solid ${props.theme.colors.text.main}`};
  border-bottom: ${(props) => `1px solid ${props.theme.colors.text.main}`};
  padding-left: 2rem;
  padding-right: 2rem;
`;

const Settings = () => {
  const [settings, setSettings] = useConfig();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Wrapper>
      <SettingsField
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <h4>Display</h4>
        <Stack direction="column" gap={"1rem"} alignItems="start">
          <label>
            <input
              name="display"
              type="radio"
              value="pendulum"
              checked={settings.display === "pendulum"}
              onChange={handleChange}
            />
            Pendulum
          </label>
          <label>
            <input
              name="display"
              type="radio"
              value="count"
              checked={settings.display === "count"}
              onChange={handleChange}
            />
            Counter
          </label>
        </Stack>
      </SettingsField>
    </Wrapper>
  );
};

export default Settings;
