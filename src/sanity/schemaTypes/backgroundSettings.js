export default {
  name: 'backgroundSettings',
  title: 'Scrolling Background Sequences',
  type: 'document',
  fields: [
    {
      name: 'homeSequence',
      title: 'Home Page Sequence',
      description: 'Add backgrounds that will fade as you scroll down the MAIN OVERVIEW page.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Background Layer',
          fields: [
            { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } },
            { name: 'videoUrl', title: 'Or Video URL', type: 'url' }
          ]
        }
      ]
    },
    {
      name: 'latestSequence',
      title: 'Latest Updates Page Sequence',
      description: 'Add backgrounds that will fade as you scroll down the GAME LATEST page.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Background Layer',
          fields: [
            { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } },
            { name: 'videoUrl', title: 'Or Video URL', type: 'url' }
          ]
        }
      ]
    }
  ]
}