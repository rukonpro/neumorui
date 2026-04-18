import type { Meta, StoryObj } from "@storybook/react";
import { WeatherCard } from "./WeatherCard";

const meta: Meta<typeof WeatherCard> = {
  title: "Components/WeatherCard",
  component: WeatherCard,
};

export default meta;
type Story = StoryObj<typeof WeatherCard>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <WeatherCard
        location="Dhaka, Bangladesh"
        temperature={32}
        condition="Partly Cloudy"
        icon="⛅"
        humidity={78}
        wind="12 km/h"
        feelsLike={36}
        forecast={[
          { day: "Mon", icon: "☀️", high: 34, low: 26 },
          { day: "Tue", icon: "⛅", high: 32, low: 25 },
          { day: "Wed", icon: "🌧️", high: 29, low: 24 },
          { day: "Thu", icon: "⛈️", high: 28, low: 23 },
          { day: "Fri", icon: "☀️", high: 33, low: 25 },
        ]}
      />
    </div>
  ),
};
