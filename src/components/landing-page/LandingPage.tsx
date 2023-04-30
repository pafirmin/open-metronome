import { useState } from "react";
import { useMetronome } from "../../hooks";

const LandingPage = () => {
  const { initAudioCtx } = useMetronome();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    await initAudioCtx();

    setIsLoading(false);
  };

  return <div></div>;
};

export default LandingPage;
