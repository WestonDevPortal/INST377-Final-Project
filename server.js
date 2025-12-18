
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static('public'));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.get('/api/weather', async (req, res) => {
  try {
    const location = req.query.location;
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${location}`;
    const response = await fetch(url);
    const data = await response.json();

    const temp = data.current.temperature;
    const feels = data.current.feelslike;
    const wind = data.current.wind_speed;

    await supabase.from('history').insert([{ location }]);

    res.json({
      temperature: temp,
      feelsLike: feels,
      windSpeed: wind,
      condition: data.current.weather_descriptions[0]
    });
  } catch {
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

app.get('/api/history', async (req, res) => {
  const { data } = await supabase.from('history').select('*').order('created_at', { ascending: false });
  res.json(data);
});

app.listen(3000, () => console.log('Server running on port 3000'));
