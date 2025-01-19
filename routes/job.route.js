const express = require('express');
const Job = require('../models/job.model');

const router = express.Router();

router.get('/jobs', async (req, res) => {
    try{
        const jobs = await Job.find()
        res.status(200).json(jobs)

    }
    catch(error){
        res.status(500).json({ message: "Error fetching jobs", error})
    }
})

router.get('/jobs/:id', async(req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            res.status(404).json({ message: 'No job found!' })
        }
        res.status(200).json(job)
        
    }
    catch(error){
        res.status(500).json({ message: "Error fetching a job", error})
    }
})

router.post('/jobs', async (req, res) => {
    try{
        const jobData = req.body 
        const job = new Job(jobData)
        await job.save()
        res.status(201).json({ message: 'Job created successfully.', job})
    }
    catch(error){
        res.status(500).json({ message: "Error creating a job", error})
    }
})

router.put('/jobs/:id', async(req, res) => {
    try{
        const jobId = req.params.id;
        const jobData = req.body;

        const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, { new: true })
        if (!updatedJob) {
            return res.status(404).json({ message: "No job found" });
        }

        res.status(200).json({ message: "Job updated successfully", job: updatedJob });
      
    }
    catch(error){
        res.status(500).json({ message: "Error updating a job", error})
    }
})

router.delete('/jobs/:id', async(req, res) => {
    try{
        const jobId = req.params.id;
        const deletedJob = await Job.findByIdAndDelete(jobId)
        if(!deletedJob){
            return res.status(404).json({ message: "No job found" });
        }
        res.status(200).json({ message: "Job deleted successfully", job: deletedJob });
    }
    catch(error){
        res.status(500).json({ message: "Error deleting a job", error})
    }
})

module.exports = router