import dbConnect from "utils/dbConnect";
import Opportunity from "models/Opportunity";

export default async function handler(req, res) {
   const { method } = req;

   await dbConnect();

   switch (method) {
      case "GET":
         try {
            const opportunities = await Opportunity.find({});
            const result = opportunities
               .map((o) => {
                  const domain = o.url.match(
                     NEGATIVE_LB +
                        o.company.toLowerCase().match(/^\w*/g) +
                        DOMAIN_EXP
                  );
                  return domain && domain[0]
                     ? { ...o.toObject(), domain }
                     : o.toObject();
               })
               .filter((o) => o.domain && o.domain.length > 0);
            res.status(200).json({ success: true, data: result });
         } catch (err) {
            res.status(400).json({ success: false, message: err.message });
         }
         break;
      default:
         res.status(400).json({ success: false });
   }
}

const NEGATIVE_LB = `(?<!\\.(?:co(?:m|\\.\\w{2})?|net|org|edu|gov|io)\\/.*)`;
const DOMAIN_EXP = `\\.(?:co(?:m|\\.\\w{2})?|net|org|io|gov|edu)`;
