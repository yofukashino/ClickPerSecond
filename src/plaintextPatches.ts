import Types from "./types";

export default [
  {
    find: "Messages.DISCODO_DISABLED",
    replacements: [
      {
        match: /(\.BUTTON_HOME}}},children:)(\(0,\w+\.jsx\)\(\w+\.default,{}\))/,
        replace: (_: string, prefix: string, homeButton: string) =>
          `${prefix}replugged.plugins.getExports("dev.yofukashino.ClickPerSecond")?._CPS?.(${homeButton})`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
