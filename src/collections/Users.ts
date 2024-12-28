import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'credits',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Available credits for pay-as-you-go usage',
      },
    },
  ],
}
