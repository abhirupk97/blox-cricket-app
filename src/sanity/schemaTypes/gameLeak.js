export default {
  name: 'gameLeak',
  title: 'Game Leak',
  type: 'document',
  fields: [
    { name: 'title', title: 'Leak Title', type: 'string' },
    { name: 'description', title: 'Leak Description', type: 'text' },
    { name: 'image', title: 'Leak Image', type: 'image' },
    { name: 'date', title: 'Publish Date', type: 'datetime' },
  ]
}