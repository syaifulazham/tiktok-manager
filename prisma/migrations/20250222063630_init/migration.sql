-- CreateTable
CREATE TABLE `Consultation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productCategory` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `productDescription` TEXT NOT NULL,
    `expression` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `videoStoryline` TEXT NOT NULL,
    `dialogueParts` TEXT NOT NULL,
    `captions` TEXT NOT NULL,
    `soundType` TEXT NOT NULL,
    `uploadTime` TEXT NOT NULL,
    `dos` JSON NOT NULL,
    `donts` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
