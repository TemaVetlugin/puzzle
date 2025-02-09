/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        appDir: true,
    },
    sassOptions: {
        includePaths: ['./shared'],
    },
}

module.exports = nextConfig
