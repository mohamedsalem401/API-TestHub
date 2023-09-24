export function downloadFile(file: string, fileName = "", extension: string): void {
  const downloadLink = document.createElement("a");

  const blob = new Blob([file], { type: `application/${extension}` });

  const url = window.URL.createObjectURL(blob);

  downloadLink.href = url;
  downloadLink.download = `${fileName}.${extension}`;

  downloadLink.click();

  window.URL.revokeObjectURL(url);
  downloadLink.remove();
}
