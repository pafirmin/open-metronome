import styled from "@emotion/styled";
import { useState } from "react";
import TabsProvider from "../../contexts/tab-context/tabs.provider";
import ClassicMode from "../classic-mode/ClassicMode";
import { Stack, TabContent } from "../common";
import Tab from "../common/Tab";
import CustomProgram from "../custom-program/CustomProgram";
import Settings from "../settings/Settings";

const Wrapper = styled.div`
  margin-top: 2rem;
`;

const ModeSelect = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (i: number) => {
    setActiveTab(i);
  };

  return (
    <Wrapper>
      <TabsProvider value={activeTab}>
        <nav>
          <Stack
            gap={4}
            direction="row"
            justifyContent="space-between"
            role="tablist"
            aria-label="Select mode"
          >
            <Tab title="Classic" index={0} handleClick={handleClick} />
            <Tab title="Program" index={1} handleClick={handleClick} />
            <Tab title="Ramp Tempo" index={2} handleClick={handleClick} />
            <Tab title="Settings" index={3} handleClick={handleClick} />
          </Stack>
        </nav>
        <TabContent index={0}>
          <ClassicMode />
        </TabContent>
        <TabContent index={1}>
          <CustomProgram />
        </TabContent>
        <TabContent index={3}>
          <Settings />
        </TabContent>
      </TabsProvider>
    </Wrapper>
  );
};

export default ModeSelect;
