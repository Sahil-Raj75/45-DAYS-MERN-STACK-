// import express from "express";
const express = require('express');
// import { ObjectId, MongoClient } from "mongodb";
const { MongoClient , ObjectId} = require('mongodb');
const app = express();
const port = 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbname = 'resumeData';
let db;

app.use(express.json());

app.post("/api/posts", async (req, res) => {
    try {
        const postsData = req.body;

        if (!postsData.title || !postsData.content || !postsData.author) {
            res.status(400).json({
                success: false,
                error: 'Title , content and Author name are required'
            })
        } else {
            postsData.createdAt = new Date();

            const result = await db.collection('posts').insertOne(postsData);

            res.status(201).json({
                success: true,
                message: 'post created succesfully',
                data: { ...postsData, _id: result.insertedId }
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create posts'
        });
    }
})

// Code for Fetching all posts and content 
app.get("/api/posts", async(req, res) => {
    try {
        const posts = await db.collection('posts').find({}).toArray();

        res.json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error:'failed to retrive posts'
        })
    }
})

app.get('/api/posts/:id', async (req, res) => {
  try {
    const postsid = req.params.id;
    const objectId = new ObjectId(postsid);

    if (!ObjectId.isValid(postsid)) {
      return res.status(400).json({
        success: false,
        error: "Invalid posts ID format"
      });
    }

    const posts = await db.collection('posts').findOne({ _id: objectId });

    if (!posts) {
      return res.status(404).json({
        success: false,
        error: "posts not found"
      });
    }

    res.status(200).json({
      success: true,
      data: posts
    });

  } catch (error) {
    console.error("Error in GET /api/posts/:id:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch posts"
    });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const postsid = req.params.id;
    const objectId = new ObjectId(postsid);
    const updateposts = req.body;
    updateposts.updatedAt = new Date();
    const result = await db.collection('posts').updateOne(
      { _id: objectId },
      { $set: updateposts }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'posts not found'
      });
    }
    res.json({
      success: true,
      message: 'posts updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error("Error in PUT /api/posts:", error);
    res.status(500).json({
      success: false,
      error: 'Failed to update posts'
    });
  }
});
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const objectId = new ObjectId(postId);
    const result = await db.collection('posts').deleteOne({
      _id: objectId
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'post not found'
      });
    }
    res.status(204).json({
        success:true,
        message:'Post deleted succesfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete post'
    });
  }
});
MongoClient.connect(mongoUrl).then(client => {
    db = client.db(dbname);
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});