import sql from '../config/db.js'
import OpenAI from 'openai'
import {clerkClient} from '@clerk/express'
import axios from 'axios'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const generateArticle = async (req, res) => {
    try {
        const {userId} = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan != 'pro' && free_usage >= 10) {
            return res.status(402).json({message: "Limit reached. Upgrade to continue."});
        }

        const resp = await openai.chat.completions.create({
            model: 'gemini-2.0-flash',
            messages: [
                {
                    role: 'user',
                    content: prompt
                },
            ],
            temperature: 0.7,
            max_tokens: length
        });

        // content is the ans given by gemini after prompt
        const content = resp.choices[0].message.content;

        // storing in database with query
        await sql`insert into creations (user_id,prompt,m_content,m_type) VALUES
            (${userId},${prompt},${content},'article')`

        // Update credits for free user
        if (plan != 'pro') {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                }
            });
        }

        res.status(200).json({content});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const generateBlogTitle = async (req, res) => {
    try {

        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan != 'pro' && free_usage >= 10) {
            return res.status(402).json({message: "Limit reached. Upgrade to continue."});
        }

        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const content = response.choices[0].message.content;

        //storing in database with query
        await sql`insert into creations (user_id,prompt,m_content,m_type)
        VALUES (${userId},${prompt},${content},'blog-title')`

        // Update credits for free user
        if (plan != 'pro') {
            await clerkClient.users.updateUser(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                }
            });
        }

        res.status(200).json({content});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const generateImage = async (req, res) => {
    try {

        const {userId} = req.auth();
        const {prompt, publish} = req.body;
        const plan = req.plan;

        if (plan != 'pro') {
            return res.status(402).json({message: "This feature is only available for pro subscriptions."});
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const resp = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {'x-api-key': process.env.CLIPDROP_API_KEY},
            responseType: 'arraybuffer',
        });

        const base64Image = `data:image/png;base64,${Buffer.from(resp.data, 'binary').toString('base64')}`;
        const { secure_url } = await cloudinary.uploader.upload(base64Image);

        //storing in database with query
        await sql`insert into creations (user_id,prompt,m_content,m_type,publish)
            VALUES (${userId},${prompt},${secure_url},'image',${publish ?? false})`;

        res.status(200).json({content: secure_url});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const removeImageBackground = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const removeImageObject = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const resumeReview = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
