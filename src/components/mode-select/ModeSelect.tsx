import styled from "@emotion/styled";
import { useState } from "react";
import TabsProvider from "../../contexts/tab-context/tabs.provider";
import ClassicMode from "../classic-mode/ClassicMode";
import { Stack, TabContent } from "../common";
import Tab from "../common/Tab";
import CustomProgram from "../custom-program/CustomProgram";

const Wrapper = styled.div`
  margin-top: 2rem;
`;

const ModeSelect = () => {
  const [activeTab, setActiveTab] = useState(0);
  console.log(activeTab);

  const handleClick = (i: number) => {
    setActiveTab(i);
  };

  return (
    <Wrapper>
      <TabsProvider value={activeTab}>
        <Stack direction="row" justifyContent="space-between">
          <Tab title="Classic" index={0} handleClick={handleClick} />
          <Tab title="Program" index={1} handleClick={handleClick} />
        </Stack>
        <TabContent index={0}>
          <ClassicMode />
        </TabContent>
        <TabContent index={1}>
          <CustomProgram />
        </TabContent>
      </TabsProvider>
    </Wrapper>
  );
};

export default ModeSelect;
