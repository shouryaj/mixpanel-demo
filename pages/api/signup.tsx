// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Mixpanel from 'mixpanel';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const mixpanel = Mixpanel.init('fb24bac723aa2227b14b30dd0484f832');

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method === 'POST') {
    const { name, email, password }: FormData = req.body;
    console.log('Received form data:', { name, email, password });
    mixpanel.track("API: FORM SUBMIT SUCCESS")
    res.status(200).json({ message: 'Form data received successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}