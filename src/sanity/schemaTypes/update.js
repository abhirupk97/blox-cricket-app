export default {
  name: 'gameUpdate',
  title: 'Game Update',
  type: 'document',
  fields: [
    {
      name: 'version',
      title: 'Version / Title',
      type: 'string',
      description: 'e.g., Version 1.5.0: Added new stadiums'
    },
    {
      name: 'description',
      title: 'Update Description',
      type: 'text',
      description: 'Brief details about what changed or got fixed.'
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    }
  ]
}