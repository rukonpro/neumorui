import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "NeumorUI — Neumorphic Components",
    brandUrl: "https://neumorui.vercel.app",
    brandImage: "https://raw.githubusercontent.com/rukonpro/neumorui/master/apps/docs/public/favicon.svg",
  }),
});
