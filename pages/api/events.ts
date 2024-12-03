import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const timestamp = Math.floor(Date.now() / 1000);
	const response = await fetch(
		`https://kudago.com/public-api/v1.2/events/?fields=id,categories,title,place,description,price,tags,images&location=msk&actual_since=${timestamp}&categories=party,concert&expand=images,place,dates`,
	);

	if (!response.ok) {
		res.status(response.status).json({ error: "Failed to fetch events" });
		return;
	}

	const data = await response.json();
	res.status(200).json(data);
}
