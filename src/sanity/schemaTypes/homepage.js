export default {
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Internal Title (Just type "Main Page" here)',
      type: 'string',
    },
    {
      name: 'bgImage',
      title: 'Website Background Image',
      type: 'image',
      options: { hotspot: true }, // Allows you to crop the image in Sanity!
    },
    {
      name: 'heroTitle',
      title: 'Hero Mega Title (e.g., BLOX CRICKET)',
      type: 'string',
    },
    {
      name: 'heroText',
      title: 'Hero Subtext',
      type: 'text',
    },
    {
      name: 'infoQuote',
      title: 'Info Box Quote',
      type: 'text',
    },
    {
      name: 'aboutDevText',
      title: 'About Dev Description',
      type: 'text',
    },
    {
      name: 'devNames',
      title: 'Developer Profiles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name (e.g., Flero)', type: 'string' },
            { name: 'role', title: 'Role (e.g., Lead Developer)', type: 'string' },
            { name: 'bio', title: 'Bio / Info', type: 'text' }
          ]
        }
      ],
    },
    {
      name: 'aboutGameText',
      title: 'About Game Description',
      type: 'text',
    },
    {
      name: 'aboutGameMedia',
      title: 'About Game Image',
      type: 'image',
    },
    {
      name: 'mediaText',
      title: 'Game Pics / Video Description',
      type: 'text',
    },
    {
      name: 'mediaMainImage',
      title: 'Main Media Image',
      type: 'image',
    },
    {
      name: 'navLogoWhite',
      title: 'Navbar Logo (White Text)',
      type: 'string',
    },
    {
      name: 'navLogoNeon',
      title: 'Navbar Logo (Neon Text)',
      type: 'string',
    },
    {
      name: 'playerName',
      title: 'Player Name (Top Right)',
      type: 'string',
    },
  ]
}