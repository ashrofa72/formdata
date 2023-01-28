import students from '../data/students'

export default function handler(req, res) {
    res.status(200).json(students)
  }
  