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

export const resultLeaderboard=async(req,res)=>{
    try {
        let { data: result, error } = await supabase
        .from('scoreboard')
        .select('team_name, final_score')
        .order('final_score', { ascending: false })

       
        const filterdResult=[];

        if(result)
        {

        result.forEach((element,i) => {  
        

        result.forEach((item,j)=>{
            if(j>i && item.team_name===element.team_name)
            {
                var inclusion;
                
                if(filterdResult){
                inclusion=filterdResult.some(component=>{
                return component.team_name===item.team_name
                })
                }

                else
                inclusion=false;

                if(!inclusion)
                {
                    filterdResult.push(item);

                } 
              
            }
            
            else{
                const include=result.every((component,k)=>{
                    return k>i && component.team_name===element.team_name 
                })

                if(!include)
                {
                    const inclusion=filterdResult.some(component=>{
                        return component.team_name===item.team_name
                    })

                    if(!inclusion)
                    {
                     filterdResult.push(item);
        
                    }
                }    
            }
            
        }
   
    )
        

}
       
    )

    const finalresult=await filterdResult.map((variable,i)=>{
        return {...variable,rank:i+1};
    });


    return{
        success:true,
        message:"Leaderboard successfully displayed",
        data:finalresult
    }
}
        else
        {
            return {
                success:false,
                message:error.message

            }
        }

        
    } catch (error) {
        console.log(error);
        return{
            success:false,
            message:error.message
        }
    }
};

