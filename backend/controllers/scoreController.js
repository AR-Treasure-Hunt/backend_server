import { updateScore } from "../model/scoreModel.js";

export const update=async(req,res)=>{
    try {
        //Retrieving data from the form
        const {playerId,score,level}=req.body;
        
        const data_Scoreboard={
            playerId,
            score,
            level

        }

        //Updating the scoreboard table
        const result=await updateScore(data_Scoreboard);

        if(!result.success)
        {
            return res
            .status(500)
            .json({ message:result.message, success: false });
        }

        else{
            return res
            .status(200)
            .json({
                success:true,
                result:result.message,
                data:result.data
                
            })
        }
    } catch (error) {
        console.log(error);  
        return res
         .json(error)
    }
};

