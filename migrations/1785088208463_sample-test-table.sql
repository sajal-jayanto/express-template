-- Up Migration

CREATE TABLE "sample" (
  "id" BIGSERIAL PRIMARY KEY,
  "sample_text" VARCHAR(100) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Down Migration

DROP TABLE "sample";