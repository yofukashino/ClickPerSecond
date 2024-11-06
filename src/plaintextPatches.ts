import Types from "./types";

export default [
  {
    find: '("discodo")',
    replacements: [
      {
        match: /(\.BUTTON_HOME}}},children:)(\(0,.\.jsx\)\(.\..,{}\))/,
        replace: (_: string, prefix: string, homeButton: string) =>
          `${prefix}replugged.plugins.getExports("dev.yofukashino.ClickPerSecond")?._CPS?.(${homeButton})`,
      },
    ],
  },  
] as Types.DefaultTypes.PlaintextPatch[];
