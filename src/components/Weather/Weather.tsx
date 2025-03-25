import React, { useEffect, useState } from 'react';
import Grid from '../layout/Grid';
import { Typography } from '@mui/material';
import styles from './Weather.module.scss';
import { ReactComponent as IconWind } from '../../assets/svg/iconWind.svg';
import { ReactComponent as IconFallout } from '../../assets/svg/iconFallout.svg';

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{
    city: string;
    description: string;
    temperature: number;
    wind: number;
    precipitation: number;
  } | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?id=487846&appid=76d3baeecdff154ba3f226d86826d5d7&lang=ru&units=metric'
        );
        const data = await response.json();

        setWeatherData({
          city: data.name,
          description: data.weather[0].description,
          temperature: Math.round(data.main.temp),
          wind: Math.round(data.wind.speed),
          precipitation: data.rain ? Math.round(data.rain['1h']) : 0,
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных погоды:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Grid className={styles.Weather}>
      <Grid className={styles.Weather__CityInfo}>
        <Grid justifyContent="space-between" direction="column" gap={12}>
          <Typography fontSize={14} color="rgba(248, 248, 248, 1)">
            {weatherData?.city || 'Загрузка...'}
          </Typography>
          <Typography fontSize={12} color="#F9F9F9CC">
            {weatherData?.description
              ? weatherData.description.charAt(0).toUpperCase() +
                weatherData.description.slice(1)
              : 'Загрузка...'}
          </Typography>
        </Grid>
        <Grid>
          <Typography fontSize={52} color="rgba(248, 248, 248, 1)">
            {weatherData?.temperature !== undefined
              ? `${weatherData.temperature}°`
              : '...'}
          </Typography>
        </Grid>
      </Grid>
      <Grid className={styles.Weather__TempInfo} direction="column">
        <Grid
          className={styles.TempInfo__conditions}
          justifyContent="space-between"
        >
          <Grid className={styles.conditions}>
            <Typography fontSize={12} color="#F9F9F9CC">
              Ветер
            </Typography>
            <IconWind></IconWind>
          </Grid>
          <Typography color="rgba(248, 248, 248, 1)">
            {weatherData?.wind !== undefined
              ? `${weatherData.wind} м/с`
              : '...'}
          </Typography>
        </Grid>
        <Grid
          className={styles.TempInfo__conditions}
          justifyContent="space-between"
        >
          <Grid className={styles.conditions}>
            <Typography fontSize={12} color="#F9F9F9CC">
              Осадки
            </Typography>
            <IconFallout />
          </Grid>
          <Typography color="rgba(248, 248, 248, 1)">
            {weatherData?.precipitation !== undefined
              ? `${weatherData.precipitation} мм`
              : '...'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Weather;
