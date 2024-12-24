export async function checkFileType(url: string): Promise<any> {
  try {
    const response = await fetch(url, { method: "HEAD" });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch file: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get("content-type");

    if (!contentType) {
      throw new Error("No content-type header found.");
    }

    if (contentType.includes("image")) {
      return true;
    } else if (contentType.includes("pdf")) {
      return false;
    }
  } catch (error) {
    console.error("Error fetching file type:", error);
    return false;
  }
}
