// Returns the correct URL from strapi media
export function getImageURL(photo: UserPhoto | MediaAttributes) {
  return photo.url.startsWith("/")
    ? `${process.env.STRAPI_API_URL}${photo.url}?v=${photo.updatedAt}`
    : photo.url;
}
