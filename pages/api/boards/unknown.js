import dbConnect from "utils/dbConnect";
import Board from "models/Board";
import Opportunity from "models/Opportunity";

export default async function handler(req, res) {
   const { method } = req;

   await dbConnect();

   switch (method) {
      case "GET":
         try {
            const domains = (await Board.find({}, "root_domain")).map(
               (board) => board.root_domain
            );
            const opportunities = await Opportunity.find({});

            const results = opportunities
               .map((o) => {
                  if (o.url === "") return o.toObject();
                  const companySource =
                     o.url.match(
                        new RegExp(
                           TLD_LB + o.company.toLowerCase().match(/^\w*/g),
                           "g"
                        )
                     ) || [];
                  const domain = o.url.match(DOMAIN_EXP) || [""];
                  if (
                     !domains.includes(domain[0]) &&
                     companySource.length === 0
                  )
                     return { ...o.toObject(), domain };
                  return o.toObject();
               })
               .filter((o) => o.domain && o.domain.length > 0);

            res.status(200).json({ success: true, data: results });
         } catch (err) {
            res.status(400).json({ success: false });
         }
         break;
      default:
         res.status(400).json({ success: false });
   }
}

// Negative lookback for top-level domain
const TLD_LB = `(?<!\\.(?:co(?:m|\\.\\w{2})?|net|org|edu|gov|io)\\/.*)`;
// Capture domain minus subdomain(s)
const DOMAIN_EXP = /\w*\.(?:co(?:m|\.\w{2})?|net|org|io|gov|edu)/g;

/*
   const opportunities = db['job-opportunities'].find({
      source: { $exists: false }
   }).toArray();

   const updateSource = (_id, source) => 
      db['job-opportunities'].updateOne({ _id: _id }, {
         $set: { source: `${source}` }
      });

   const TLD_LB = `(?<!\\.(?:co(?:m|\\.\\w{2})?|net|org|edu|gov|io)\\/.*)`;

   opportunities.forEach(o => {
      if(o.url === "") return updateSource(o._id, "Unknown");
      const isCompanySource = !!o.url.match(new RegExp(
*/ //       TLD_LB + o.company.toLowerCase().match(/^\w*/g),
/*          "g"
         ));
      if(isCompanySource) return updateSource(o._id, "Company Website");
      return updateSource(o._id, "Unknown");
   });

   
*/
