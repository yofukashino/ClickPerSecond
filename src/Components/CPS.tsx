import { React } from "replugged/common";
import { Flex, Text } from "replugged/components";
const ClicksPerSecond = ({ children }: { children: React.ReactElement }) => {
  const [clicks, setClicks] = React.useState(0);
  const [cps, setCps] = React.useState(null);
  const lastClickTime = React.useRef(null);
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
    const clicksInterval = setInterval(() => {
      setClicks(0);
    }, 1000);
    const cpsInterval = setInterval(() => {
      if (lastClickTime.current == null || (Date.now() - lastClickTime.current) / 1000 > 1)
        setCps(null);
    }, 1500);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      clearInterval(clicksInterval);
      clearInterval(cpsInterval);
    };
  }, []);
  React.useEffect(() => {
    setCps(clicks);
  }, [clicks]);
  return (
    <Flex justify={Flex.Justify.CENTER} key={cps}>
      {cps != null ? (
        <span>
          <Text.H2>{cps}</Text.H2>
        </span>
      ) : (
        children
      )}
    </Flex>
  );
};

export default (homeButton: React.ReactElement) => <ClicksPerSecond>{homeButton}</ClicksPerSecond>;
