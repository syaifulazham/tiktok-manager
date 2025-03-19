-- CreateTable
CREATE TABLE "Consultation" (
    "id" SERIAL NOT NULL,
    "productCategory" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "expression" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "videoStoryline" TEXT NOT NULL,
    "dialogueParts" TEXT NOT NULL,
    "captions" TEXT NOT NULL,
    "soundType" TEXT NOT NULL,
    "uploadTime" TEXT NOT NULL,
    "dos" JSONB NOT NULL,
    "donts" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);
