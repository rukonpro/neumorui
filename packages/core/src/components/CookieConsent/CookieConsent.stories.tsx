import type { Meta, StoryObj } from "@storybook/react";
import { CookieConsent } from "./CookieConsent";

const meta: Meta<typeof CookieConsent> = {
  title: "Components/CookieConsent",
  component: CookieConsent,
};
export default meta;
type Story = StoryObj<typeof CookieConsent>;

export const Default: Story = {
  args: {
    title: "Cookie Preferences",
    description: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.",
    privacyLink: "#",
    options: [
      { label: "Essential", required: true, defaultChecked: true },
      { label: "Analytics", defaultChecked: true },
      { label: "Marketing", defaultChecked: false },
    ],
    onAccept: (selected) => console.log("Accepted:", selected),
    onCustomize: (selected) => console.log("Customized:", selected),
  },
};

export const Simple: Story = {
  args: {
    description: "This site uses cookies. Accept to continue.",
    onAccept: () => console.log("Accepted all"),
  },
};
