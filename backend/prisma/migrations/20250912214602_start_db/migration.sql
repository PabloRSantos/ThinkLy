-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."insights" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."topics" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "weather" JSONB NOT NULL,
    "insight_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."insights" ADD CONSTRAINT "insights_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."topics" ADD CONSTRAINT "topics_insight_id_fkey" FOREIGN KEY ("insight_id") REFERENCES "public"."insights"("id") ON DELETE SET NULL ON UPDATE CASCADE;
