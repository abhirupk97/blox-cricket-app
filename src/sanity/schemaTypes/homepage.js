export default {
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    { name: 'title', title: 'Internal Title', type: 'string' },
    { 
      name: 'bgVideo', 
      title: 'Website Background Video', 
      type: 'file', 
      options: { accept: 'video/mp4, video/webm' } 
    },
    { name: 'bgImage', title: 'Website Background Image', type: 'image', options: { hotspot: true } },
    { name: 'heroTitle', title: 'Hero Mega Title', type: 'string' },
    { name: 'heroText', title: 'Hero Subtext', type: 'text' },
    { name: 'infoQuote', title: 'Info Box Quote', type: 'text' },
    
    // --- DEVS SECTION ---
    { name: 'aboutDevLine', title: 'About Dev Line', type: 'string' },
    { name: 'aboutDevText', title: 'About Dev Main Text', type: 'text' },
    
    // REPLACE THE OLD SINGLE DEV FIELDS WITH THIS ARRAY:
    {
      name: 'developers',
      title: 'Developer Profiles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'developer',
          fields: [
            { name: 'name', title: 'Developer Name', type: 'string' },
            { name: 'role', title: 'Developer Role', type: 'string' },
            { name: 'bio', title: 'Developer Bio', type: 'text' },
            { 
              name: 'skills', 
              title: 'Developer Skills', 
              type: 'array', 
              of: [{ type: 'string' }] 
            }
          ],
          preview: {
            select: { title: 'name', subtitle: 'role' }
          }
        }
      ]
    },

    // --- ABOUT GAME SECTION ---
    { name: 'aboutGameText', title: 'About Game Description', type: 'text' },
    { name: 'aboutGameMedia', title: 'About Game Image', type: 'image' },
    { name: 'aboutGameSubline', title: 'About Game Subline', type: 'string' },
    {
      name: 'gameFeatures',
      title: 'About Game Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Feature Description', type: 'text' }
          ],
          preview: {
            select: { title: 'title' }
          }
        }
      ]
    },

    // --- MEDIA & NAVBAR ---
    { name: 'navLogoWhite', title: 'Navbar Logo (White Text)', type: 'string' },
    { name: 'navLogoNeon', title: 'Navbar Logo (Neon Text)', type: 'string' },
    { name: 'playerName', title: 'Player Name (Top Right)', type: 'string' },

    // --- ROADMAP ---
    { name: 'roadmapText', title: 'Roadmap Terminal Text', type: 'string' },
    { name: 'roadmapImage', title: 'Roadmap Image', type: 'image' }
  ]
};