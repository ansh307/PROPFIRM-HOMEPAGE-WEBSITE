import { createClient } from "contentful";

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  environment: process.env.CONTENTFUL_ENVIRONMENT!, 
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,

});