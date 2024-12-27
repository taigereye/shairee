import GeniusApiService from '../../geniusApiService';


const geniusApiService = new GeniusApiService(process.env.GENIUS_API_KEY);

export default async function handler(req, res) {
  const { title, artist } = req.query;

  // Validate that both title and artist are provided
  if (!title || !artist) {
    return res.status(400).json({ error: 'Missing title or artist parameter' });
  }

  try {
    // Fetch song metadata using the GeniusApiService
    const metadata = await geniusApiService.getSongMetadata(title, artist);

    // Optionally fetch song lyrics if needed
    const lyrics = await geniusApiService.getSongLyrics(metadata.id);

    // Return metadata and lyrics to the frontend
    res.status(200).json({
      metadata,
      lyrics,
    });
  } catch (error) {
    // Catch errors from GeniusApiService and return 500 error
    console.error('Error fetching song details:', error);
    res.status(500).json({ error: error.message });
  }
}
