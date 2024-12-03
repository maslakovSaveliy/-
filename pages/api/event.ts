import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(`https://kudago.com/public-api/v1.2/events/?fields=id,title,place,description,price,tags,images&location=msk&ids=${req.query.id}`);
  
  if (!response.ok) {
    res.status(response.status).json({ error: 'Failed to fetch events' });
    return;
  }

  const data = await response.json();
  res.status(200).json(data);
}