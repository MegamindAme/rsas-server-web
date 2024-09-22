import {error, json} from '@sveltejs/kit';
import {eq} from 'drizzle-orm';
import {domainsTable} from '../../../lib/database/schema';
import {database} from '../../../lib/database/database.server';

export async function GET() {

    const domains = await database
        .select({
            id: domainsTable.id,
            name: domainsTable.name,
            rsasDomain: domainsTable.rsasDomain,
            apiDomain: domainsTable.apiDomain
        })
        .from(domainsTable);

    return json(domains);
}

export const PUT = async ({request}) => {
    const body = await request.json();

    if (!body?.id) {
        return error(400, "Id isn't defined");
    }

    if (!body?.name) {
        return error(400, "The name has to be defined");
    }

    if (!body?.rsasDomain) {
        return error(400, "The rsas Domain has to be defined");
    }

    if (!body?.apiDomain) {
        return error(400, "The web Domain has to be defined");
    }

    if (body?.name == "main_server") {
        return error(400, "Name: main_server is a reserved name, use another name");
    }

    const domain = await database
        .update(domainsTable)
        .set({
            id: body.id,
            name: body.name,
            rsasDomain: body.rsasDomain,
            apiDomain: body.apiDomain
        })
        .where(eq(domainsTable.id, body?.id))
        .execute();

    return json(domain);
}

export const POST = async ({request}) => {
    const body = await request.json();

    if (!body?.name) {
        return error(400, "The name has to be defined");
    }

    if (!body?.rsasDomain) {
        return error(400, "The rsas Domain has to be defined");
    }

    if (!body?.apiDomain) {
        return error(400, "The web Domain has to be defined");
    }

    if (body?.name == "main_server") {
        return error(400, "Name: main_server is a reserved name, use another name");
    }

    const domain = await database
        .insert(domainsTable)
        .values({
            name: body.name,
            rsasDomain: body.rsasDomain,
            apiDomain: body.apiDomain
        });

    return json(domain);
}

export const DELETE = async ({request}) => {
    const body = await request.json();

    const domain = await database
        .delete(domainsTable)
        .where(eq(domainsTable.id, body?.id))
        .execute();

    return json(domain);
}