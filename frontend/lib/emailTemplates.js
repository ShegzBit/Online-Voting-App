export const inviteToVoteEmail = (voteUrl) => `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #444;">You're Invited to Vote</h2>
        <p>Hello,</p>
        <p>You have been invited to participate in our voting event. Your vote is important to us.</p>
        <div style="margin: 20px 0;">
            <a href="${voteUrl}" style="background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border: none;">Vote Now</a>
        </div>
        <p>Thank you for your participation.</p>
        <p>Best regards,</p>
        <p>Your Team</p>
    </div>
`;