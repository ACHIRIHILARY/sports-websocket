import { pgEnum, pgTable, serial, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';

// Enum for match status (scheduled, life, finished)
export const matchStatusEnum = pgEnum('match_status', ['scheduled', 'life', 'finished']);

// Matches table
export const matches = pgTable('matches', {
  id: serial('id').primaryKey(),
  sports: text('sports').notNull(),
  homeTeam: text('home_team').notNull(),
  awayTeam: text('away_team').notNull(),
  status: matchStatusEnum('status').default('scheduled').notNull(),
  startTime: timestamp('start_time'),
  endTime: timestamp('end_time'),
  homeScore: integer('home_score').default(0).notNull(),
  awayScore: integer('away_score').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Commentary table
export const commentary = pgTable('commentary', {
  id: serial('id').primaryKey(),
  matchId: integer('match_id').references(() => matches.id).notNull(),
  minute: integer('minute').notNull(),
  sequence: integer('sequence').notNull(),
  period: text('period'),
  eventType: text('event_type'),
  actor: text('actor'),
  team: text('team'),
  message: text('message'), 
  metadata: jsonb('metadata'),
  tags: text('tags'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

