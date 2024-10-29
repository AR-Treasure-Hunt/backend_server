import supabase from "../config/supabaseConnection.js";
import { GenerateTeamCode } from "../utilities/teamCodeGenerator.js";
import { check_member } from "../utilities/checkMember.js";

export const CreateTeam = async (TeamDetails) => {
  try {
    
    const { teamName, team_leader_email } = TeamDetails;

    const TeamCode = GenerateTeamCode();
    const date = new Date();
    const formattedDate = date.toLocaleString("en-GB", { hour12: false });

    const teamData = {
      team_code: TeamCode,
      team_name: teamName,
      created_at: formattedDate,
      team_leader_email: team_leader_email,
      score: 0,
    };

    const { data, error } = await supabase
      .from("team")
      .insert([teamData])
      .select("*");

    if (error) {
      console.error("Error inserting team data:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }

    if (!data || data.length === 0) {
      console.error("No data returned from Supabase after insertion.");
      return {
        success: false,
        message: "Team created but no data returned.",
      };
    }

    return {
      success: true,
      teamId: data[0]?.team_id,
      teamCode: TeamCode,
    };
  } catch (err) {
    console.error("Error in CreateTeam function:", err.message);
    return {
      success: false,
      message: err.message,
    };
  }
};

export const ValidateTeamCode = async (TeamCode) => {
 
  try {
   
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .eq("team_code", TeamCode);

      

    if (error) {
      console.log("Error while validating code");
      return {
        success: false,
        message: error,
      };
    } else {
      return {
        success: true,
        teamId: data[0].team_id,
        teamName: data[0].team_name,
      };
    }
  } catch (error) {
    console.error("Error in ValidateCode function:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const MemberCount = async (team_id) => {
  try {
    const { data, count, error } = await supabase
      .from("player")
      .select("*", { count: "exact" })
      .eq("team_id", team_id);

    if (error) {
      console.log("Error while counting members:", error.message);
      return { success: false, message: error.message };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        message: "Team not found or no members in this team.",
      };
    }

    const responseData = {
      success: true,
      memberCount: count,
    };
    return responseData;
  } catch (error) {
    console.log("Unexpected error while counting members:", error.message);
    return { success: false, message: error.message };
  }
};

export const ViewTeamStatus = async (team_id) => {
  // Get the team members associated with the team_id
  
  
  const memberData = await check_member(team_id);
  

  if (!memberData.success) {
    return { success: false, message: memberData.message };
  } else {
    return {
      success: true,
      members: memberData.members,
    };
  }
};

export  const  ValidateTeamName= async (team_name)=>{
try {  
  const { data, error } = await supabase
      .from("team")
      .select("*")
      .eq("team_name", team_name);

      if (error) {
        console.log("Error while validating Team Name");
        return {
          success: false,
          message: error,
        };
      } else {
        console.log(data);
        return {
          success: true,
          teamId: data[0].team_id,
          teamName: data[0].team_name,
        };
      }
} catch (error) {
  console.log('Error in validation using teamName',error.message);
  return{
    success:false,
    message:error.message
  };
}
}
