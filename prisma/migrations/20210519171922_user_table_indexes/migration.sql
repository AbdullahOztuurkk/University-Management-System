-- DropIndex
DROP INDEX "User.id_email_index";

-- CreateIndex
CREATE INDEX "User.id_index" ON "User"("id");

-- CreateIndex
CREATE INDEX "User.email_index" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserLesson.userId_index" ON "UserLesson"("userId");
