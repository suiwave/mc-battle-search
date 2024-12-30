export const generateThumbnailUrl = (url: string): string => {
  const videoIdMatch =
    url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/) ||
    url.match(/(?:https?:\/\/)?youtu\.be\/([\w-]+)/);
  if (!videoIdMatch) {
    return '/next.svg';
  }
  const videoId = videoIdMatch[1];
  return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
};
