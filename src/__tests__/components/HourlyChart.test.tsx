import { render, screen } from "@testing-library/react";
import { HourlyChart } from "@/components/HourlyChart";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || ""} />,
}));

const mockHourlyData = [
  {
    dt: 1699380000,
    temp: 15,
    icon: "01d",
    description: "clear sky",
  },
  {
    dt: 1699390800,
    temp: 18,
    icon: "02d",
    description: "cloudy",
  },
  {
    dt: 1699401600,
    temp: 20,
    icon: "01d",
    description: "clear sky",
  },
];

describe("HourlyChart", () => {
  it("renders SVG chart", () => {
    render(<HourlyChart data={mockHourlyData} />);

    const chart = screen.getByTestId("hourly-graph");
    expect(chart).toBeInTheDocument();
    expect(chart.tagName.toLowerCase()).toBe("svg");
  });

  it("shows minimum and maximum temperature", () => {
    render(<HourlyChart data={mockHourlyData} />);

    expect(screen.getByText("Min: 15°C")).toBeInTheDocument();
    expect(screen.getByText("Max: 20°C")).toBeInTheDocument();
  });

  it("renders weather icons for each hour", () => {
    render(<HourlyChart data={mockHourlyData} />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(mockHourlyData.length);
  });

  it("does not crash with empty data array", () => {
    render(<HourlyChart data={[]} />);

    expect(screen.queryByTestId("hourly-graph")).not.toBeInTheDocument();
  });
});
