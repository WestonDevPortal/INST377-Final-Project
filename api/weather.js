
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${location}`;
    const response = await fetch(url);
    const data = await response.json();

    await supabase.from('history').insert([{ location }]);

    res.status(200).json({
      temperature: data.current.temperature,
      feelsLike: data.current.feelslike,
      windSpeed: data.current.wind_speed,
      condition: data.current.weather_descriptions[0]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
