import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightKbd from 'starlight-kbd'

export default defineConfig({
  integrations: [
    starlight({
      description: '// TODO(HiDeoo) ',
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-kbd/edit/main/docs/',
      },
      plugins: [
        starlightKbd({
          types: [
            { id: 'mac', label: 'macOS' },
            { id: 'windows', label: 'Windows', default: true },
          ],
        }),
      ],
      sidebar: [
        // TODO(HiDeoo)
        // {
        //   label: 'Start Here',
        //   items: ['getting-started'],
        // },
        // {
        //   label: 'Guides',
        //   items: ['guides/actions', 'guides/i18n'],
        // },
        // TODO(HiDeoo)
        // {
        //   label: 'Resources',
        //   items: [{ label: 'Plugins and Tools', slug: 'resources/starlight' }],
        // },
        // TODO(HiDeoo)
        // {
        //   label: 'Demo',
        //   items: ['demo/video-guides', 'demo/video-courses'],
        // },
      ],
      social: {
        blueSky: 'https://bsky.app/profile/hideoo.dev',
        github: 'https://github.com/HiDeoo/starlight-kbd',
      },
      // TODO(HiDeoo) casing here
      title: 'Starlight Kbd',
    }),
  ],
  site: 'https://starlight-kbd.netlify.app/',
})
