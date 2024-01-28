export function getResponseExtension() {
  return (headers: Record<string, string>) => {
    const contentType = headers['content-type'];

    if (!contentType) {
      return '';
    }
    if (contentType.includes('application/json')) {
      return 'json';
    }
    if (contentType.includes('text/html')) {
      return 'html';
    }

    return '';
  };
}
