import dbConnect from "utils/dbConnect";
import Board from "models/Board";
import Opportunity from "models/Opportunity";

export default async function handler(req, res) {
   const {
      method,
      query: { queryId }
   } = req;

   await dbConnect();

   switch (method) {
      case "GET":
         try {
            const board = await Board.findOne({
               _id: queryId
            }).project({
               root_domain: 1
            });
            const opportunities = await Opportunity.find({
               url: { $regex: `${board.root_domain}`, $options: "i" }
            });
            res.status(200).json({ success: true, data: opportunities });
         } catch (err) {
            res.status(400).json({ success: false });
         }
         break;
      default:
         res.status(400).json({ success: false });
   }
}

/*
   db[job-opportunities].updateMany({
      url: { $regex: /linkedin.com/i }
   }, { 
      $set: {
         "source": "LinkedIn"
      }
   })
 */
