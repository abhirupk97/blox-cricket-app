export default {
  name: 'mediaItem',
  title: 'Media Gallery Item',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'category', title: 'Category (e.g., OFFICIAL TRAILER)', type: 'string' },
    { name: 'type', title: 'Type', type: 'string', options: { list: ['video', 'image'] } },
    { name: 'duration', title: 'Duration or text (e.g., 01:52 or IMAGE)', type: 'string' },
    { name: 'date', title: 'Date (e.g., 03/06/2026)', type: 'string' },
    { name: 'thumb', title: 'Thumbnail Image', type: 'image' },
  ]
}