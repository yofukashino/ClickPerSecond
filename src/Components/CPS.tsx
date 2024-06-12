import { React } from "replugged/common";
import { Flex, Text } from "replugged/components";
const ClicksPerSecond = ({ children }: { children: React.ReactElement }) => {
  const [clicks, setClicks] = React.useState(0);
  const [cps, setCps] = React.useState(null);
  const lastClickTime = React.useRef(null);
  const [rightClicks, setRightClicks] = React.useState(0);
  const [rcps, setRcps] = React.useState(null);
  const lastRightClickTime = React.useRef(null);
  React.useEffect(() => {
    const handleClick = () => {
      const now = Date.now();
      if (lastClickTime.current) {
        const timeDiff = (now - lastClickTime.current) / 1000;
        const newCps = 1 / timeDiff;
        setCps(Number(newCps.toFixed(0)));
      }
      lastClickTime.current = now;
      setClicks((prevClicks) => prevClicks + 1);
    };
    const handleRightClick = () => {
      const now = Date.now();
      if (lastRightClickTime.current) {
        const timeDiff = (now - lastRightClickTime.current) / 1000;
        const newCps = 1 / timeDiff;
        setRcps(Number(newCps.toFixed(0)));
      }
      lastRightClickTime.current = now;
      setRightClicks((prevClicks) => prevClicks + 1);
    };
    const clicksInterval = setInterval(() => {
      setClicks(0);
    }, 1000);
    const rightClicksInterval = setInterval(() => {
      setRightClicks(0);
    }, 1000);
    const cpsInterval = setInterval(() => {
      if (lastClickTime.current == null || (Date.now() - lastClickTime.current) / 1000 > 1)
        setCps(null);
    }, 1500);
    const rcpsInterval = setInterval(() => {
      if (
        lastRightClickTime.current == null ||
        (Date.now() - lastRightClickTime.current) / 1000 > 1
      )
        setRcps(null);
    }, 1500);
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleRightClick);
    return () => {
      clearInterval(clicksInterval);
      clearInterval(rightClicksInterval);
      clearInterval(cpsInterval);
      clearInterval(rcpsInterval);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);
  React.useEffect(() => {
    setCps(clicks);
    setRcps(rightClicks);
  }, [clicks, rightClicks]);
  return (
    <Flex justify={Flex.Justify.CENTER} key={cps || rcps}>
      {cps != null && rcps != null ? (
        <span>
          <Text.H2>
            {cps}|{rcps}
          </Text.H2>
        </span>
      ) : (
        children
      )}
    </Flex>
  );
};

export default (homeButton: React.ReactElement) => <ClicksPerSecond>{homeButton}</ClicksPerSecond>;
