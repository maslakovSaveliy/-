import withPWA from 'next-pwa';

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})({
  images: {
    domains: ['media.kudago.com'],
  },
});

export default config;
