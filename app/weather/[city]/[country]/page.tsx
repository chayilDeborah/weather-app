"use client";

import WeatherDetails from "../../../components/WeatherDetails";

export default function WeatherDetailsPage({
    params,
}: {
    params: { city: string; country: string };
}) {
    const cityName = decodeURIComponent(params.city);
    const country = decodeURIComponent(params.country);

    return <WeatherDetails cityName={cityName} countryCode={country} />;
} 