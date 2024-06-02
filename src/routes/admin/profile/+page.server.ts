import {redirect} from '@sveltejs/kit';
import type {Actions, PageServerLoad} from './$types';

import {eq} from 'drizzle-orm';
import {message, superValidate} from 'sveltekit-superforms/server';

import {database} from '../../../lib/database/database.server';
import {usersTable} from '../../../lib/database/schema';
import type {AlertMessageType} from '../../../lib/types';
import {EmailZodSchema, PasswordZodSchema} from '../../../lib/validations/authZodShemas';
import {setError} from "sveltekit-superforms/server";
import {Argon2id} from "oslo/password";

export const load = (async () => {
    return {
        emailZodSchema: await superValidate(EmailZodSchema),
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    changeUsername: async ({request, locals}) => {
        const emailLoginFormData = await superValidate<typeof EmailZodSchema, AlertMessageType>(
            request,
            EmailZodSchema
        );

        if (emailLoginFormData.valid === false) {
            return message(emailLoginFormData, {
                alertType: 'error',

                alertText: 'There was a problem with your submission.'
            });
        }

        await database.update(usersTable)
            .set({email: emailLoginFormData.data.email})
            .where(eq(usersTable.id, locals.user.id))
            .execute();

        throw redirect(303, 'profile');
    },

    changePassword: async ({request, locals}) => {
        const passwordLoginFormData = await superValidate<typeof PasswordZodSchema, AlertMessageType>(
            request,
            PasswordZodSchema
        );

        if (passwordLoginFormData.valid === false) {
            return message(passwordLoginFormData, {
                alertType: 'error',

                alertText: 'There was a problem with your submission.'
            });
        }

        if (passwordLoginFormData.data.newPassword !== passwordLoginFormData.data.confirmNewPassword) {
            return message(passwordLoginFormData, {
                alertType: 'error',
                alertText: 'Passwords do not match.'
            });
        }

        const [existingUser] = await database
            .select({
                id: usersTable.id,
                password: usersTable.password
            })
            .from(usersTable)
            .where(eq(usersTable.id, locals.user.id));

        if (existingUser === undefined) {
            return setError(passwordLoginFormData, 'password', 'User not registered');
        }

        console.log(await new Argon2id().hash(passwordLoginFormData.data.password))

        const validPassword = await new Argon2id().verify(
            existingUser.password,
            passwordLoginFormData.data.password
        );

        if (!validPassword) {
            return setError(passwordLoginFormData, 'password', 'Incorrect password');
        }

        await database.update(usersTable)
            .set({email: passwordLoginFormData.data.email})
            .where(eq(usersTable.id, locals.user.id))
            .execute();

        throw redirect(303, 'profile');
    },
};