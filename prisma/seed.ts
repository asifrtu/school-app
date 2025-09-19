import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Permissions
  const permissions = await prisma.permission.createMany({
    data: [
      { name: "CREATE_USER", module: "User" },
      { name: "READ_USER", module: "User" },
      { name: "UPDATE_USER", module: "User" },
      { name: "DELETE_USER", module: "User" },
      { name: "CREATE_ROLE", module: "Role" },
      { name: "READ_ROLE", module: "Role" },
      { name: "UPDATE_ROLE", module: "Role" },
      { name: "DELETE_ROLE", module: "Role" },
    ],
    skipDuplicates: true, // won’t fail if already exists
  });

  console.log("✅ Permissions seeded");

  // Create Roles
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description: "Administrator with full access",
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "User" },
    update: {},
    create: {
      name: "User",
      description: "Regular application user",
    },
  });

  console.log("✅ Roles seeded");

  // Attach all permissions to Admin role
  const allPermissions = await prisma.permission.findMany();

  for (const perm of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: perm.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: perm.id,
      },
    });
  }

  console.log("✅ RolePermissions seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
