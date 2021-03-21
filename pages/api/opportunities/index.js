import dbConnect from "utils/dbConnect";
import Opportunity from "models/Opportunity";

export default async function handler(req, res) {
   const { method } = req;

   await dbConnect();

   switch (method) {
      case "GET":
         try {
            const opportunities = await Opportunity.find({});
            res.status(200).json({ success: true, data: opportunities });
         } catch (err) {
            res.status(400).json({ success: false });
         }
         break;
      default:
         res.status(400).json({ success: false });
   }
}
