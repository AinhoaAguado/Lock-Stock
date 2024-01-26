import { z } from 'zod';

const AdminSchema = z.object({
  Id_Admin: z.string().uuid(),
  Name_Admin: z.string().min(2).max(15),
  Password_Admin: z.string().min(8).max(30),
  Notifications_Admin: z.string().min(1).max(255),
});

export default AdminSchema;