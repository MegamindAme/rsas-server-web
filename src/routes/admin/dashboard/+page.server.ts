import {lucia} from "../../../lib/database/luciaAuth.server";
import {deleteSessionCookie} from "../../../lib/database/authUtils.server";
import {redirect} from "@sveltejs/kit";
import {LOGIN_ROUTE} from "../../../lib/utils/navLinks";
import type {Actions} from './$types';

export const actions: Actions = {
    logout: async ({ cookies, locals }) => {
        if (!locals.session?.id) return;

        await lucia.invalidateSession(locals.session.id);

        await deleteSessionCookie(lucia, cookies);

        throw redirect(303, LOGIN_ROUTE);
    },
};