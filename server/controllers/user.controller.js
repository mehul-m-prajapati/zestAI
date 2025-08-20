import sql from '../config/db.js'



export const getPublishedCreations = async (req, res) => {
    try {

        const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;
        res.status(200).json({creations});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


export const getUserCreation = async (req, res) => {
    try {
        const {userId} = req.auth();

        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
        res.status(200).json({creations});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


export const toggleLikeCreations = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {id} = req.body;

        const [creation] = await sql`SELECT * FROM creations WHERE id=${id}`;

        if(!creation) {
            return res.status(404).json({message:"Creation not found"});
        }

        const currentLikes = creation.likes;
        const userIDStr = userId.toString()
        let updatedLikes;
        let message;

        if (currentLikes.includes(userIDStr)){
            updatedLikes = currentLikes.filter(like=>like!=userIDStr)
            message = "You have unliked this creation"
        }
        else {
            updatedLikes=[...currentLikes, userIDStr]
            message = "You have liked this creation"
        }

        const formattedArray = `{${updatedLikes.join(",")}}`;

        await sql`UPDATE creations SET likes=${formattedArray}::text[] WHERE id=${id}`;

        res.status(200).json({message});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
