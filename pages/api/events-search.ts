import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const searchQuery = req.query.search ? `&q=${encodeURIComponent(req.query.search as string)}` : '';
  const response = await fetch(`https://kudago.com/public-api/v1.3/search/?page=1${searchQuery}&ctype=event&location=msk`);

  if (!response.ok) {
    res.status(response.status).json({ error: 'Failed to fetch events' });
    return;
  }

  const data = await response.json();
  res.status(200).json(data);
}