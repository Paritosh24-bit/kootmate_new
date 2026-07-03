/**
 * Core R2 and Simulated Fallback storage service integrations for Kootmate.
 */

export interface R2UploadResult {
  success: boolean;
  url: string;
  filename: string;
  key: string;
  storage: 'r2' | 'local_simulation';
  error?: string;
}

export interface R2DeleteResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Upload general file payload to Cloudflare R2 storage / local fallback.
 */
export async function uploadToR2(file: File, fileType: 'pdf' | 'audio' | 'general' = 'general'): Promise<R2UploadResult> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", fileType);

    const response = await fetch("/api/r2/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload request failed: ${errorText || response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`[uploadToR2 Error]:`, error);
    return {
      success: false,
      url: "",
      filename: "",
      key: "",
      storage: "local_simulation",
      error: error.message || "Failed to upload file to backend."
    };
  }
}

/**
 * Upload a syllabus PDF Note / Textbook unit to storage and return its public URL.
 */
export async function uploadPDF(file: File): Promise<R2UploadResult> {
  return uploadToR2(file, 'pdf');
}

/**
 * Upload an MP3 textbook explanation / lecture podcast to storage and return its public URL.
 */
export async function uploadAudio(file: File): Promise<R2UploadResult> {
  return uploadToR2(file, 'audio');
}

/**
 * Remove an uploaded item from storage (either Cloudflare R2 bucket or local file directory)
 */
export async function deleteFromR2(key: string, filename?: string, storageType: 'r2' | 'local_simulation' = 'r2'): Promise<R2DeleteResult> {
  try {
    const response = await fetch("/api/r2/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        filename,
        storage: storageType,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Delete request failed: ${errorText || response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`[deleteFromR2 Error]:`, error);
    return {
      success: false,
      error: error.message || "Failed to remove asset from backend storage."
    };
  }
}
