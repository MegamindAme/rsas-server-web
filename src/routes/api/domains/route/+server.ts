import {error, json} from '@sveltejs/kit';

export const GET = async ({url}) => {
    const domain = url.searchParams.get('domain');

    try {
        const response = await fetch(domain);

        return json(await response.json());
    } catch (err) {
        return error(400, err.message)
    }

    return json("");
}

export const POST = async ({url, request}) => {
    const domain = url.searchParams.get('domain');
    const body = await request.json();

    try {
       const response = await fetch(domain, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

       return json(await response.json());
    } catch (err) {
        return error(400, err.message)
    }

    return json({});
}