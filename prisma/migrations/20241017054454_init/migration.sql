-- CreateTable
CREATE TABLE "authors" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "isbn" VARCHAR(100) NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
