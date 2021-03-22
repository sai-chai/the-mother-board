import dbConnect from "utils/dbConnect";
import Board from "models/Board";
import Opportunity from "models/Opportunity";

export default async function handler(req, res) {
   const {
      method,
      query: { queryId }
   } = req;
   let board;

   await dbConnect();

   switch (method) {
      case "GET":
         try {
            board = await Board.findOne(
               {
                  _id: queryId
               },
               {
                  name: 1,
                  root_domain: 1
               }
            );
            const opportunities = await Opportunity.find({
               url: {
                  $regex: `${board.root_domain}`,
                  $options: "i"
               }
            });
            res.status(200).json({
               success: true,
               data: { opportunities, board }
            });
         } catch (err) {
            if (board) {
               res.status(202).json({
                  success: false,
                  data: { opportunities: null, board }
               });
            }
            res.status(400).json({ success: false });
         }
         break;
      default:
         res.status(400).json({ success: false });
   }
}

/*
   // Not possible due to Atlas limitations
   db['job-opportunities'].find({ 
      $where: function() {
         return obj.url.match(obj.company).length == 0
      }
   })

   const boards = db['job-boards'].find({}).toArray();

   const updateSource = (domain, name) => 
      db['job-opportunities'].updateMany({
         url: { $regex: `${domain}`, $options: 'i' }
      }, {
         $set: { source: `${name}` }
      });
   
   
   boards.forEach(board => 
      updateSource(board.root_domain, board.name)
   ); 
*/
