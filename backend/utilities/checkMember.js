import supabase from "../config/supabaseConnection.js";
export const check_member = async (team_id) => {
  try {
    
    const { data, error } = await supabase
      .from("player")
      .select("*")
      .eq("team_id", team_id);

   

    if (error) {
      console.error("Error fetching members:", error.message);
      return { success: false, message: error.message };
    }

    if (!data || data.length === 0) {
      return { success: false, message: "No members found for this team." };
    }

    // Ensure the members are structured correctly
    const members = data.map((member) => ({
      player_id: member.player_id,
      name: member.name,
      email: member.email,
      phone_number: member.phone_number,
      institution: member.institution,
      address: member.address,
      social_media: member.social_media,
      team_id: member.team_id,
      individual_Score: member.individual_Score,
    }));

    return { success: true, members };
  } catch (error) {
    console.error("Unexpected error in check_member:", error.message);
    return { success: false, message: error.message };
  }
};
