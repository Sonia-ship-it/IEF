export const FALLBACK_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';

export const FALLBACK_SERVICE_IMAGE =
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80';

export const FALLBACK_AVATAR_IMAGE =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80';

export function getProductImage(images?: string[] | null, index = 0): string {
  const url = images?.[index];
  return url && url.trim() !== '' ? url : FALLBACK_PRODUCT_IMAGE;
}

export function getServiceImage(image?: string | null): string {
  return image && image.trim() !== '' ? image : FALLBACK_SERVICE_IMAGE;
}

export function getAvatarImage(avatar?: string | null): string {
  return avatar && avatar.trim() !== '' ? avatar : FALLBACK_AVATAR_IMAGE;
}
