import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'x3rrcgu8',
  dataset: 'production',
  apiVersion: '2024-01-01', // Using a newer API version
  useCdn: false, // Forcing it to bypass the Edge network
})