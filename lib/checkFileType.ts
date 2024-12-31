export async function checkFileType(url: string): Promise<any> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");
    if (contentType?.includes("image")) {
      return "image";
    } else if (contentType === "application/pdf") {
      return "pdf";
    }
    return null;
  } catch (error) {
    console.error("Error fetching file type:", error);
    return null;
  }
}
