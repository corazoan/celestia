import { env } from "./env";
import crypto from "crypto";
import { errorHandler, returnHandler } from "../utils/utils";

export const uploadToCloudinary = async (
  input: Buffer | string,
  options: { folder?: string; filename?: string; contentType?: string } = {},
) => {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;

  // timestamp for signature
  const timestamp = Math.floor(Date.now() / 1000);

  // Build signature params - include only the params you actually send (folder here)
  const paramsToSign: Record<string, string | number> = { timestamp };
  if (options.folder) paramsToSign.folder = options.folder;

  // Create the signature string: sorted key=value pairs joined by & + apiSecret
  const toSign =
    Object.keys(paramsToSign)
      .sort()
      .map((k) => `${k}=${paramsToSign[k]}`)
      .join("&") + apiSecret;

  const signature = crypto.createHash("sha1").update(toSign).digest("hex");

  // Build multipart form data
  const fd = new FormData();

  // Handle different input types
  if (typeof input === "string") {
    // If input is a string (URL), append it directly
    fd.append("file", input);
  } else {
    const uint8 = new Uint8Array(input);
    // If input is a Buffer, create a Blob
    const blob = new Blob([uint8], {
      type: options.contentType ?? "application/octet-stream",
    });
    fd.append("file", blob, options.filename ?? "upload.jpg");
  }

  // Required auth fields
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  fd.append("signature", signature);

  if (options.folder) fd.append("folder", options.folder);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const [response, responseError] = await fetch(url, {
    method: "POST",
    body: fd,
  })
    .then(returnHandler)
    .catch(errorHandler);

  if (responseError) {
    return [null, responseError] as const;
  }

  if (!response.ok) {
    const text = await response.text();
    return [
      null,
      new Error(`Cloudinary upload failed: ${response.status} ${text}`),
    ] as const;
  }

  const [json, jsonError] = await response
    .json()
    .then(returnHandler)
    .catch(errorHandler);

  if (jsonError) {
    return [null, jsonError] as const;
  }

  return [json, null] as const;
};
