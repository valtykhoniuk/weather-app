import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddCityForm } from "@/components/AddCityForm";
import * as weatherApi from "@/lib/weatherApi";

jest.mock("@/lib/weatherApi");

const mockSearchResults = [
  {
    name: "Kyiv",
    lat: 50.45,
    lon: 30.52,
    country: "UA",
    state: "Kyiv City",
  },
  {
    name: "Kharkiv",
    lat: 49.99,
    lon: 36.23,
    country: "UA",
    state: "Kharkiv Oblast",
  },
];

describe("AddCityForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input field and search button", () => {
    const onAddCity = jest.fn();
    const cityExists = jest.fn(() => false);

    render(<AddCityForm onAddCity={onAddCity} cityExists={cityExists} />);

    expect(screen.getByTestId("city-search-input")).toBeInTheDocument();
    expect(screen.getByTestId("city-search-button")).toBeInTheDocument();
  });

  it("shows error if field is empty", async () => {
    const onAddCity = jest.fn();
    const cityExists = jest.fn(() => false);

    render(<AddCityForm onAddCity={onAddCity} cityExists={cityExists} />);

    const button = screen.getByTestId("city-search-button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Enter city name")).toBeInTheDocument();
    });
  });

  it("shows search results", async () => {
    (weatherApi.searchCities as jest.Mock).mockResolvedValue(mockSearchResults);

    const onAddCity = jest.fn();
    const cityExists = jest.fn(() => false);

    render(<AddCityForm onAddCity={onAddCity} cityExists={cityExists} />);

    const input = screen.getByTestId("city-search-input");
    await userEvent.type(input, "Kyiv");

    const button = screen.getByTestId("city-search-button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Kyiv")).toBeInTheDocument();
      expect(screen.getByText("Kharkiv")).toBeInTheDocument();
    });
  });

  it("calls onAddCity when city is selected", async () => {
    (weatherApi.searchCities as jest.Mock).mockResolvedValue(mockSearchResults);

    const onAddCity = jest.fn();
    const cityExists = jest.fn(() => false);

    render(<AddCityForm onAddCity={onAddCity} cityExists={cityExists} />);

    const input = screen.getByTestId("city-search-input");
    await userEvent.type(input, "Kyiv");
    fireEvent.click(screen.getByTestId("city-search-button"));

    await waitFor(() => {
      expect(screen.getByText("Kyiv")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Kyiv"));

    expect(onAddCity).toHaveBeenCalledWith({
      id: "50.45-30.52",
      name: "Kyiv",
      country: "UA",
      lat: 50.45,
      lon: 30.52,
    });
  });

  it("shows error if city already exists in list", async () => {
    (weatherApi.searchCities as jest.Mock).mockResolvedValue(mockSearchResults);

    const onAddCity = jest.fn();

    const cityExists = jest.fn(() => true);

    render(<AddCityForm onAddCity={onAddCity} cityExists={cityExists} />);

    const input = screen.getByTestId("city-search-input");
    await userEvent.type(input, "Kyiv");
    fireEvent.click(screen.getByTestId("city-search-button"));

    await waitFor(() => {
      expect(screen.getByText("Kyiv")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Kyiv"));

    expect(
      screen.getByText("This city is already in your list")
    ).toBeInTheDocument();

    expect(onAddCity).not.toHaveBeenCalled();
  });

  it("shows message if city not found", async () => {
    (weatherApi.searchCities as jest.Mock).mockResolvedValue([]);

    const onAddCity = jest.fn();
    const cityExists = jest.fn(() => false);

    render(<AddCityForm onAddCity={onAddCity} cityExists={cityExists} />);

    const input = screen.getByTestId("city-search-input");
    await userEvent.type(input, "nonexistentcity");
    fireEvent.click(screen.getByTestId("city-search-button"));

    await waitFor(() => {
      expect(
        screen.getByText("City not found. Try another name.")
      ).toBeInTheDocument();
    });
  });
});
