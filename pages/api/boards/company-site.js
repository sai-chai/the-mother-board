import dbConnect from "utils/dbConnect";
import Opportunity from "models/Opportunity";

export default async function handler(req, res) {
   const { method } = req;

   await dbConnect();

   switch (method) {
      case "GET":
         try {
            const opportunities = await Opportunity.find({});
            const result = opportunities.filter(
               (o) =>
                  o.url.match(NEGATIVE_LB + o.company.toLowerCase()).length > 0
            );
            res.status(200).json({ success: true, data: result });
         } catch (err) {
            res.status(400).json({ success: false });
         }
         break;
      default:
         res.status(400).json({ success: false });
   }
}

const NEGATIVE_LB = `(?<!\\.(?:co(?:m|\\.\\w{2})?|net|org|edu|gov|io)\\/.*)`;

/*
   db['job-opportunities'].find({ 
      $where: function() {
         return obj.url.match(obj.company).length == 0
      }
   })
 */
