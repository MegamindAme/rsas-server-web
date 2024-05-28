import type { PageServerLoad } from './$types';

import { redirect } from 'sveltekit-flash-message/server';

import { route } from '../../lib/ROUTES';
import { getAllUsers } from '../../lib/database/dbUtils.server';

export const load = (async ({ locals: { user }, cookies }) => {
    if (!user) {
        throw redirect(
            route('/auth/login'),
            {
                type: 'error',
                message: 'You must be logged in to view the dashboard.'
            },
            cookies
        );
    }

    return {
        loggedInUserName: user.name,
        allUsers: await getAllUsers()
    };
}) satisfies PageServerLoad;