import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Landmark API',
        short_name: 'LMAPI',
        description:  "A powerful API for accessing detailed information about landmarks around the world.",
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#007bff',
        icons: [
            {
                src: "./favicon.ico",
                sizes: "192x192",
                type: "image/png"
            }
        ]
    }
}