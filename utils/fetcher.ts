
export type METHOD = 'POST' | 'DELETE' | 'GET' | 'PUT' | 'PATCH';

const baseUrl = process.env.NODE_ENV === 'production' ?
    'https://digitalfactory-041f7d6dfc2c.herokuapp.com' :
    'http://localhost:4444'

export async function fetcher<T>(
    url: string,
    method: METHOD,
    body?: object,
    headers?: HeadersInit
): Promise<T> {

    const res = await fetch(
        `${baseUrl}/${url}`,
        {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            credentials: 'include',
            body: body ? JSON.stringify(body): undefined,
        }) 

    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.')
    }

    return res.json()
}
