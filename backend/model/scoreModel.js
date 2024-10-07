import supabase from '../config/supabaseConnection.js'

export const updateScore=async(result)=>{

try {
        const {playerId, score,level}=result;
        
        //Check if player exist with same playerId and returning team_id
        let { data: player, error } = await supabase
        .from('player')
        .select('team_id')
        .eq('player_id',playerId)

        if(error)
        {
            console.log("Error Finding the user");
            const toreturn={
                success:false,
                message:"Error Finding the user"}
            
           return toreturn

        }

        else{
        const team_id=player[0].team_id;

        const scoreUpdate={
            level,
            score,
            player_id:playerId,
            team_id,
            
           
        }
        
        //Insertion of score in Scoreboard with team_id
        const { data, error } = await supabase
        .from('scoreboard')
        .insert([scoreUpdate])
        .select("*")
     

        if(error)
        {
            console.log("Error Inserting the data in ScoreBoard");
            
            const toReturn={
                success:false,
                message:error
                
            }
            return toReturn
            
        }

        else{
            
            const toReturn={
                success:true,
                message:"Result inserted into the scoreboard successfully",
                data:data
            }
            return toReturn
        }


    }
    } 
    catch (error) {
        console.log(error);
        return{
            success:false,
            message:error.message
        }
    }

}