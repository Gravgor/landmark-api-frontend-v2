import { Metadata } from 'next';

export function generateMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://landmark-api.com';
  const fullUrl = `${baseUrl}${path}`;
  const imageUrl = image || `${baseUrl}/og-image.jpg`;

  return {
    title: `${title} | Landmark API`,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Landmark API',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@landmark_api',
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
} 