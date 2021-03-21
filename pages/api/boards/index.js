import dbConnect from "utils/dbConnect";
import Board from "models/Board";

export default async function handler(req, res) {
   const { method } = req;

   await dbConnect();

   switch (method) {
      case "GET":
         try {
            const boards = await Board.find({});
            res.status(200).json({ success: true, data: boards });
         } catch (err) {
            res.status(400).json({ success: false });
         }
         break;
      default:
         res.status(400).json({ success: false });
   }
}
