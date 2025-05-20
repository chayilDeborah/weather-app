export interface City {
    name: string;
    state?: string;
    country: string;
    temp: number;
    weather: string;
    id: number;
    favorite: boolean;
}

export interface WeatherResponse {
    main: {
        temp: number;
    };
    weather: [{
        main: string;
        description: string;
    }];
} 