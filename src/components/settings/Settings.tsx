import styled from "@emotion/styled";
import useConfig from "../../hooks/use-config";

const Wrapper = styled.div`
  margin-top: 1rem;
  text-align: center;
`;
const Settings = () => {
  const [settings, setSettings] = useConfig();

  return (
    <Wrapper>
      <h3>Display</h3>
    </Wrapper>
  );
};

export default Settings;
