import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CityCard } from '@/components/CityCard';
import * as weatherApi from '@/lib/weatherApi';

jest.mock('@/lib/weatherApi');

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || ''} />,
}));

const mockCity = {
  id: 80.97,
  name: 'Kyiv',
  country: 'UA',
  lat: 50.45,
  lon: 30.52,
};

const mockWeather = {
  temp: 20,
  feels_like: 18,
  humidity: 65,
  pressure: 1015,
  wind_speed: 5,
  visibility: 10000,
  clouds: 40,
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
};

describe('CityCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (weatherApi.getCurrentWeather as jest.Mock).mockResolvedValue(mockWeather);
  });

  it('renders card with city name', async () => {
    const onRemove = jest.fn();
    
    render(<CityCard city={mockCity} onRemove={onRemove} />);

    await waitFor(() => {
      expect(screen.getByText('Kyiv')).toBeInTheDocument();
    });
  });

  it('shows temperature from API', async () => {
    const onRemove = jest.fn();
    
    render(<CityCard city={mockCity} onRemove={onRemove} />);

    await waitFor(() => {
      expect(screen.getByText('20°C')).toBeInTheDocument();
    });
  });

  it('calls onRemove when delete button is clicked', async () => {
    const onRemove = jest.fn();
    
    render(<CityCard city={mockCity} onRemove={onRemove} />);

    await waitFor(() => {
      expect(screen.getByText('Kyiv')).toBeInTheDocument();
    });

    const removeButton = screen.getByLabelText('Remove city');
    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith(80.97);
  });

  it('refreshes weather when refresh button is clicked', async () => {
    const onRemove = jest.fn();
    
    render(<CityCard city={mockCity} onRemove={onRemove} />);

    await waitFor(() => {
      expect(screen.getByText('Kyiv')).toBeInTheDocument();
    });

    expect(weatherApi.getCurrentWeather).toHaveBeenCalledTimes(1);

    const refreshButton = screen.getByText('Refresh');
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(weatherApi.getCurrentWeather).toHaveBeenCalledTimes(2);
    });
  });

  it('shows error if API returns null', async () => {
    (weatherApi.getCurrentWeather as jest.Mock).mockResolvedValue(null);
    
    const onRemove = jest.fn();
    
    render(<CityCard city={mockCity} onRemove={onRemove} />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load weather')).toBeInTheDocument();
    });
  });
});
