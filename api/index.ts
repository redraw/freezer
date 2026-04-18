import express, { Router, Request, Response } from 'express'
import { isAuthorized } from '@tinacms/auth'
import { createMediaHandler } from 'next-tinacms-cloudinary/dist/handlers'
import type { NextApiRequest, NextApiResponse } from 'next'

const app = express()
const router = Router()

export const config = {
  api: {
    bodyParser: false,
  }
}

const mediaHandler = createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV == 'development') {
        return true
      }

      const user = await isAuthorized(req)

      return user && user.verified || false
    } catch (e) {
      console.error(e)
      return false
    }
  },
})

router.get('/cloudinary/media', (req: Request, res: Response) => mediaHandler(req as unknown as NextApiRequest, res as unknown as NextApiResponse))

router.post('/cloudinary/media', (req: Request, res: Response) => mediaHandler(req as unknown as NextApiRequest, res as unknown as NextApiResponse))

router.delete('/cloudinary/media/:media', (req: Request, res: Response) => {
  req.query.media = ['media', req.params.media]
  return mediaHandler(req as unknown as NextApiRequest, res as unknown as NextApiResponse)
})

app.use('/api', router)

export default app;