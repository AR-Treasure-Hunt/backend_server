import { createUser } from "../model/userModel.js";
import { CreateTeam, ValidateTeamCode } from "../model/teamModel.js";

export const RegisterByTeamCreation = async (req, res) => {
  try {
    const { name, email, phone_number, institution, address, social_media } =
      req.body.userData;
    const { teamName } = req.body;

    const teamCreationDetails = { teamName, team_leader_email: email };
    

    // Create a team
    const teamCreation = await CreateTeam(teamCreationDetails);
    

    // Check if team creation was successful
    if (!teamCreation.success) {
      return res
        .status(500)
        .json({ message: "Error while creating team", success: false });
    } else {
      const { teamCode, teamId } = teamCreation;

      const registrationData = {
        name,
        email,
        phone_number,
        institution,
        address,
        social_media,
        team_id: teamId,
        team_code:teamCode
      };

      // Store data along with teamId
      
      const UserCreation = await createUser(registrationData);
      
      // Check if user creation was successful
      if (!UserCreation.success) {
        return res
          .status(500)
          .json({ message: "Failure while creating a user", success: false });
      }

      // User registration successful
      const responseData = { teamCode };
      return res.status(200).json({
        message: "User Creation Successful",
        success: true,
        data: responseData,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const RegisterByTeamCode = async (req, res) => {
  try {
    const { teamCode } = req.body;
    const { name, email, phone_number, institution, address, social_media } =
      req.body.userData;

    const validationDetails = await ValidateTeamCode(teamCode);

    // Check if team code is valid
    if (!validationDetails.success) {
      return res
        .status(401)
        .json({ message: "Team Code Doesn't Match", success: false });
    }

    const team_id = validationDetails.teamId;
    const registrationData = {
      name,
      email,
      phone_number,
      institution,
      address,  
      social_media,
      team_id,
    };

    console.log(`Registration Data send ${registrationData}`)
    const UserCreation = await createUser(registrationData);
    
    // Check if user creation was successful
    if (!UserCreation.success) {
      return res
        .status(500)
        .json({ message: "Failure while creating a user", success: false });
    }

    // User creation successful
    const responseData = { success: true, teamCode };
    return res.status(200).json({
      message: "User creation successful",
      success: true,
      data: responseData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
