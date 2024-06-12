import { Logger } from "replugged";
import "./style.css";

export const PluginLogger = Logger.plugin("ClickPerSecond", "#b380ff");

export { default as _CPS } from "./Components/CPS";
