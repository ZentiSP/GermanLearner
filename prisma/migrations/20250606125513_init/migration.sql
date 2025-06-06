-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL,
    "german" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "definition" TEXT,
    "partOfSpeech" TEXT NOT NULL,
    "article" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyScore" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "correct" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "DailyScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyScore_date_key" ON "DailyScore"("date");
