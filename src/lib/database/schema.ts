import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
    id: text('id').primaryKey(),

    name: text('name').notNull(),

    email: text('email').notNull(),

    password: text('password').notNull(),

    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const usersSessionsTable = sqliteTable('users_sessions', {
    id: text('id').primaryKey(),

    userId: text('user_id')
        .references(() => usersTable.id).notNull(),

    expiresAt: integer('expires_at').notNull()
});

export type UserInsertSchema = typeof usersTable.$inferInsert;