import { ViewTeamStatus, ValidateTeamCode, ValidateTeamName } from "../model/teamModel.js";

export const TeamStatus = async (req, res) => {
  try {
    var teamCode = req.params.id;
    if(teamCode==='teamName')
    {
      teamCode=null;
    }
    console.log(teamCode);
    const teamName=req.body.teamName;
    console.log(teamName);


    // Validate the provided team code
    var validateTeam;
    if(teamCode)
    {
      validateTeam = await ValidateTeamCode(teamCode);
    }

    else
    {
      validateTeam=await ValidateTeamName(teamName);
    }
        
    console.log(TeamStatus);
    if (!validateTeam.success) {
      return res
        .status(500)
        .json({ message: "Invalid Input", success: false });
    }

    const team_id = validateTeam.teamId;
    const team_name = validateTeam.teamName;

    console.log(team_id,team_name);

    // Get the team status and members using the team_id
    const teamStatus = await ViewTeamStatus(team_id);

    console.log(teamStatus);

    if (!teamStatus.success) {
      return res
        .status(500)
        .json({ message: "Error while fetching team status", success: false });
    }

    // Structure the response data with proper member assignment
    const responseData = {
      teamName: team_name,
      memberCount: teamStatus.members.length, // Get the count of actual members
      members: {
        player1: teamStatus.members[0] || "Not Assigned",
        player2: teamStatus.members[1] || "Not Assigned",
        player3: teamStatus.members[2] || "Not Assigned",
      },
    };

    return res.status(200).json({
      message: "Success",
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Server error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error: " + error.message, success: false });
  }
};
