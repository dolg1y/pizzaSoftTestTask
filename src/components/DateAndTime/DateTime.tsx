import React, { useEffect, useState } from 'react';
import Grid from '../layout/Grid';
import { Typography } from '@mui/material';

import styles from './DateTime.module.scss';

const DateTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<
    { date: string; time: string }[]
  >([]);

  const fetchTime = async () => {
    try {
      const apiKey = 'JH5WX01F4QWC';
      const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Europe/Moscow`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.formatted) {
        const dateObj = new Date(data.formatted);

        const formattedDate = dateObj.toLocaleDateString('ru-RU');
        const formattedTime = dateObj.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });

        setCurrentTime([{ date: formattedDate, time: formattedTime }]);
      } else {
        console.error('Поле formatted отсутствует в ответе API');
      }
    } catch (error) {
      console.error('Ошибка при получении времени:', error);
    }
  };

  useEffect(() => {
    fetchTime();
    const intervalId = setInterval(fetchTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid gap={12} className={styles.Date} direction="row">
      {currentTime.length > 0 ? (
        currentTime.map((item, index) => (
          <Grid gap={'33px'}>
            <Grid direction="column" alignItems="flex-start" key={index}>
              <Typography color="var(--color-text-second)">
                Время МСК
              </Typography>
              <Typography
                color="var(--color-text-primary)"
                fontWeight={600}
                fontSize={24}
              >
                {item.time}
              </Typography>
            </Grid>
            <Grid direction="column" alignItems="flex-start" key={index}>
              <Typography color="var(--color-text-second)">Сегодня</Typography>
              <Typography
                color="var(--color-text-primary)"
                fontWeight={600}
                fontSize={24}
              >
                {item.date}
              </Typography>
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid alignItems="center">
          <Typography fontWeight={600} fontSize={24}>
            Загружается
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default DateTime;
