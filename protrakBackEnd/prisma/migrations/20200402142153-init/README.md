# Migration `20200402142153-init`

This migration has been generated by Diego Rayo at 4/2/2020, 2:21:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX `User.email` ON `protrak`.`User`(`email`)

CREATE UNIQUE INDEX `User.auth0Id` ON `protrak`.`User`(`auth0Id`)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200402121440-init..20200402142153-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource mysql {
   provider  = "mysql"
-  url = "***"
+  url       = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -12,12 +12,12 @@
   id                String      @id @default(cuid())
   userName          String?
   firstName         String
   lastName          String
-  email             String
+  email             String      @unique
   profileImg        String?
   profileThumb      String?
-  auth0Id           String
+  auth0Id           String      @unique
   socialSignIn      String?
   hasOnboarded      Boolean?    @default(false)
   lastLogin         DateTime?
   createdAt         DateTime    @default(now())
```


