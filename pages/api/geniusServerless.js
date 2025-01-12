import GeniusApiService from '../../src/utils/geniusApiService';


const geniusApiService = new GeniusApiService(process.env.GENIUS_API_KEY);

export default async function handler(req, res) {
  const { title } = req.query;




  console.log('Incoming request parameters:', req.query);





  // At least song title must be providewd
  if (!title) {
    return res.status(400).json({ error: 'Missing song title parameter' });
  }

  try {





    console.log('Using API key:', process.env.GENIUS_API_KEY);
    console.log('Genius API Request:', `https://api.genius.com/search?q=${title}`);





    const metadata = await geniusApiService.getSongMetadata(title);
    const lyrics = await geniusApiService.getSongLyrics(metadata.id);

    // Return metadata and lyrics to the frontend
    res.status(200).json({
      metadata,
      lyrics,
    });
  } catch (error) {
    console.error('Error fetching song details:', error);
    res.status(500).json({ error: error.message });
  }
}
