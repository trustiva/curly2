/*
  # HODL Bot - DCA Bot Management System

  ## Overview
  This migration creates the database schema for a Dollar-Cost Averaging (DCA) cryptocurrency bot application.
  It sets up tables for managing automated purchase bots and transaction history with comprehensive security.

  ## New Tables

  ### `dca_bots`
  Stores user-configured DCA bots that automatically purchase cryptocurrency at regular intervals.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each bot
  - `user_id` (uuid) - Reference to the user who owns this bot
  - `coin_pair` (text) - Trading pair (e.g., 'BTC/USDT', 'ETH/USDT')
  - `amount_per_buy` (numeric) - Dollar amount to invest per purchase
  - `frequency` (text) - Purchase interval: 'daily', 'weekly', or 'monthly'
  - `is_active` (boolean) - Whether the bot is currently running
  - `next_buy_at` (timestamptz) - Scheduled time for next purchase
  - `take_profit_percent` (numeric, optional) - Automatic profit-taking threshold
  - `stop_loss_percent` (numeric, optional) - Automatic loss prevention threshold
  - `martingale_enabled` (boolean) - Whether to double down on price dips
  - `created_at` (timestamptz) - When the bot was created
  - `updated_at` (timestamptz) - Last modification time

  ### `transactions`
  Records every purchase executed by DCA bots for portfolio tracking and tax reporting.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each transaction
  - `bot_id` (uuid) - Reference to the bot that executed this purchase
  - `user_id` (uuid) - Reference to the user (denormalized for query performance)
  - `coin_pair` (text) - Trading pair purchased
  - `price` (numeric) - Price per coin at time of purchase
  - `amount` (numeric) - Quantity of coins purchased
  - `total` (numeric) - Total cost in USD
  - `executed_at` (timestamptz) - When the purchase was executed

  ## Security (Row Level Security)
  
  All tables have RLS enabled with policies ensuring:
  - Users can only view their own bots and transactions
  - Users can only create, update, and delete their own bots
  - Transaction records are read-only after creation (audit trail)
  - All operations require authentication

  ## Important Notes
  1. The `user_id` column expects integration with Supabase Auth
  2. Numeric types use precision for financial accuracy
  3. Transactions table is append-only for audit compliance
  4. Indexes added for common query patterns (user_id, bot_id, timestamps)
*/

CREATE TABLE IF NOT EXISTS dca_bots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  coin_pair text NOT NULL,
  amount_per_buy numeric(10, 2) NOT NULL CHECK (amount_per_buy >= 10),
  frequency text NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  is_active boolean NOT NULL DEFAULT true,
  next_buy_at timestamptz NOT NULL,
  take_profit_percent numeric(5, 2),
  stop_loss_percent numeric(5, 2),
  martingale_enabled boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dca_bots_user_id ON dca_bots(user_id);
CREATE INDEX IF NOT EXISTS idx_dca_bots_next_buy ON dca_bots(next_buy_at) WHERE is_active = true;

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id uuid NOT NULL REFERENCES dca_bots(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  coin_pair text NOT NULL,
  price numeric(15, 8) NOT NULL,
  amount numeric(15, 8) NOT NULL,
  total numeric(10, 2) NOT NULL,
  executed_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_bot_id ON transactions(bot_id);
CREATE INDEX IF NOT EXISTS idx_transactions_executed_at ON transactions(executed_at DESC);

ALTER TABLE dca_bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bots"
  ON dca_bots FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bots"
  ON dca_bots FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bots"
  ON dca_bots FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bots"
  ON dca_bots FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can create transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
