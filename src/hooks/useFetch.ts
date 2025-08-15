export interface FetchOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
}

export const useFetch = () => {
  return async <Response>({
    url,
    method,
    body = undefined,
    headers = {},
  }: FetchOptions): Promise<Response> => {
    try {
      const access_key = process.env.MEDIASTACK_ACCESS_KEY;

      if (!access_key) {
        throw new Error(
          'MediaStack API access key is not configured. Please check your environment variables.',
        );
      }

      const urlWithKey = new URL(url);
      urlWithKey.searchParams.set('access_key', access_key);

      const response = await fetch(urlWithKey.toString(), {
        method,
        headers,
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };
};
