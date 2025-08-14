import { clerkClient } from '@clerk/express'


export const auth = async (req, res, next) => {
    try {

        const {userId, has} = req.auth();
        const hasProPlan = await has({plan: 'pro'});

        const user = await clerkClient.users.getUser(userId);

        if (!hasProPlan && user.privateMetadata.free_usage) {
            req.free_usage = user.privateMetadata.free_usage;
        }
        else {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0
                }
            });

            req.free_usage = 0;
        }

        req.plan = hasProPlan ? 'pro': 'free';
        next();

    } catch (error) {
        res.status(401).json({ message: error.message } );
    }
}
