// Project media lives on Cloudinary, which serves whatever size the original
// holds. Asking for a right-sized, auto-format copy turns multi-megabyte
// originals into a fraction of the bytes — the biggest single weight win on
// mobile, where every project image was previously downloaded at full size.
const UPLOAD = "/image/upload/";

export function sizedImage(src, width) {
  if (typeof src !== "string" || !width) return src;

  const at = src.indexOf(UPLOAD);
  if (at === -1) return src;

  const rest = src.slice(at + UPLOAD.length);
  // Only untouched originals are rewritten; anything already transformed or
  // not versioned (a relative path, a non-Cloudinary host) passes through.
  if (!/^v\d+\//.test(rest)) return src;

  return `${src.slice(0, at)}${UPLOAD}f_auto,q_auto,c_limit,w_${width}/${rest}`;
}