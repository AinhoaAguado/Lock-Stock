import { z } from 'zod';

export const NotificationsSchema = z.object({
    Id_Notification: z.string().uuid(),
    Notes_Notification: z.string().max(50),
    Id_User: z.string().uuid(),
});

